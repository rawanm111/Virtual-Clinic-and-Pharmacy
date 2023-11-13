import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AppBarComponent from '../Components/Appbar/AppbarPatientClinc';
import { useParams } from 'react-router-dom';

export default function AppTableP() {
  const [apps, setApps] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [availableApps, setAvailableApps] = useState([]);
  const [dateFilterStart, setDateFilterStart] = useState(null);
  const [dateFilterEnd, setDateFilterEnd] = useState(null);
  const currentDate = new Date();
  const { id } = useParams();
  const [checkAvailabilityDate, setCheckAvailabilityDate] = useState('');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentOption, setPaymentOption] = useState('wallet');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState('myself');
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [patientHealthPackage, setPatientHealthPackage] = useState([]);
  const [allHealthPackages, setAllHealthPackages] = useState([]);
  const [docs, setDocs] = useState([]);
  const [rate, setRate] = useState(0);
  const [packName, setPackName] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  

  const patientId = id;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/patients/family_members/user/${id}`)
      .then((response) => {
        if (response.data) {
          setFamilyMembers(response.data);
        } else {
          console.error('No family members data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching family members:', error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/apps/patient/${id}`)
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id,
            DoctorName: item.doctor ? item.doctor.fullName : 'Doctor Not Found',
            status: item.status,
            date: new Date(item.date),
            healthPackage: item.healthPackage,
          }));
          setApps(transformedData);
          setFilteredRows(transformedData);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching apps:', error);
      });
  }, [id]);

  //i want to get the health package of the patient using axios

  useEffect(() => {
    axios
      .get(`http://localhost:3000/PatientPackages/${patientId}`)
      .then((response) => {
        setPatientHealthPackage(response.data);
        console.log(response.data, 'response.data');
        console.log(patientHealthPackage, 'patientHealthPackage');
      })
      .catch((error) => {

        console.error('Error fetching patient health package:', error);
      });
  }, [patientId]);



  useEffect(() => {
    axios
      .get(`http://localhost:3000/health-packages`)
      .then((response) => {
        const packagesWithId = response.data.map((pkg) => ({
          ...pkg,
          id: pkg._id,
        }));
        setAllHealthPackages(packagesWithId);
      })
      .catch((error) => {
        console.error('Error fetching health packages:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/doctors`)
      .then((response) => {
        if (response.data) {
          setDocs(response.data);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3000/apps/available-appointments`)
      .then((response) => {
        if (response.data) {
          const availableData = response.data.map((item) => ({
            id: item._id,
            DoctorName: item.doctor ? item.doctor.fullName : 'Doctor Not Found',
            date: new Date(item.date),
          })).filter((item) => item.date >= currentDate);

          setAvailableApps(availableData);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching available appointments:', error);
      });
  }, []);
  
  const calculateDiscountedPrice = (appointment) => {
    // console.log(appointment, 'appointment');
    const sessionPrice = docs.find((doc) => doc.fullName === appointment.DoctorName)?.hourlyRate || 0;
    const healthPackage = allHealthPackages.find(
      (pkg) => pkg.Name === patientHealthPackage.package
      
    );
    if (healthPackage) {
      const discountPercentage = healthPackage.discountOnDoctorSessionPrice || 0;
      const discount = (discountPercentage / 100) * sessionPrice;
      // console.log(discount, "healthPackage");

      return sessionPrice - discount;
    }
    return sessionPrice;
  };




  const columns = [
    { field: 'DoctorName', headerName: 'Doctor Name', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'date', headerName: 'Date', width: 200 },
    {
      field: 'discountedPrice',
      headerName: 'Discounted Price',
      width: 200,
      renderCell: (params) => {
        const discountedPrice = calculateDiscountedPrice(params.row);
        return <span>{discountedPrice.toFixed(2)}</span>;
      },
    },
  ];

  const availableColumns = [
    { field: 'DoctorName', headerName: 'Doctor Name', width: 200 },
    { field: 'date', headerName: 'Date', width: 200 },
    {
      field: 'discountedPrice',
      headerName: 'Discounted Price',
      width: 200,
      renderCell: (params) => {
        const discountedPrice = calculateDiscountedPrice(params.row);
        return (
          <span>
            {discountedPrice.toFixed(2)}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleBookAppointment(params.row.id, discountedPrice)}
            >
              Book 
            </Button>
          </span>
        );
      },
    },
  ];

  

  const handleStatusFilterChange = (event) => {
    setSelectedStatusFilter(event.target.value);
  };

  const handleFilterChange = () => {
    const filteredApps = apps.filter((app) => {
      const isDateInRange =
        (!dateFilterStart || app.date >= dateFilterStart) &&
        (!dateFilterEnd || app.date <= dateFilterEnd);

      const isStatusMatch =
        selectedStatusFilter === 'All' || app.status === selectedStatusFilter;

      return isDateInRange && isStatusMatch;
    });
    setFilteredRows(filteredApps);
  };

  const handleFilterChangeOne = () => {
    const checkDate = new Date(checkAvailabilityDate);
    const filteredAvailableApps = availableApps.filter((app) => {
      const appDate = app.date;
      return (
        appDate.getFullYear() === checkDate.getFullYear() &&
        appDate.getMonth() === checkDate.getMonth() &&
        appDate.getDate() === checkDate.getDate() &&
        appDate.getHours() === checkDate.getHours() &&
        appDate.getMinutes() === checkDate.getMinutes()
      );
    });
    setAvailableApps(filteredAvailableApps);
  };

  const [discountedPrice, setDiscountedPrice] = useState(0);
  const handleBookAppointment = (appointmentId,discountedPrice) => {
    setSelectedAppointmentId(appointmentId);
    setDiscountedPrice(discountedPrice);
    console.log(discountedPrice, "discountedPrice");
    setIsPaymentDialogOpen(true);
  };

  const closePaymentDialog = () => {
    setIsPaymentDialogOpen(false);
  };

  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
  };

  const handleFamilyMemberChange = (event) => {
    setSelectedFamilyMember(event.target.value);
  };

  const handleSubmitPayment = async () => {
    if (selectedAppointmentId) {
      closePaymentDialog();
      let updatedAppointment;

      if (selectedFamilyMember === 'myself') {
        updatedAppointment = {
          patient: id,
          familyMember: null,
          status: 'Upcoming',
        };
      } else {
        const selectedFamilyMemberData = familyMembers.find(
          (member) => member._id === selectedFamilyMember
        );

        updatedAppointment = {
          patient: selectedFamilyMemberData.patient._id,
          familyMember: selectedFamilyMember,
          status: 'Upcoming',
        };
      }

      try {
        await axios.put(
          `http://localhost:3000/apps/${selectedAppointmentId}`,
          updatedAppointment
        );

        const response = await axios.get(
          `http://localhost:3000/apps/available-appointments`
        );

        if (response.data) {
          const availableData = response.data
            .map((item) => ({
              id: item._id,
              DoctorName: item.doctor
                ? item.doctor.fullName
                : 'Doctor Not Found',
              date: new Date(item.date),
            }))
            .filter((item) => item.date >= currentDate);

          setAvailableApps(availableData);
        } else {
          console.error(
            'No available appointments data received from the API'
          );
        }

        const appsResponse = await axios.get(
          `http://localhost:3000/apps/patient/${id}`
        );

        if (appsResponse.data) {
          const transformedData = appsResponse.data.map((item) => ({
            id: item._id,
            patientId: id,
            DoctorName: item.doctor
              ? item.doctor.fullName
              : 'Doctor Not Found',
            status: item.status,
            date: new Date(item.date),
          }));
          setApps(transformedData);
          setFilteredRows(transformedData);
        } else {
          console.error('No data received from the API');
        }
      } catch (error) {
        console.error('Error booking appointment:', error);
      }
    }
  };
  const getAppointment = async () => {
    try {
      const response = await axios.get('http://localhost:3000/apps/available-appointments');
      if (response && response.status === 200) {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          console.log(data);
          console.log('Will handle payment now');
          // Assuming selectedAppointmentId is defined
          handlePayment(data, selectedAppointmentId,discountedPrice);
        } else {
          console.error('No valid data found in the response.');
        }
      } else {
        console.error('Error:', response && response.data);
      }
    } catch (error) {
      console.error('Error fetching available appointments:', error);
    }
  };
  
  
  // const handlePayment = async (cartData, selectedAppointmentId) => {
  //   try {
  //     const items = cartData;

  
  //     if (!Array.isArray(items) || items.length === 0) {
  //       console.error('No valid items found in the cart data.');
  //       return;
  //     }
  
  //     const selectedItem = items.find(item => item._id === selectedAppointmentId);
  
  //     if (!selectedItem) {
  //       console.error('Selected appointment not found in the cart data.');
  //       return;
  //     }
  
  //     const doctorId = selectedItem.doctor && selectedItem.doctor._id;
  
  //     if (!doctorId) {
  //       console.error('Doctor ID is not available for the selected appointment.');
  //       return;
  //     }
  
  //     console.log('Selected Appointment ID:', selectedAppointmentId);
  //     console.log('Doctor ID:', doctorId);
  //     console.log('Patient ID:', apps);
  //     console.log('app:', selectedItem);
  //     const price=calculateDiscountedPrice(selectedItem);
       
  //     console.log(price, "price");
  //       try {
  //         const response = await axios.post('http://localhost:3000/payment', {
  //           appId: selectedAppointmentId,
  //           lineItem: {
  //             price_data: {
  //               currency: 'usd',
  //               product_data: {
  //                 name: selectedAppointmentId.toString(),
  //               },
  //               unit_amount: price * 100,
  //             },
  //             quantity: 1,
  //           },
  //         });
  //         console.log('Will handle payment now');
  //         console.log(response && response.data);
  //         handleSubmitPayment();
        
  
  //     if (response && response.status === 200) {
  //       window.location = response.data && response.data.url;
  //       console.log(response.data && response.data.url);
  //     } else {
  //       console.error('Error:', response && response.data);
  //     }
  //   } catch (error) {
  //     console.error('Error handling payment:', error.response && error.response.data);
  //   }
  // } catch (error) {
  //   console.error('Error fetching available appointments:', error);
  // };
  // };

  const handlePayment = async (cartData, selectedAppointmentId,discountedPrice) => {
    try {
      const items = cartData;
  
      if (!Array.isArray(items) || items.length === 0) {
        console.error('No valid items found in the cart data.');
        return;
      }
  
      const selectedItem = items.find(item => item._id === selectedAppointmentId);
  
      if (!selectedItem) {
        console.error('Selected appointment not found in the cart data.');
        return;
      }
  
      const doctorId = selectedItem.doctor && selectedItem.doctor._id;
  
      if (!doctorId) {
        console.error('Doctor ID is not available for the selected appointment.');
        return;
      }
  
      console.log('Selected Appointment ID:', selectedAppointmentId);
      console.log('Doctor ID:', doctorId);
      console.log('Patient ID:', apps);
      console.log('app:', selectedAppointmentId);
      //find appointment in apps using selectedAppointmentId
      const appointment = apps.find((app) => app.id === selectedItem._id);
      console.log(appointment, "appointment");
  
  
      console.log('Discounted Price:', discountedPrice);
  
      try {
        const response = await axios.post('http://localhost:3000/payment', {
          appId: selectedAppointmentId,
          patientId: id,
          price: discountedPrice,
          lineItem: {
            price_data: {
              currency: 'usd',
              product_data: {
                name: selectedAppointmentId.toString(),
              },
              unit_amount: discountedPrice * 100, // Convert to cents
            },
            quantity: 1,
          },
        });
  
        console.log('Will handle payment now');
        console.log(response && response.data);
        handleSubmitPayment();
  
        if (response && response.status === 200) {
          window.location = response.data && response.data.url;
          console.log(response.data && response.data.url);
        } else {
          console.error('Error:', response && response.data);
        }
      } catch (error) {
        console.error('Error handling payment:', error.response && error.response.data);
      }
    } catch (error) {
      console.error('Error fetching available appointments:', error);
    }
  };
  

  

  
  const handleWallet2 = async () => {
    try {
        console.log("wallet")
        const response = await axios.get(`http://localhost:3000/wallet/${id}`, {
          
        });
        // const prev= response.data.balance - 200;
        console.log(response.data, "wallet")

        if (response.data.balance < 200) {
          console.error("Insufficient balance");
          
        }
        else{
          {handleSubmitPayment()}
        if (response && response.status === 200) {
          console.log('Wallet payment successful!');
          // Optionally, you can handle any additional logic after a successful wallet payment
          
          // Update the user's wallet balance (assuming you have a state for wallet balance)
          // setWalletBalance(prev);
          // console.log(walletBalance)
          const price=calculateDiscountedPrice();
          console.log(price, "price");
          const response1 = await axios.put(`http://localhost:3000/wallet/${id}/update-balance`, {
            
            patientId: id,
            balance: response.data.balance - price,
          });

          
        } else {
          console.error('Wallet payment failed:', response && response.data);
          // Handle wallet payment failure (e.g., show error message to the user)
        }
      }
    } catch (error) {
      console.error('Error processing wallet payment:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  const handleWallet = async () => {
    try {

      console.log("wallet",discountedPrice)
      const response = await axios.get(`http://localhost:3000/wallet/${id}`);

      if (response.data.balance < discountedPrice ) {
        console.error("Insufficient balance");
      } else {
        {handleSubmitPayment()}
        
        const updatedBalance = response.data.balance - discountedPrice;
        setWalletBalance(updatedBalance);
        console.log(walletBalance);
        const response1 = await axios.put(`http://localhost:3000/wallet/${id}/update-balance`, {
          patientId: id,
          balance: updatedBalance,
        });
        
        if (response1 && response1.status === 200) {
          console.log('Wallet payment successful!');
        } else {
          console.error('Failed to update wallet balance:', response1 && response1.data);
        }
      }
    } catch (error) {
      console.error('Error processing wallet payment:', error);
    }
  };
  

  return (
    <>
      <AppBarComponent />
      <h1>My Appointments</h1>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          gap: '16px',
          padding: '10px',
        }}
      >
        <TextField
          type="datetime-local"
          variant="outlined"
          value={checkAvailabilityDate}
          onChange={(e) => setCheckAvailabilityDate(e.target.value)}
        />
                <Button variant="contained" onClick={handleFilterChangeOne}>
          Check Availability
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setCheckAvailabilityDate('');

            axios.get(`http://localhost:3000/apps/available-appointments`)
              .then((response) => {
                if (response.data) {
                  const availableData = response.data.map((item) => ({
                    id: item._id,
                    DoctorName: item.doctor ? item.doctor.fullName : 'Doctor Not Found',
                    date: new Date(item.date),
                  })).filter((item) => item.date >= currentDate);

                  setAvailableApps(availableData);
                } else {
                  console.error('No data received from the API');
                }
              })
              .catch((error) => {
                console.error('Error fetching available appointments:', error);
              });
          }}
        >
          Reset
        </Button>

      </Box>

      <h2>Available Appointments</h2>
      <DataGrid
        rows={availableApps}
        columns={availableColumns}
        pageSize={5}
        checkboxSelection
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          gap: '16px',
          padding: '10px',
        }}
      >
        <TextField
          type="date"
          variant="outlined"
          value={
            dateFilterStart
              ? dateFilterStart.toISOString().split('T')[0]
              : ''
          }
          onChange={(e) =>
            setDateFilterStart(new Date(e.target.value))
          }
        />
        <TextField
          type="date"
          variant="outlined"
          value={
            dateFilterEnd
              ? dateFilterEnd.toISOString().split('T')[0]
              : ''
          }
          onChange={(e) =>
            setDateFilterEnd(new Date(e.target.value))
          }
        />
        <FormControl variant="outlined">
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter"
            value={selectedStatusFilter}
            onChange={handleStatusFilterChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Upcoming">Upcoming</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="Rescheduled">Rescheduled</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleFilterChange}>
          Apply Filters
        </Button>
      </Box>

      <h2>My Appointments</h2>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
      <Dialog
        open={isPaymentDialogOpen}
        onClose={closePaymentDialog}
      >
        <DialogTitle>Select Payment Method</DialogTitle>
        <DialogContent>
          <FormControl>
            <InputLabel id="family-member-label">
              Family Member
            </InputLabel>
            <Select
              labelId="family-member-label"
              id="family-member"
              value={selectedFamilyMember}
              onChange={handleFamilyMemberChange}
            >
              <MenuItem value="myself">Myself</MenuItem>
              {familyMembers.map((member) => (
                <MenuItem
                  key={member._id}
                  value={member._id}
                >
                  {member.patient.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <RadioGroup
            name="paymentOption"
            value={paymentOption}
            onChange={handlePaymentOptionChange}
          >
            <FormControlLabel
              value="wallet"
              control={<Radio />}
              label="Payment by Wallet"
            />
            <FormControlLabel
              value="visa"
              control={<Radio />}
              label="Payment by Visa"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={closePaymentDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => paymentOption === 'visa' ? getAppointment() : handleWallet()} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}