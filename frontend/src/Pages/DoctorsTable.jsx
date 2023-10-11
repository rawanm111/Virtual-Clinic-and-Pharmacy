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
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

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
            speciality:item.speciality
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
      .get('http://localhost:2005/apps/upcoming-appointments')
      .then((response) => {
        if (response.data) {
          setAppointments(response.data);
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

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  

  const handleUpcomingAppointments = () => {
    if (selectedDate) {
      const filteredAppointments = appointments.filter((appointment) =>
        appointment.date === selectedDate
      );
      setFilteredAppointments(filteredAppointments);
  
      // Extract the "did" values from the filtered appointments
      const didValues = filteredAppointments.map((appointment) => appointment.did);
  
      // Filter doctors based on the "did" values
      const filteredDoctors = doctors.filter((doctor) =>
        didValues.includes(doctor.id)
      );
  
      setFilteredDoctors(filteredDoctors);
  
      console.log(filteredAppointments);
    } else {
      // Handle the case when selectedDate is undefined
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
  
  const columns = [
    { field: 'username', headerName: 'Name', width: 200 },
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

  const handleSpecialityFilter = () => {
    const filteredRows = doctors.filter((row) => {
      const nameMatch = row.name && row.name.toLowerCase().includes(searchQuery.toLowerCase());
      const specialityMatch =
        selectedSpeciality === '' || (row.speciality && row.speciality === selectedSpeciality);
      return nameMatch && specialityMatch;
    });
    setFilteredDoctors(filteredRows);
  };
  

  return (
    <Box  bgcolor="#daf4ff">
      <AppBarComponent/>
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
        <Button variant="contained">Search</Button>
      </Box>
      <div>
<label>Select a Date:</label>
<select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
  <option value="">Select a Date</option>
  {[...new Set(appointments.map((appointment) => appointment.date))].map((date) => (
    <option key={date} value={date}>
      {date}
    </option>
  ))}
</select>

<button onClick={handleUpcomingAppointments}>Filter Appointments</button>

      </div><div>
        <label>Select a Speciality:</label>
        <select
          value={selectedSpeciality}
          onChange={(e) => setSelectedSpeciality(e.target.value)}
        >
          <option key="all" value="">
            Filter using Specialities
          </option>
          <option value="al">All Specialities</option>
          {uniqueSpeciality.map((speciality, index) => (
            <option key={`${speciality}-${index}`} value={speciality}>
              {speciality}
            </option>
          ))}
        </select>

        <button onClick={handleSpecialityFilter}>Filter specialities</button>
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