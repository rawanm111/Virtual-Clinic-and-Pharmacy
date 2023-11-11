import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import axios from 'axios';
import AppBarComponent from '../Components/Appbar/AppbarPatientClinc';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const PageContainer = styled('div')({
  backgroundColor: 'lightblue',
  minHeight: '100vh',
  padding: '16px',
});

const HeaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
});

const CardsContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
});

const CardWrapper = styled(Card)(({ theme }) => ({
  marginBottom: '16px',
  border: '1px solid #0070F3',
  backgroundColor: '#f0f8ff',
  marginRight: '16px',
  boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.9)',
  borderRadius: '5px',
  marginLeft: '5px',
}));

const NameTypography = styled(Typography)({
  color: '#000080',
  marginBottom: '1rem',
  fontWeight: 'bold',
});

const SubtitleTypography = styled(Typography)({
  color: '#0050C0',
  fontWeight: 'bold',
  marginBottom: '10px',
});

const DataTypography = styled(Typography)({
  color: '#000080',
  marginBottom: '0.5rem',
  marginLeft: '0.5rem',
});

function HealthPackagesSub() {

  console.log('Health Package component is rendering.');
  
  const [healthPackages, setHealthPackages] = useState([]);
  const [allHealthPackages, setAllHealthPackages] = useState([]);
  const [selectedHealthPackage, setSelectedHealthPackage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    if (id) {  // Only attempt to fetch individual package data if 'id' is available
      const fetchPackageData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/PatientPackages/${id}`);
          if (response.status === 200) {
            // Again, ensure each package data object has a unique 'id' field
            const responseData = response.data.map((row) => ({
              ...row,
              id: row._id,
            }));
            console.log('Fetched data:', responseData);
            setHealthPackages(responseData);
          } else {
            console.error('Unexpected status code:', response.status);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchPackageData();
    }

    const handleCancel = async () => {
    const hardcodedId = "6544106d3311e5f2fd5d6320"; // Your hardcoded ID
    try {
      const response = await axios.put(`http://localhost:3000/PatientPackages/${id}`,{
        
      });
      console.log('Package status updated:', response.data);
      // Update local state or refresh data grid as needed
    } catch (error) {
      console.error('Error updating package status:', error);
    }
  };



  }, [id]); 

  

  const handleCancel = async () => {
   
    try {
      const response = await axios.put(`http://localhost:3000/PatientPackages/${id}`,{
        
      });
      console.log('Package status updated:', response.data);
      // Update local state or refresh data grid as needed
    } catch (error) {
      console.error('Error updating package status:', error);
    }
  };

 




  
  
  const columns = [
    { field: 'package', headerName: 'Package Type', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'startdate',
      headerName: 'Start Date',
      flex: 1,
      
    },
    {
      field: 'enddate',
      headerName: 'End Date',
      flex: 1,
     
    },
    {
      field: 'button',
      headerName: '',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleCancel} // Call handleCancel directly without parameters
          
        >
          Cancel
        </Button>)
      },
  ];
  

  return (
    <div>
      <AppBarComponent />
      


      <div>
      
    
    <div  style={{ backgroundColor: '#ADD8E6', height: '100vh', }}>
      <div style={{ textAlign: 'center', color: '#00008B' }}>
  <h1>My Packages</h1>
</div>


      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={healthPackages}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      </div>
    </div>




    </div>
  );
}

export default HealthPackagesSub;
