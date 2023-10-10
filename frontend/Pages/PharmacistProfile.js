import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import axios from 'axios';
import AppbarPharmacist from './Components/Appbar/AppbarPharmacist';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';

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

export default function PharmacistProfile() {
  const [PharmacistProfile, setPharmacistProfile] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:2002/pharmacists') // Adjust the URL as needed
      .then((response) => {
        setPharmacistProfile(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching PharmacistProfiles:', error);
      });
  }, []);

  const handleUpdatePackage = (username) => {
    Navigate(`/update-pharmacist/${username}`);
  };

  return (
    <div>
      <AppbarPharmacist />
      <PageContainer>
        <HeaderContainer>
          <Typography variant="h4" component="div" sx={{ color: '#000080' }}>
            PharmacistProfile
          </Typography>
        </HeaderContainer>
        <CardsContainer>
          {PharmacistProfile.map((PharmacistProfile) => (
            <CardWrapper key={PharmacistProfile.username} variant="outlined">
              <CardContent>
                <NameTypography variant="h5" component="div">
                  username: {PharmacistProfile.username}
                </NameTypography>
                <div>
                  <SubtitleTypography variant="subtitle1"></SubtitleTypography>
                  <DataTypography variant="body2">
                    password: {PharmacistProfile.password}
                  </DataTypography>
                  <DataTypography variant="body2">
                    educationalBackground: {PharmacistProfile.educationalBackground}
                  </DataTypography>
                  <DataTypography variant="body2">
                    password: {PharmacistProfile.password}
                  </DataTypography>
                  <DataTypography variant="body2">
                    fullname: {PharmacistProfile.fullname}
                  </DataTypography>
                  <DataTypography variant="body2">
                    email: {PharmacistProfile.email}
                  </DataTypography>
                  <DataTypography variant="body2">
                    dateOfBirth: {PharmacistProfile.dateOfBirth}
                  </DataTypography>
                  <DataTypography variant="body2">
                    hourlyRate: {PharmacistProfile.hourlyRate}
                  </DataTypography>
                  <DataTypography variant="body2">
                    affiliation: {PharmacistProfile.affiliation}
                  </DataTypography>
                  <Button onClick={() => handleUpdatePackage(PharmacistProfile.username)}>
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
