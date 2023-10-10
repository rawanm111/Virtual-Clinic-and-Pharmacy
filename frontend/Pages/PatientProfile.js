import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import axios from 'axios';
import AppbarDoctor from './Components/Appbar/AppbarDoctor';
import { Navigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';



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
  justifyContent: 'space-between',
  flexWrap: 'wrap', // Add this to wrap cards to the next row
});

const CardWrapper = styled(Card)({
  marginBottom: '16px',
  border: '1px solid #0070F3',
  backgroundColor: '#f0f8ff',
  flex: '0 0 calc(33.33% - 16px)',
  marginRight: '16px',
  boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.8)',
  borderRadius: '5px',
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
  display: 'inline-block',
  marginLeft: '0.5rem',
});

const UpdatePackage = (id) => {
  Navigate(`/UpdatePackage/${id}`);
};
export default function PatientProfile() {
  const [PatientProfile, setPatientProfile] = useState([]);
  const Navigate = useNavigate();
  
  useEffect(() => {

    axios
      .get('http://localhost:2002/patients') // Adjust the URL as needed
      .then((response) => {
        setPatientProfile(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching DoctorProfiles:', error);
      });
       }, []);
       const handleUpdatePackage = (username) => {
        Navigate(`/update-patient/${username}`);
      };
      
  return (
    <div>     
      <AppbarDoctor />
      <PageContainer>
        <HeaderContainer>
          <Typography variant="h4" component="div" sx={{ color: '#000080' }}>
            PatientProfile
          </Typography>
        </HeaderContainer>
        <CardsContainer>
          {PatientProfile.map((PatientProfile) => (
            <CardWrapper key={PatientProfile._id} variant="outlined">
              <CardContent>
                <NameTypography variant="h5" component="div">
                 username: {PatientProfile.username}
                </NameTypography>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                  password:{PatientProfile.password}
                  </DataTypography>
                  <DataTypography variant="body2">
                  Email: {PatientProfile.email}
                  </DataTypography>
                 
                  <DataTypography variant="body2">
                  fullName: {PatientProfile.fullName}
                  </DataTypography>

                  <DataTypography variant="body2">
                  Dof: {PatientProfile.dateOfBirth}
                  </DataTypography>

                  <DataTypography variant="body2">
                  gender: {PatientProfile.gender}
                  </DataTypography>

                  <DataTypography variant="body2">
                  mobileNumber: {PatientProfile.mobileNumber}
                  </DataTypography>

                  <DataTypography variant="body2">
                  emergencyContactFullName: {PatientProfile.emergencyContactFullName}
                  </DataTypography>

                  <DataTypography variant="body2">
                  emergencyContactMobileNumber: {PatientProfile.emergencyContactMobileNumber}
                  </DataTypography>

                  <DataTypography variant="body2">
                  emergencyContactRelationToPatient: {PatientProfile.emergencyContactRelationToPatient}
                  </DataTypography>
                  <Button onClick={() => handleUpdatePackage(PatientProfile.username)}>
                   Update
                  </Button>
                </div>
              </CardContent>
            </CardWrapper>
          ))}
        </CardsContainer>
      </PageContainer>
    </div>
  );
}


