import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import axios from 'axios';
import AppbarDoctor from '../Components/Appbar/AppbarDoctor';
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

function HealthRecords() {
  const [healthRecords, setHealthRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/HealthRecords') // Adjust the URL as needed
      .then((response) => {
        setHealthRecords(response.data);
      })
      .catch((error) => {
        console.error('Error fetching health records:', error);
      });
  }, []);

  return (
    <div>     
      <AppbarDoctor />
      <PageContainer>
        <HeaderContainer>
          <Typography variant="h4" component="div" sx={{ color: '#000080' }}>
            Health Records
          </Typography>
        </HeaderContainer>
        <CardsContainer>
          {healthRecords.map((healthRecord) => (
            <CardWrapper key={healthRecord._id} variant="outlined">
              <CardContent>
                <NameTypography variant="h5" component="div">
                  {healthRecord.patientname}
                </NameTypography>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    Diagnosis:
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                    {healthRecord.diagnosis}
                  </DataTypography>
                </div>
              </CardContent>
            </CardWrapper>
          ))}
        </CardsContainer>
      </PageContainer>
    </div>
  );
}

export default HealthRecords;