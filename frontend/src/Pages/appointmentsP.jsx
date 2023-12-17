import React, { useEffect ,useState} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import S1 from '../css/open-iconic-bootstrap.min.css';
import S2 from '../css/animate.css';
import S3 from '../css/owl.carousel.min.css';
import S4 from '../css/owl.theme.default.min.css';
import S5 from '../css/magnific-popup.css';
import S6 from '../css/aos.css';
import S7 from '../css/ionicons.min.css';
import S8 from '../css/bootstrap-datepicker.css';
import S9 from '../css/jquery.timepicker.css';
import S10 from '../css/flaticon.css';
import S11 from '../css/icomoon.css';
import S12 from '../css/style.css';
import I1 from "../images/about.jpg";
import I2 from "../images/bg_1.jpg";
import I3 from "../images/bg_2.jpg";
import { FaUser, FaWallet } from 'react-icons/fa';
import { format } from 'date-fns';
import Notif from "./notifModal";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { FaMessage} from 'react-icons/fa6';
import {
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
import WalletModal from './walletModal'
import Modal from '@mui/material/Modal';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
 export default function() {
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
  const [isRescheduelOpen,setIsRescheduelOpen] = useState();
  const [isRescheduelOpenFamily,setIsRescheduelOpenFamily] = useState();
  const [app,setApp] = useState();
  const[openFU,setOpenFU]= useState();
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [success, setSuccess] = useState(false); 
  const [tabValue, setTabValue] = useState(0); 

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleChange = (prop) => (event) => {
    setPasswords({ ...passwords, [prop]: event.target.value });
    setSuccess(false); 
  };  const handleOpenChangePassword = () => {
    setChangePasswordOpen(true);
  };
  const handleCloseChangePassword = () => {
    setChangePasswordOpen(false);
  };
  const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
    return regex.test(password);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    
    setSuccess(false);

    
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("New passwords don't match.");
      return;
    }

    if (!isValidPassword(passwords.newPassword)) {
      alert("Password must contain at least one capital letter, one number, and be at least 4 characters long.");
      return;
    }

    console.log('Passwords submitted:', passwords);
    
    
    
    setSuccess(true);

   
    updatePassword(passwords.newPassword)
    alert("Password changed successfully");
  };
  const updatePassword = async (newPassword) => {
    try {
      // Replace '/api/reset-password' with your actual API endpoint
      const response = await axios.put('http://localhost:3000/changepassword', { id, newPassword });
      console.log(response.data);
      alert('Password successfully updated');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password');
    }
  };
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [username, setUsername] = useState('');
  const [apps, setApps] = useState([]);
  const [dateFollowup, setDateFollowup] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);
  const [availableApps, setAvailableApps] = useState([]);
  const [dateFilterStart, setDateFilterStart] = useState(null);
  const [dateReschedule, setDateReschedule] = useState(null);
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
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [currentImage, setCurrentImage] = useState(I2);
  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
  const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const [healthPackages, setHealthPackages] = useState([]);
  const [newAppointmentDateTime, setNewAppointmentDateTime] = useState('');
  const [followUpDateTime, setFollowUpDateTime] = useState('');
  const [followUpPatientName, setFollowUpPatientName] = useState('');
  const [appointmentStatus, setAppointmentStatus] = useState('');
  const [selectedStatusFilterFam, setSelectedStatusFilterFam] = useState('All');
  const [filteredRowsFam, setFilteredRowsFam] = useState([]);
  const [appsFam, setAppsFam] = useState([]);
  const [dateFilterStartFam, setDateFilterStartFam] = useState(null);
  const [dateFilterEndFam, setDateFilterEndFam] = useState(null);
  const [selectedAppointmentIdFam, setSelectedAppointmentIdFam] = useState(null);
  const [selectedFamilyMemberFam, setSelectedFamilyMemberFam] = useState('myself');
  const [familyMembersFam, setFamilyMembersFam] = useState([]);
  const [isPaymentDialogOpenFam, setIsPaymentDialogOpenFam] = useState(false);
  const [paymentOptionFam, setPaymentOptionFam] = useState('wallet');
  const [walletBalanceFam, setWalletBalanceFam] = useState(0);
  const [selectedSpecialtyFam, setSelectedSpecialtyFam] = useState('All');



  const navigate = useNavigate();

  const { patientId2 } = useParams(); 

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
        console.log(response.data, 'response.data');
        if (response.data) {
          const availableData = response.data.map((item) => ({
            id: item._id,
            DoctorName: item.doctor ? item.doctor.fullName : 'Doctor Not Found',
            date: new Date(item.date),
          })).filter((item) => item.date >= currentDate);
          
          console.log(availableData);
          setAvailableApps(availableData);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching available appointments:', error);
      });
  }, []);


