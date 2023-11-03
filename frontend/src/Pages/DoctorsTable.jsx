import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Popover, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AppBarComponent from '../Components/Appbar/AppbarPatientClinc';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css'; // Import CSS for time selection

export default function DoctorsTable() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectedDoctorData, setSelectedDoctorData] = useState(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [uniqueSpeciality, setUniqueSpeciality] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null); // State for date and time selection

  useEffect(() => {
    axios
      .get('http://localhost:3000/doctors')
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id,
            name: item.fullName,
            email: item.email,
            hourly_rate: item.hourlyRate,
            educational_bg: item.educationalBackground,
            affiliation: item.affiliation,
            speciality: item.speciality
          }));
          setDoctors(transformedData);
          setFilteredDoctors(transformedData);
          const uniqueUses = [...new Set(transformedData.map((item) => item.speciality))];
          setUniqueSpeciality(uniqueUses);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  
    axios
      .get('http://localhost:3000/apps/upcoming-appointments')
      .then((response) => {
        if (response.data) {
          const transformedAppointments = response.data.map((appointment) => ({
            did:appointment.did,
            date: new Date(appointment.date).toISOString(),
            // ... other properties
          }));
          setAppointments(transformedAppointments);
        } else {
          console.error('No data received for appointments from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  }, []);
  

const handleFilterChange = (e) => {
  const value = e.target.value.toLowerCase();
  setFilterValue(value);

  if (Array.isArray(doctors)) {
    const searched = doctors.filter((doctor) => {
      return (
        (doctor && doctor.name && doctor.name.toLowerCase().includes(value)) ||
        (doctor && doctor.speciality && doctor.speciality.toLowerCase().includes(value))
      );
    });

    setFilteredDoctors(searched);
  }
};

const handleUpcomingAppointments = () => {
  if (selectedDateTime) {
    const selectedDateISO = selectedDateTime.toISOString(); // Format selectedDateTime for comparison
    const filteredAppointments = appointments.filter((appointment) =>
      appointment.date === selectedDateISO
    );
    setFilteredAppointments(filteredAppointments);
    const didValues = filteredAppointments.map((appointment) => appointment.did);

    const filteredDoctors = doctors.filter((doctor) =>
      didValues.includes(doctor.id)
    );
    console.log(filteredDoctors)

    setFilteredDoctors(filteredDoctors);
  } else {
    console.error('Selected date is undefined.');
  }
};


const handleDoctorFilter = () => {
  const filteredRows = doctors.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedSpeciality === '' || row.speciality === selectedSpeciality)
  );
  setFilteredDoctors(filteredRows);
};

const handleSpecialityFilter = () => {
  const filteredRows = doctors.filter((row) => {
    const nameMatch = row.name && row.name.toLowerCase().includes(searchQuery.toLowerCase());
    const specialityMatch =
      selectedSpeciality === '' || (row.speciality && row.speciality === selectedSpeciality);
    return nameMatch && specialityMatch;
  });
  setFilteredDoctors(filteredRows);
};

// ... (rest of your code)

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'speciality', headerName: 'Speciality', width: 200 },
    { field: 'hourly_rate', headerName: 'Session Price', width: 200 },
    {
      field: 'actions',
      headerName: '',
      width: 120,
      renderCell: (params) => (
        <Button variant="outlined" onClick={() => handleViewClick(params.row)}>
          VIEW
        </Button>
      )
      },
  
  ];

  const handleViewClick = (row) => {
    setSelectedDoctorData(row);
    setPopoverAnchor(row);
  };

  const handleClosePopover = () => {
    setSelectedDoctorData(null);
    setPopoverAnchor(null);
  };

  return (
    <Box bgcolor="#daf4ff">
      <AppBarComponent />
      <h1>Doctors</h1>

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
          label="Search by Name/Speciality"
          variant="outlined"
          value={filterValue}
          onChange={handleFilterChange}
        />
        <Button variant="contained" onClick={handleDoctorFilter}>
          Search
        </Button>
      </Box>

      <div>
        <label>Select a Date and Time:</label>
        <DatePicker
          selected={selectedDateTime}
          onChange={(date) => setSelectedDateTime(date)}
          showTimeSelect // Enable time selection
          timeFormat="HH:mm"
          timeIntervals={15} // Set time intervals as needed
          timeCaption="Time"
          dateFormat="yyyy-MM-dd h:mm aa" // Define your preferred date-time format
        />

        <button onClick={handleUpcomingAppointments}>Filter Appointments</button>
      </div>

      
      <DataGrid
        rows={filteredDoctors}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
      />

      <Popover
        open={Boolean(selectedDoctorData)}
        anchorEl={popoverAnchor}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {selectedDoctorData && (
          <Box p={2}>
            <Typography>Name: {selectedDoctorData.name}</Typography>
            <Typography>Educational Background: {selectedDoctorData.educational_bg}</Typography>
            <Typography>Email: {selectedDoctorData.email}</Typography>
            <Typography>Hourly Rate: {selectedDoctorData.hourly_rate}</Typography>
            <Typography>Affiliation: {selectedDoctorData.affiliation}</Typography>
            <Typography>Speciality: {selectedDoctorData.speciality}</Typography>

          </Box>
        )}
      </Popover>
    </Box>
  );
}

