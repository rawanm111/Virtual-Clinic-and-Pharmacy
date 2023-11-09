import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Popover, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AppBarComponent from '../Components/Appbar/AppbarPatientClinc';

export default function DoctorsTable() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectedDoctorData, setSelectedDoctorData] = useState(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [uniqueSpeciality, setUniqueSpeciality] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [availableDoctorsResult, setAvailableDoctorsResult] = useState([]);

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
            speciality: item.speciality,
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

      // axios
      // .get('http://localhost:3000/apps/available-appointments')
      // .then((response) => {
      //   if (response.data) {
      //     const transformedAppointments = response.data.map((appointment) => ({
      //       id: appointment.doctor.id,  
      //       availableAppointments: appointment.availableAppointments.map((app) => new Date(app.date).toISOString()),
      //     }));
      //     setAvailableDoctors(transformedAppointments);
      //   } else {
      //     console.error('No data received for available appointments from the API');
      //   }
      // })
      // .catch((error) => {
      //   console.error('Error fetching available appointments:', error);
      // });
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

  const handleDoctorFilter = () => {
    const filteredRows = doctors.filter((row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedSpeciality === '' || row.speciality === selectedSpeciality)
    );
    setFilteredDoctors(filteredRows);
  };

  // const handleCheckAvailability = () => {
  //   if (selectedDateTime) {
  //     const selectedDateISO = new Date(selectedDateTime).toISOString();
  //     const filteredResults = availableDoctors.filter((doctor) => {
  //       return doctor.availableAppointments.some((date) => date === selectedDateISO);
  //     });
  //     setAvailableDoctorsResult(filteredResults);
  //   }
  // };
  

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
      ),
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
    <Box>
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
          label="Search by Name"
          variant="outlined"
          value={filterValue}
          onChange={handleFilterChange}
        />
        <Button variant="contained" onClick={handleDoctorFilter}>
          Search
        </Button>
      </Box>

      {/* <Box
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
          value={selectedDateTime}
          onChange={(e) => setSelectedDateTime(e.target.value)}
        />
        <Button onClick={handleCheckAvailability}>Check Availability</Button>
      </Box> */}

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
