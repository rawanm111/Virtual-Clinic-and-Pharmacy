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
  const [selectedFamilyMember, setSelectedFamilyMember] = useState('myself'); // Added family member state
  const [familyMembers, setFamilyMembers] = useState([]); // Added family members state
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All'); 
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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/apps/available-appointments`)
      .then((response) => {
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
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching available appointments:', error);
      });
  }, [currentDate]);

  const columns = [
    { field: 'DoctorName', headerName: 'Doctor Name', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'date', headerName: 'Date', width: 200 },
  ];

  const availableColumns = [
    { field: 'DoctorName', headerName: 'Doctor Name', width: 200 },
    { field: 'date', headerName: 'Date', width: 200 },
    {
      field: 'action',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleBookAppointment(params.row.id)}
        >
          Book Appointment
        </Button>
      ),
    },
  ];
 // Added status filter state

 const handleStatusFilterChange = (event) => {
  setSelectedStatusFilter(event.target.value);
};

const handleFilterChange = () => {
  const filteredApps = apps.filter((app) => {
    // Check if the date is within the selected range
    const isDateInRange =
      (!dateFilterStart || app.date >= dateFilterStart) &&
      (!dateFilterEnd || app.date <= dateFilterEnd);

    // Check if the status matches the selected status filter
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

  

  const handleBookAppointment = (appointmentId) => {
    setSelectedAppointmentId(appointmentId); // Store the appointmentId in state
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

  const handleSubmitPayment = () => {
    if (selectedAppointmentId) {
      closePaymentDialog();
      let updatedAppointment;
  
      if (selectedFamilyMember === 'myself') {
        updatedAppointment = {
          patient: id, // Use the user's ID when booking for oneself
          familyMember: null, // No specific family member when booking for oneself
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

      axios
        .put(`http://localhost:3000/apps/${selectedAppointmentId}`, updatedAppointment)
        .then((response) => {
          console.log(`Booked appointment with ID: ${selectedAppointmentId}`);

          // After successfully booking, reload the available appointments
          axios
            .get(`http://localhost:3000/apps/available-appointments`)
            .then((response) => {
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
            })
            .catch((error) => {
              console.error(
                'Error fetching available appointments:',
                error
              );
            });

          // After booking, also update 'My Appointments' list
          axios
            .get(`http://localhost:3000/apps/patient/${id}`)
            .then((response) => {
              if (response.data) {
                const transformedData = response.data.map((item) => ({
                  id: item._id,
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
            })
            .catch((error) => {
              console.error('Error fetching apps:', error);
            });
        })
        .catch((error) => {
          console.error('Error booking appointment:', error);
        });
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
        <Button
          variant="contained"
          onClick={handleFilterChangeOne}
        >
          Check Availability
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setCheckAvailabilityDate('');

            axios
              .get(`http://localhost:3000/apps/available-appointments`)
              .then((response) => {
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
                  console.error('No data received from the API');
                }
              })
              .catch((error) => {
                console.error(
                  'Error fetching available appointments:',
                  error
                );
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
          <Button onClick={handleSubmitPayment} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
