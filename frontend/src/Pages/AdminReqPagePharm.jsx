import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import axios from 'axios';
import AppbarAdmin from '../Components/Appbar/AppbarAdmin';
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
  flexWrap: 'wrap', // Adjusted to wrap cards to the next row
  gap: '16px', // Add this to control spacing between cards
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

function AdminRequests() {
  const [adminRequests, setAdminRequests] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/pharmcistReq')
      .then((response) => {
        setAdminRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Admin Requests:', error);
      });
  }, []);

  return (
    <div>
      <AppbarAdmin />
      <PageContainer>
        <HeaderContainer>
          <Typography variant="h4" component="div" sx={{ color: '#000080' }}>
          Pharmcist Requests
          </Typography>
        </HeaderContainer>
        <CardsContainer>
          {adminRequests.map((adminRequest) => (
            <CardWrapper key={adminRequest._id} variant="outlined">
              <CardContent>
                <NameTypography variant="h5" component="div">
                  {adminRequest.name}
                </NameTypography>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    Username:
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                    {adminRequest.username}
                  </DataTypography>
                </div>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    E-mail:
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                    {adminRequest.email}
                  </DataTypography>
                </div>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    Password:
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                    {adminRequest.password}
                  </DataTypography>
                </div>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    Birthdate:
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                    {adminRequest.birthdate}
                  </DataTypography>
                </div>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    Hourly Rate:
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                    {adminRequest.hourlyRate}
                  </DataTypography>
                </div>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    Hospital Name:
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                    {adminRequest.hospital}
                  </DataTypography>
                </div>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    Educational Background:
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                    {adminRequest.educationalBackground}
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

export default AdminRequests;