//get family members 
  useEffect(() => {
    axios
      .get(`http://localhost:3000/patients/family_members/user/${id}`)
      .then((response) => {
        console.log(response.data, 'family mems');
        if (response.data) {
          setFamilyMembersFam(response.data);
        } else {
          console.error('No family members data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching family members:', error);
      });
  }, [id]);


  //get apps of all family members in family members fam list by maping through it
  useEffect(() => {
    familyMembersFam.map((member) => {
      axios
        .get(`http://localhost:3000/apps/patient/${member.patient._id}`)
        .then((response) => {
          if (response.data) {
            const transformedData = response.data.map((item) => ({
              id: item._id,
              patientId: member.patient._id,
              FamilyMemberName: member.patient.fullName,
              DoctorName: item.doctor
                ? item.doctor.fullName
                : 'Doctor Not Found',
              status: item.status,
              date: new Date(item.date),
            }));
            setAppsFam((prev) => [...prev, ...transformedData]);
            setFilteredRowsFam((prev) => [...prev, ...transformedData]);
          } else {
            console.error('No data received from the API');
          }
        })
        .catch((error) => {
          console.error('Error fetching apps:', error);
        });
    });
    
  }, [familyMembersFam]);

//i dont want any repeated appointments in the table
  useEffect(() => {
    const uniqueApps = appsFam.filter(
      (app, index, self) =>

        index === self.findIndex((t) => t.id === app.id)
    );
    setAppsFam(uniqueApps);
    setFilteredRowsFam(uniqueApps);
  }, [appsFam]);



  







  
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
    { field: 'DoctorName', headerName: 'Doctor Name', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'date', headerName: 'Date', width: 550 },
    {
      field: 'discountedPrice',
      headerName: 'Discounted Price',

      width: 130,
      renderCell: (params) => {
        const discountedPrice = calculateDiscountedPrice(params.row);
        return <span>{discountedPrice.toFixed(2)}</span>;
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleButtonCancel(params.row.id)}
        >
          Cancel
        </Button>
         <Button
         variant="outlined"
         color="primary"
         onClick={() => openModal(params.row.id)}
       >
         Reschedule
       </Button> </>
      ),
  
    },
    
    
  ];

  const columnsFamily = [
    { field: 'DoctorName', headerName: 'Doctor Name', width: 150 },
    { field: 'FamilyMemberName', headerName: 'Family Member Name', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'date', headerName: 'Date', width: 550 },
    {
      field: 'discountedPrice',
      headerName: 'Discounted Price',

      width: 130,
      renderCell: (params) => {
        const discountedPrice = calculateDiscountedPrice(params.row);
        return <span>{discountedPrice.toFixed(2)}</span>;
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleButtonCancel(params.row.id)}
        >
          Cancel
        </Button>
         <Button
         variant="outlined"
         color="primary"
         onClick={() => openModalFamily(params.row.id)}
       >
         Reschedule
       </Button> </>
      ),
  
    },
    
    
  ];


  const availableColumns = [
    { field: 'DoctorName', headerName: 'Doctor Name', width: 150 },
    { field: 'date', headerName: 'Date', width: 280 },
    {
      field: 'discountedPrice',
      headerName: 'Discounted Price',
      width: 100,
      renderCell: (params) => {
        const discountedPrice = calculateDiscountedPrice(params.row);
        return (
          <span>
            {discountedPrice.toFixed(2)}
          </span>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => {
        
        return (
          <span>
           
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

  const handleStatusFilterChangeFam = (event) => {
    setSelectedStatusFilterFam(event.target.value);
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

  const handleFilterChangeFam = () => {
    const filteredApps = appsFam.filter((app) => {
      const isDateInRange =

        (!dateFilterStart || app.date >= dateFilterStart) &&
        (!dateFilterEnd || app.date <= dateFilterEnd);
        
      const isStatusMatch =

        selectedStatusFilterFam === 'All' || app.status === selectedStatusFilterFam;

        if (selectedStatusFilterFam === 'All') {
          familyMembersFam.map((member) => {
            axios
              .get(`http://localhost:3000/apps/patient/${member.patient._id}`)
              .then((response) => {
                if (response.data) {
                  const transformedData = response.data.map((item) => ({
                    id: item._id,
                    patientId: member.patient._id,
                    FamilyMemberName: member.patient.fullName,
                    DoctorName: item.doctor
                      ? item.doctor.fullName
                      : 'Doctor Not Found',
                    status: item.status,
                    date: new Date(item.date),
                  }));
                  setAppsFam((prev) => [...prev, ...transformedData]);
                  setFilteredRowsFam((prev) => [...prev, ...transformedData]);
                } else {
                  console.error('No data received from the API');
                }
              })
              .catch((error) => {
                console.error('Error fetching apps:', error);
              });
          });
        }

      return isDateInRange && isStatusMatch;
    });
    setAppsFam(filteredApps);
    setFilteredRowsFam(filteredApps);

    
  };

 
  const openModal =(selectedapp) => {
    setApp(selectedapp);
    setIsRescheduelOpen(true);
   }

    const openModalFamily =(selectedapp) => {
      setApp(selectedapp);
      setIsRescheduelOpenFamily(true);
      }

  

  const handleButtonCancel = async (appointmentId) => {
const id = "6575267573a2d909817e94e5";
// const cancel = 'cancel';
    
    try {
       // Make an API call here using axios or your preferred library
      const response = await axios.put(`http://localhost:3000/apps/${appointmentId}/cancel`);
      
     if (response.status === 200) {
       console.log('Button clicked and API call successful.');
         // You can update state or perform any other actions here
       } else {
         console.error('API call failed.');
        // Handle error cases here
      }
      try {
        const response = await axios.get('http://localhost:3000/apps/notifications/cancelled');
        // Process the response as needed
        console.log('Last Appointment:', response.data);
      } catch (error) {
        console.error('Error fetching last appointment:', error);
      }
      window.location.reload();

     } catch (error) {
      console.error('Error making API call:', error);
        // Handle error cases here
    }
  };
  const sendNotif = async () => {
    try {
      const response = await axios.get('http://localhost:3000/apps/notifications/rescheduled');
      // Process the response as needed
      console.log('Last Appointment:', response.data);
    } catch (error) {
      console.error('Error fetching last appointment:', error);
    }
  };
  const handleReschedule = async (appointmentId) => {
    if (!dateReschedule) {
      console.error('Please select a reschedule date');
      return;
    }

    const formattedDate = format(dateReschedule, 'yyyy-MM-dd');

    try {
      const response = await axios.put(`http://localhost:3000/apps/${appointmentId}/reschedule`, {
        newDate: formattedDate,
      });

      if (response.status === 200) {
        console.log('Reschedule API call successful.');
        // You can update state or perform any other actions here
      } else {
        console.error('API call failed.');
        // Handle error cases here
      }
    } catch (error) {
      console.error('Error making API call:', error);
      // Handle error cases here
    }
  };

  
  



  const handleFilterChangeOne = () => {
    const checkDate = checkAvailabilityDate ? new Date(checkAvailabilityDate) : null;
  
    // Filter availableApps based on both date and doctor's specialty
    const filteredAvailableApps = availableApps.filter((app) => {
      const appDate = new Date(app.date);
  
      // Check if the date matches (if checkDate is provided)
      const isDateMatch = !checkDate || (
        appDate.getFullYear() === checkDate.getFullYear() &&
        appDate.getMonth() === checkDate.getMonth() &&
        appDate.getDate() === checkDate.getDate() &&
        appDate.getHours() === checkDate.getHours() &&
        appDate.getMinutes() === checkDate.getMinutes()
      );
  
      // Check if the doctor's specialty matches
      const doctorSpecialty = docs.find((doc) => doc.fullName === app.DoctorName)?.speciality;
      const isSpecialtyMatch = selectedSpecialty === '' || doctorSpecialty === selectedSpecialty;
  
      // Return true only if both date and specialty match
      return isDateMatch && isSpecialtyMatch;
    });
  
    setAvailableApps(filteredAvailableApps);
  };




  
  const fetchDoctorInfo = async () => {
    
    try {
      const response = await axios.get(`http://localhost:3000/doctors/${username}`);

      if (response.status === 200) {
        setDoctorInfo(response.data);
       
        console.log(doctorInfo._id);
        console.log(doctorInfo.id);
      } else {
        console.error('API call to fetch doctor info failed.');
      }
    } catch (error) {
      console.error('Error fetching doctor info:', error);
    }
   
    
  };
  

  const handleCreateFollowup = async () => {
    if (!doctorInfo) {
      console.error('Doctor information is not available.');
      return;
    }

    if (!dateFollowup) {
      console.error('Please fill in all required fields');
      return;
    }

    try {
      const followUpResponse = await axios.post(`http://localhost:3000/followup`, {
        doctor: doctorInfo._id,
        patient: patientId,
        date: dateFollowup,
      });

      if (followUpResponse.status === 201) {
        console.log('Follow-up appointment created successfully.');
        // Handle success or navigate to a confirmation page
      } else {
        console.error('API call to create follow-up appointment failed.');
      }
    } catch (error) {
      console.error('Error making follow-up API call:', error);
    }
  };

const handleCreateFollowupFamily = async () => {
  if (!doctorInfo) {
    // console.error('Doctor information is not available.');
    return;
  }

  if (!dateFollowup) {
    console.error('Please fill in all required fields');
    return;
  }

  try {
    const followUpResponse = await axios.post(`http://localhost:3000/followup`, {
      doctor: doctorInfo._id,
      patient: selectedFamilyMember, 
      date: dateFollowup,
    });

    if (followUpResponse.status === 201) {
      console.log('Follow-up appointment created successfully.');
      // Handle success or navigate to a confirmation page
    } else {
      console.error('API call to create follow-up appointment failed.');
    }
  } catch (error) {
    console.error('Error making follow-up API call:', error);
  }
};



  const handleGetDoctorInfo = async () => {
    if (!username) {
      console.error('Please enter a doctor\'s username');
      return;
    }

    await fetchDoctorInfo();
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

    const handleOpenFU = () => {
      setOpenFU(true);
    };

    const [openFUFamily, setOpenFUFamily] = useState(false);
    const handleOpenFUFamily = () => {
      setOpenFUFamily(true);
    };



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
<div style={{ backgroundColor: "white" }}>
  <title>MetaCare </title>
  <nav className="navbar py-4 navbar-expand-lg ftco_navbar navbar-light bg-light flex-row">
        <div className="container"  >
          <div className="row no-gutters d-flex align-items-start align-items-center px-3 px-md-0">
            <div className="col-lg-2 pr-4 align-items-center">
              <a className="navbar-brand" >
                Meta<span>Care</span>
              </a>
              
            </div>
          </div>
        </div>
      </nav>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark ftco-navbar-light"
        id="ftco-navbar"
        
      >
        <div className="container d-flex align-items-center">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu" /> Menu
          </button>
      <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item " style={{marginRight:"10px"} }>
                <a  className="nav-link pl-0"  onClick={() => navigate(`/clinic-patient-home/${id}`)}>
                  Home
                </a>
              </li>
              <li
                className="nav-item dropdown "
                onMouseEnter={() => setShowPersonalDropdown(true)}
                onMouseLeave={() => setShowPersonalDropdown(false)}
              >
                <a
                  className="nav-link dropdown-toggle"
                  
                  id="doctorsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={setShowPersonalDropdown}
                >
                  Personal
                </a>
                <div
                  className={`dropdown-menu ${
                    showPersonalDropdown ? 'show' : ''
                  }`}
                  aria-labelledby="personalDropdown"
                >
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/my-fam/${id}`)}>
                    My Family
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/MedHistory/${id}`)}>
                    My Medical History
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/Prescription/${id}`)}>
                    My Prescriptions
                  </a>
                 
                </div>
              </li>
              {/* New dropdown for Doctors */}
              <li
                className="nav-item dropdown active"
                onMouseEnter={() => setShowDoctorsDropdown(true)}
                onMouseLeave={() => setShowDoctorsDropdown(false)}
              >
                <a
                  className="nav-link dropdown-toggle"
                  
                  id="doctorsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={showDoctorsDropdown}
                >
                  Doctors
                </a>
                <div
                  className={`dropdown-menu ${
                    showDoctorsDropdown ? 'show' : ''
                  }`}
                  aria-labelledby="doctorsDropdown"
                >
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/doctorsTable/${id}`)}>
                    Doctors List
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/appPagePatient/${id}`)}>
                    My Appointments
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/appPagePatientt/${id}`)}>
                    Book Appointment
                  </a>
                </div>
              </li>
              {/* New dropdown for Health Packages */}
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setShowHealthPackagesDropdown(true)}
                onMouseLeave={() => setShowHealthPackagesDropdown(false)}
              >
                <a
                  className="nav-link dropdown-toggle"
                  
                  id="doctorsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={setShowHealthPackagesDropdown}
                  
                >
                  Pricings
                </a>
                <div
                  className={`dropdown-menu ${
                    showHealthPackagesDropdown ? 'show' : ''
                  }`}
                  aria-labelledby="doctorsDropdown"
                >
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                 onClick={() => navigate(`/health-packages-VIEW/${id}`)}>
                    Health Packages
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                 onClick={() => navigate(`/health-packages-sub/${id}`)}>
                    Subscribed Packages
                  </a>
                 
                </div>
              </li>
              {/* Profile dropdown */}
              
    
<li
  className="nav-item dropdown "
  onMouseEnter={() => setShowProfileDropdown(true)}
  onMouseLeave={() => setShowProfileDropdown(false)}
  style={{marginLeft:"530px"}}
>
  <a
    className="nav-link dropdown-toggle"
   
    id="profileDropdown"
    role="button"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded={showProfileDropdown}
    
  >
    <FaUser style={{ fontSize: '20px', marginRight: '5px' }} />
    
  </a>
  <div
    className={`dropdown-menu ${showProfileDropdown ? 'show' : ''}`}
    aria-labelledby="profileDropdown"
  >
    <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={handleOpenChangePassword}>
      Change Password
    </a>
    <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
              onClick={() => navigate(`/clinic`)}>
      Logout
    </a>
  </div>
</li>

{/* Wallet icon without dropdown */}
<li className="nav-item ">
<WalletModal/>
</li>
<li className="nav-item ">
<Notif/>
</li><li className="nav-item "  >
                <a  className="nav-link pl-0"  style={{cursor:"pointer" ,marginLeft:'5px'} } onClick={() => navigate(`/messages/${id}`)}>
                <FaMessage style={{ fontSize: '20px'}} />
                </a>
              </li>  
            </ul>
          </div>
        </div>
      </nav>


      
      <section
      className="hero-wrap hero-wrap-2"
      style={{ backgroundImage: `url(${I2})` }}
      data-stellar-background-ratio="0.5"
    >
      <div className="overlay" />
      <div className="container">
        <div className="row no-gutters slider-text align-items-center justify-content-center">
          <div className="col-md-9  text-center" style={{ fontWeight: 'bold', fontSize: '72px' }}>
            <h1 className="mb-2 bread" style={{ fontWeight: 'bold', fontSize: '72px' }}>
              My Appointments
            </h1>
            <p className="breadcrumbs">
              <span className="mr-2" style={{ fontSize: '14px', color: '#fff' }}>
                <a >
                  Home <i className="ion-ios-arrow-forward" />
                </a>
              </span>{' '}
              <span style={{ fontSize: '14px', color: '#fff' }}>
                My Appointments <i className="ion-ios-arrow-forward" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
    <>
  
    <Tabs
  value={tabValue}  // You'll need to manage the selected tab value in your component state
  onChange={handleTabChange}  // Implement a function to handle tab changes
  centered  // or use "variant='fullWidth'" based on your preference
>
  <Tab label="Personal Appointments" />
  <Tab label="Family Appointments" />
</Tabs>


{tabValue === 0 && (
  // Follow Up Tab
  <>
   <Button variant="contained"
//  onClick={handleCreateFollowup} 
onClick={handleOpenFU}
 sx={{ flex: 1 , paddingTop: '16px', marginLeft:'5%', marginTop:'1%', marginBottom:'-2%', width:'90%'}}> {/* Adjust the flex property */}
    Request FollowUp Appointement 
  </Button>

 <Box sx={{ flex: 1, backgroundColor: '#FFFFFF', padding: '12px', margin: '70px', marginTop: '70', border: '2px solid #007bff', borderRadius: '8px', textAlign: 'center', width: '90%' }}>
          
          
        

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%' }}>
  <TextField
    type="date"
    variant="outlined"
    value={dateFilterStart ? dateFilterStart.toISOString().split('T')[0] : ''}
    onChange={(e) => setDateFilterStart(new Date(e.target.value))}
    sx={{ flex: 1 }} // Adjust the flex property
  />
  <TextField
    type="date"
    variant="outlined"
    value={dateFilterEnd ? dateFilterEnd.toISOString().split('T')[0] : ''}
    onChange={(e) => setDateFilterEnd(new Date(e.target.value))}
    sx={{ flex: 1 }} // Adjust the flex property
  />
  <FormControl variant="outlined" sx={{ flex: 1, minWidth: '120px' }}>
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
      <MenuItem value="Accepted Followup">Accepted Followup</MenuItem>
      <MenuItem value="Rejected Followup">Rejected Followup</MenuItem>
    </Select>
  </FormControl>
  <Button variant="contained" onClick={handleFilterChange} sx={{ flex: 1 }}> {/* Adjust the flex property */}
    Apply Filters
  </Button>
</Box>

        <Box sx={{ marginTop: '16px' }}>        
          <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={5}
              rowHeight={40}
              autoHeight
              columnBuffer={5}
              cellClassName={() => 'custom-cell-class'}
            />




        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '75%' }}>







</Box>
      </Box>
  </>
)}



