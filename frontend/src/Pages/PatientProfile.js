import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

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
  flexWrap: 'wrap',
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

export default function PatientProfile() {
  const [PatientProfile, setPatientProfile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/patients')
      .then((response) => {
        setPatientProfile(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Profiles:', error);
      });
  }, []);

  const handleUpdatePackage = (username) => {
    navigate(`/update-patient/${username}`);
  };

  return (
    <div>
      <PageContainer>
        <HeaderContainer>
          <Typography variant="h4" component="div" sx={{ color: '#000080' }}>
            My Profile
          </Typography>
        </HeaderContainer>
        <CardsContainer>
          {PatientProfile.map((PatientProfile) => (
            <CardWrapper key={PatientProfile._id} variant="outlined">
              <CardContent>
                <NameTypography variant="h5" component="div">
                  {PatientProfile.username}
                </NameTypography>
                <div>
                  <DataTypography variant="body2">
                    Password: {PatientProfile.password}
                  </DataTypography>
                </div>
                <div>
                  <DataTypography variant="body2">
                    Email: {PatientProfile.email}
                  </DataTypography>
                </div>
                <div>
                  <DataTypography variant="body2">
                    Full Name: {PatientProfile.fullName}
                  </DataTypography>
                </div>
                <div>
                  <DataTypography variant="body2">
                    Date of Birth: {PatientProfile.dateOfBirth}
                  </DataTypography>
                </div>
                <div>
                  <DataTypography variant="body2">
                    Gender: {PatientProfile.gender}
                  </DataTypography>
                </div>
                <div>
                  <DataTypography variant="body2">
                    Mobile Number: {PatientProfile.mobileNumber}
                  </DataTypography>
                </div>
                <div>
                  <DataTypography variant="body2">
                    Emergency Contact Full Name: {PatientProfile.emergencyContactFullName}
                  </DataTypography>
                </div>
                <div>
                  <DataTypography variant="body2">
                    Emergency Contact Mobile Number: {PatientProfile.emergencyContactMobileNumber}
                  </DataTypography>
                </div>
                <div>
                  <DataTypography variant="body2">
                    Emergency Contact Relation to Patient: {PatientProfile.emergencyContactRelationToPatient}
                  </DataTypography>
                </div>
                <div>
                  <Button onClick={() => handleUpdatePackage(PatientProfile.username)}>Update</Button>
                </div>
              </CardContent>
            </CardWrapper>
          ))}
        </CardsContainer>
      </PageContainer>
    </div>
  );
}
