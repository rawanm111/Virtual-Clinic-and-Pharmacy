import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import axios from 'axios';
import AppbarDoctor from './Components/Appbar/AppbarDoctor';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';


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
}
 export default function DoctorProfile() {
  const [DoctorProfile, setDoctorProfile] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:2002/doctors') // Adjust the URL as needed
      .then((response) => {
        setDoctorProfile(response.data);
      })
      .catch((error) => {
        console.error('Error fetching DoctorProfiles:', error);
      });
  }, []);
  const handleUpdatePackage = (username) => {
    Navigate(`/update-doctor/${username}`);
  };
  return (
    <div>     
      <AppbarDoctor />
      <PageContainer>
        <HeaderContainer>
          <Typography variant="h4" component="div" sx={{ color: '#000080' }}>
            DoctorProfile
          </Typography>
        </HeaderContainer>
        <CardsContainer>
          {DoctorProfile.map((DoctorProfile) => (
            <CardWrapper key={DoctorProfile.username} variant="outlined">
              <CardContent>
                <NameTypography variant="h5" component="div">
                 Username: {DoctorProfile.username}
                </NameTypography>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                    Name:{DoctorProfile.name}
                  </DataTypography>
                  <DataTypography variant="body2">
                  Email: {DoctorProfile.email}
                  </DataTypography>
                  <DataTypography variant="body2">
                  password:  {DoctorProfile.password}
                  </DataTypography>
                  <DataTypography variant="body2">
                  hourlyRate : {DoctorProfile.hourly_rate}
                  </DataTypography>
                  <DataTypography variant="body2">
                  educational_bg: {DoctorProfile.educational_bg}
                  </DataTypography>
                  <Button onClick={() => handleUpdatePackage(DoctorProfile.username)}>
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