{tabValue === 1 && (
  // Other Tab
  <>
    <Button variant="contained"
//  onClick={handleCreateFollowup} 
onClick={handleOpenFUFamily}
 sx={{ flex: 1 , paddingTop: '16px', marginLeft:'5%', marginTop:'1%', marginBottom:'-2%', width:'90%'}}> {/* Adjust the flex property */}
    Request FollowUp Appointement 
  </Button>

 <Box sx={{ flex: 1, backgroundColor: '#FFFFFF', padding: '12px', margin: '70px', marginTop: '70', border: '2px solid #007bff', borderRadius: '8px', textAlign: 'center', width: '90%' }}>
          
          
        

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%' }}>
  <TextField
    type="date"
    variant="outlined"
    value={dateFilterStart ? dateFilterStart.toISOString().split('T')[0] : ''}
    onChange={(e) => setDateFilterStart(new Date(e.target.value))}
    sx={{ flex: 1 }} 
  />
  <TextField
    type="date"
    variant="outlined"
    value={dateFilterEnd ? dateFilterEnd.toISOString().split('T')[0] : ''}
    onChange={(e) => setDateFilterEnd(new Date(e.target.value))}
    sx={{ flex: 1 }} // Adjust the flex property
  />
  <FormControl variant="outlined" sx={{ flex: 1, minWidth: '120px' }}>
    <InputLabel id="status-filter-label">Status</InputLabel>
    <Select
      labelId="status-filter-label"
      id="status-filter"
      value={selectedStatusFilterFam}
      onChange={handleStatusFilterChangeFam}
    >
      <MenuItem value="All">All</MenuItem>
      <MenuItem value="Upcoming">Upcoming</MenuItem>
      <MenuItem value="Completed">Completed</MenuItem>
      <MenuItem value="Cancelled">Cancelled</MenuItem>
      <MenuItem value="Rescheduled">Rescheduled</MenuItem>
      <MenuItem value="Accepted Followup">Accepted Followup</MenuItem>
      <MenuItem value="Rejected Followup">Rejected Followup</MenuItem>
    </Select>
  </FormControl>
  <Button variant="contained" onClick={handleFilterChangeFam} sx={{ flex: 1 }}> {/* Adjust the flex property */}
    Apply Filters
  </Button>
</Box>

        <Box sx={{ marginTop: '16px' }}>      
          <DataGrid
              rows={filteredRowsFam}
              columns={columnsFamily}
              pageSize={5}
              rowHeight={40}
              autoHeight
              columnBuffer={5}
              cellClassName={() => 'custom-cell-class'}
            />




        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '75%' }}>







