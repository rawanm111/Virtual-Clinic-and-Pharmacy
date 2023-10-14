
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppbarPatientClinc from "../Components/Appbar/AppbarPatientClinc";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

console.log('Prescription component is rendering.');

function Prescription() {
  const [prescriptionData, setPrescriptionData] = useState([]);

  useEffect(() => {
    // Define a function to fetch prescription data
    const fetchPrescriptionData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Prescription');
        if (response.status === 200) {
          const responseData = response.data.map((row) => ({
            ...row,
            id: row._id, 
          }));
          console.log('Fetched data:', responseData);
          setPrescriptionData(responseData);
        } else {
          console.error('Unexpected status code:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchPrescriptionData function when the component mounts
    fetchPrescriptionData();
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  const columns = [
    { field: 'Date', headerName: 'Date', flex: 1 },
    { field: 'details', headerName: 'Details', flex: 1 },
    { field: 'DocID', headerName: 'Doctor ID', flex: 1, type: 'number' },
    { field: 'filled', headerName: 'Filled', flex: 1 },
  ];

  return (
    <div>
      
      <AppbarPatientClinc />
    <div  style={{ backgroundColor: '#ADD8E6', height: '100vh', }}>
      <div style={{ textAlign: 'center', color: '#00008B' }}>
  <h1>My Prescriptions</h1>
</div>



      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={prescriptionData}
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
