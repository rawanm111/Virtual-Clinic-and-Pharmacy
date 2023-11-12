import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AppbarPatientClinc from '../Components/Appbar/AppbarPatientClinc';
import { useParams } from 'react-router-dom';

console.log('Prescription component is rendering.');

function Prescription() {
  const { id } = useParams();
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [dateFilter, setDateFilter] = useState(null);
  const [doctorFilter, setDoctorFilter] = useState('All');
  const [filledFilter, setFilledFilter] = useState('All');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch prescription data for the specific user
    const fetchPrescriptionData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Prescription/${id}`);
        if (response.status === 200) {
          const responseData = response.data.map((row) => ({
            ...row,
            id: row._id,
            DoctorName: row.DocID ? row.DocID.fullName : 'Not Assigned Yet',
          }));
          console.log('Fetched data:', responseData);
          setPrescriptionData(responseData);
          setFilteredRows(responseData);
        } else {
          console.error('Unexpected status code:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchPrescriptionData function when the component mounts
    fetchPrescriptionData();
  }, [id]);

  useEffect(() => {
    // Fetch doctor data for dropdown
    axios.get('http://localhost:3000/doctors')
      .then((response) => {
        if (response.status === 200) {
          setDoctors(response.data);
          setLoading(false);
        } else {
          console.error('Unexpected status code:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, []); // Fetch doctors only once when the component mounts

  const columns = [
    { field: 'Date', headerName: 'Date', flex: 1 },
    { field: 'details', headerName: 'Details', flex: 1 },
    { field: 'DoctorName', headerName: 'Doctor Name', flex: 1 },
    {
      field: 'filled',
      headerName: 'Filled',
      flex: 1,
      renderCell: (params) => (
        <div>
          {params.value ? 'Filled' : 'Unfilled'}
        </div>
      ),
    },
  ];

  const handleFilterChange = () => {
    const filteredPrescriptions = prescriptionData.filter((prescription) => {
      const isDateMatch = !dateFilter || new Date(prescription.Date).toDateString() === new Date(dateFilter).toDateString();
      const isDoctorMatch = !doctorFilter || prescription.DoctorName.toLowerCase().includes(doctorFilter.toLowerCase());
      const isFilledMatch = !filledFilter || prescription.filled === (filledFilter === 'true');

      return isDateMatch && isDoctorMatch && isFilledMatch;
    });

    setFilteredRows(filteredPrescriptions);
  };

  return (
    <div>
      <AppbarPatientClinc />
      <div style={{ backgroundColor: '#ADD8E6', height: '100vh' }}>
        <div style={{ textAlign: 'center', color: '#00008B' }}>
          <h1>My Prescriptions</h1>
        </div>

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
            label=""
            value={dateFilter ? dateFilter : ''}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          <TextField
            select
            variant="outlined"
            label="Doctor"
            value={doctorFilter ? doctorFilter : ''}
            onChange={(e) => setDoctorFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {doctors.map((doctor) => (
              <MenuItem key={doctor._id} value={doctor.fullName}>
                {doctor.fullName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            variant="outlined"
            label="Filled"
            value={filledFilter ? filledFilter : ''}
            onChange={(e) => setFilledFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="true">Filled</MenuItem>
            <MenuItem value="false">Unfilled</MenuItem>
          </TextField>
          <Button variant="contained" onClick={handleFilterChange}>
            Filter
          </Button>
        </Box>

        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
}

export default Prescription;
