import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Popover, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AppBarComponent from '../Components/Appbar/AppbarDoctor';

export default function PatientsTable() {
  const [patients, setPatients] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/patients')
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id,
            name: item.username,
            password: item.password,
            fullName: item.fullName,
            email: item.email,
            dateOfBirth: item.dateOfBirth,
            gender: item.gender,
            mobileNumber: item.mobileNumber,
          }));
          setPatients(transformedData);
          setFilteredRows(transformedData);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilterValue(value);

    if (Array.isArray(patients)) {
      const filteredPatients = patients.filter((patient) => {
        return patient && patient.name && patient.name.toLowerCase().includes(value);
      });

      setFilteredRows(filteredPatients);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'password', headerName: 'Password', width: 200 },
    { field: 'fullName', headerName: 'Full Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'dateOfBirth', headerName: 'Date of Birth', width: 200 },
    { field: 'gender', headerName: 'Gender', width: 200 },
    { field: 'mobileNumber', headerName: 'Mobile Number', width: 200 },
    {
      field: 'action',
      headerName: '',
      width: 120,
      renderCell: (params) => (
        <div>
          <Button variant="outlined" onClick={() => handleViewClick(params.row)}>
            VIEW
          </Button>
        </div>
      ),
      },
    
  ];

  const handleViewClick = (row) => {
    setSelectedPatientData(row);
    setPopoverAnchor(row);
  };

  return (
    <Box bgcolor="#daf4ff">
      <AppBarComponent />
      <h1>Patients</h1>
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
        <Button variant="contained">Search</Button>
      </Box>

      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
      />

      <Popover
        open={Boolean(selectedPatientData)}
        anchorEl={popoverAnchor}
        onClose={() => {
          setSelectedPatientData(null);
          setPopoverAnchor(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {selectedPatientData && (
          <Box p={2}>
            <Typography>Name: {selectedPatientData.name}</Typography>
            <Typography>Password: {selectedPatientData.password}</Typography>
            <Typography>Full Name: {selectedPatientData.fullName}</Typography>
            <Typography>Email: {selectedPatientData.email}</Typography>
            <Typography>Date of Birth: {selectedPatientData.dateOfBirth}</Typography>
            <Typography>Gender: {selectedPatientData.gender}</Typography>
            <Typography>Mobile Number: {selectedPatientData.mobileNumber}</Typography>
          </Box>
        )}
      </Popover>
    </Box>
  );
}
