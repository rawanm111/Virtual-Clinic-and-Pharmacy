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
  const [healthPackages, setHealthPackages] = useState([]);
  const [familyHealthPackages, setFamilyHealthPackages] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

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
    const fetchData = async () => {
      if (id) {
        // Fetch individual's health packages
        const individualPackages = await axios.get(`http://localhost:3000/PatientPackages/${id}`);
        const individualData = individualPackages.data.map((row, index) => ({ ...row, id: `individual-${index}` }));
        setHealthPackages(individualData);

        // Fetch health packages for each family member
        const familyDataPromises = familyMembers.map(async (familyMember, index) => {
          const familyMemberPackages = await axios.get(`http://localhost:3000/PatientPackages/${familyMember._id}`);
          return familyMemberPackages.data.map((row, innerIndex) => ({ ...row, id: `family-${index}-${innerIndex}`, familyMember: familyMember._id }));
        });

        const familyData = await Promise.all(familyDataPromises);
        setFamilyHealthPackages(familyData.flat());
      }
    };

    fetchData();
  }, [id, familyMembers]);

  const handleCancel = async (patientId, packageName, isFamilyMember, familyMemberId) => {
    try {
      packageName = packageName.replace(' ', '-');
      const cancelUrl = isFamilyMember
        ? `http://localhost:3000/PatientPackages/${familyMemberId}/cancel-package/${packageName}`
        : `http://localhost:3000/PatientPackages/${patientId}/cancel-package/${packageName}`;

      await axios.put(cancelUrl);
      console.log('Package status updated');

      // Refetch and update the tables
      const fetchData = async () => {
        // Fetch individual's health packages
        const individualPackages = await axios.get(`http://localhost:3000/PatientPackages/${id}`);
        const individualData = individualPackages.data.map((row, index) => ({ ...row, id: `individual-${index}` }));
        setHealthPackages(individualData);

        // Fetch health packages for each family member
        const familyDataPromises = familyMembers.map(async (familyMember, index) => {
          const familyMemberPackages = await axios.get(`http://localhost:3000/PatientPackages/${familyMember._id}`);
          return familyMemberPackages.data.map((row, innerIndex) => ({ ...row, id: `family-${index}-${innerIndex}`, familyMember: familyMember._id }));
        });

        const familyData = await Promise.all(familyDataPromises);
        setFamilyHealthPackages(familyData.flat());
      };

      fetchData();
    } catch (error) {
      console.error('Error updating package status:', error);
    }
  };

  const columns = [
    { field: 'package', headerName: 'Package Type', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'startdate', headerName: 'Start Date', flex: 1 },
    { field: 'enddate', headerName: 'End Date', flex: 1 },
    {
      field: 'button',
      headerName: '',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleCancel(id, params.row.package, false)}
        >
          Cancel
        </Button>
      ),
    },
  ];

  const familyColumns = [
    { field: 'package', headerName: 'Package Type', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'startdate', headerName: 'Start Date', flex: 1 },
    { field: 'enddate', headerName: 'End Date', flex: 1 },
    {
      field: 'button',
      headerName: '',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleCancel(params.row.familyMember, params.row.package, true, params.row.familyMember)}
        >
          Cancel
        </Button>
      ),
    },
  ];

  return (
    <div>
      <AppBarComponent />
      <PageContainer>
        <HeaderContainer>
          <Typography variant="h4" component="div" sx={{ color: '#000080' }}>
            Health Packages
          </Typography>
        </HeaderContainer>

        <Box sx={{ width: '100%' }}>
          <div style={{ backgroundColor: '#ADD8E6', marginBottom: '16px' }}>
            <div style={{ textAlign: 'center', color: '#00008B' }}>
              <h1>My Packages</h1>
            </div>
            <DataGrid
              rows={healthPackages}
              columns={columns}
              pageSize={5}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </div>
          <div style={{ backgroundColor: '#ADD8E6' }}>
            <div style={{ textAlign: 'center', color: '#00008B' }}>
              <h1>Family Members' Packages</h1>
            </div>
            <DataGrid
              rows={familyHealthPackages}
              columns={familyColumns}
              pageSize={5}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </div>
        </Box>
      </PageContainer>
    </div>
  );
}

export default HealthPackagesSub;