</Box>
      </Box>
  </>
)}







  </>
  <Modal
        open={isChangePasswordOpen}
        onClose={handleCloseChangePassword}
        aria-labelledby="change-password-popup"
      >
        <Box
          sx={{
            marginTop: '15%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '400px',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h4" component="div" sx={{ color: '#007bff' , fontWeight: 'bold', textAlign: 'center'}}>
              Change Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                autoComplete="new-password"
                value={passwords.newPassword}
                onChange={handleChange('newPassword')}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmNewPassword"
                label="Confirm New Password"
                type="password"
                id="confirmNewPassword"
                autoComplete="new-password"
                value={passwords.confirmNewPassword}
                onChange={handleChange('confirmNewPassword')}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={isRescheduelOpen}
        aria-labelledby="resched popup"
      >
        <Box
          sx={{
            marginTop: '15%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Box
            sx={{
              width: '400px',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h4" component="div" sx={{ color: '#007bff' , fontWeight: 'bold', textAlign: 'center'}}>
              Reschedule
            </Typography>
            <Box component="form"  sx={{ mt: 3 }}>
              <h5>Choose a date to reschedule</h5>
          <TextField
    type="date"
    variant="outlined"
    value={dateReschedule ? dateReschedule.toISOString().split('T')[0] : ''}
    onChange={(e) => setDateReschedule(new Date(e.target.value))}
    sx={{ flex: 1, marginLeft: 'auto',paddingTop: '16px'  }}
  />


        
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  handleReschedule(app);
                  sendNotif();
                }}
              >
                Submit 
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal
  open={openFU}
  aria-labelledby="resched popup"
>
  <Box
    sx={{
      marginTop: '15%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Box
      sx={{
        width: '400px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" component="div" sx={{ color: '#007bff' , fontWeight: 'bold', textAlign: 'center'}}>
        Request Follow Up Appointment
      </Typography>
      <Box component="form" sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h5>Choose a date for follow up</h5>
        <TextField
          type="date"
          variant="outlined"
          value={dateFollowup ? dateFollowup.toISOString().split('T')[0] : ''}
          onChange={(e) => setDateFollowup(new Date(e.target.value))}
        />
        <input
          type="text"
          placeholder="Doctor's username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleGetDoctorInfo} 
        > 
          Load Doctor
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={handleCreateFollowup} 
        >
          Submit 
        </Button>
      </Box>
    </Box>
  </Box>
</Modal>




<Modal
        open={isRescheduelOpenFamily}
        aria-labelledby="resched popup"
      >
        <Box
          sx={{
            marginTop: '15%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Box
            sx={{
              width: '400px',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h4" component="div" sx={{ color: '#007bff' , fontWeight: 'bold', textAlign: 'center'}}>
              Reschedule
            </Typography>
            <Box component="form"  sx={{ mt: 3 }}>
              <h5>Choose a date to reschedule</h5>
          <TextField
    type="date"
    variant="outlined"
    value={dateReschedule ? dateReschedule.toISOString().split('T')[0] : ''}
    onChange={(e) => setDateReschedule(new Date(e.target.value))}
    sx={{ flex: 1, marginLeft: 'auto',paddingTop: '16px'  }}
  />


   
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  handleReschedule(app);
                  sendNotif();
                }}
              >
                Submit 
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Modal
  open={openFUFamily}
  aria-labelledby="resched popup"
>
  <Box
    sx={{
      marginTop: '15%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Box
      sx={{
        width: '400px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" component="div" sx={{ color: '#007bff' , fontWeight: 'bold', textAlign: 'center'}}>
        Request Follow Up Appointment
      </Typography>
      <Box component="form" sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h5>Choose a date for follow up</h5>
        <TextField
          type="date"
          variant="outlined"
          value={dateFollowup ? dateFollowup.toISOString().split('T')[0] : ''}
          onChange={(e) => setDateFollowup(new Date(e.target.value))}
        />
        <input
          type="text"
          placeholder="Doctor's username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormControl variant="outlined" sx={{ flex: 1, minWidth: '120px' }}>
    <InputLabel id="status-filter-label">Family Member</InputLabel>
    <Select

      labelId="status-filter-label"
      id="status-filter"
      value={selectedFamilyMember}
      onChange={handleFamilyMemberChange}
    >
      {/* <MenuItem value="myself">Myself</MenuItem> */}
      {familyMembers.map((member) => (
        <MenuItem value={member.patient._id}>{member.patient.fullName}</MenuItem>
      ))}
    </Select>
  </FormControl>

        <Button
          variant="contained"
          onClick={handleGetDoctorInfo} 
        > 
          Load Doctor
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={handleCreateFollowupFamily(selectedFamilyMember)} 
        >
          Submit 
        </Button>
      </Box>
    </Box>
  </Box>
</Modal>



  </div>
)}