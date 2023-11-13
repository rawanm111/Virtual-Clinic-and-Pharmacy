import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Popover, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AppBarComponent from '../Components/Appbar/AppbarPatientClinc';
import { useParams } from 'react-router-dom';

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
  const [patientHealthPackage, setPatientHealthPackage] = useState(null);
  const { id } = useParams();
  const patientId = id;

  useEffect(() => {
    // Fetch doctors data
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

    // Fetch patient health package
    axios
      .get(`http://localhost:3000/PatientPackages/${patientId}`)
      .then((response) => {
        setPatientHealthPackage(response.data);
      })
      .catch((error) => {
        console.error('Error fetching patient health package:', error);
      });
  }, [patientId]);

  const popOverStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
  };

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
    const filteredRows = doctors.filter(
      (row) =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedSpeciality === '' || row.speciality === selectedSpeciality)
    );
    setFilteredDoctors(filteredRows);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'speciality', headerName: 'Speciality', width: 200 },
    { field: 'hourly_rate', headerName: 'Session Price (LE)', width: 200 },
    {
      field: 'sessionPriceAfterHealthPackage',
      headerName: 'Discounted Session Price (LE) ',
      width: 250,
      renderCell: (params) => {
        const sessionPrice = params.row.hourly_rate;
        const discount = patientHealthPackage?.package.discountOnDoctorSessionPrice || 0;
        const sessionPriceAfterDiscount = sessionPrice - discount;
        return <Typography>{sessionPriceAfterDiscount.toFixed(2)}</Typography>;
      },
    },
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
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        {selectedDoctorData && (
          <Box p={2} style={popOverStyle}>
            <Typography variant="h6">Doctor Details</Typography>
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
