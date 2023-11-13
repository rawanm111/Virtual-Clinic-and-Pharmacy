import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import axios from 'axios';
import AppbarAdmin from '../Components/Appbar/AppbarAdmin';
import { useParams, useNavigate } from 'react-router-dom';

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

function EmploymentContracts() {
  const [employmentContract, setEmploymentContract] = useState({});
  const { userId } = useParams();
  const doctorId = userId;
  const navigate = useNavigate();

  const fetchEmploymentContract = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/employmentContract/details/${doctorId}`);
      setEmploymentContract(response.data);
    } catch (error) {
      console.error('Error fetching employment contract:', error);
    }
  };

  const handleAcceptContract = async () => {
    try {
      await axios.put(`http://localhost:3000/employmentContract/updateStatus/${doctorId}`);
      navigate('/clinic');
    } catch (error) {
      console.error('Error accepting employment contract:', error);
    }
  };

  const handleRejectContract = () => {
    navigate('/clinic');
  };

  useEffect(() => {
    fetchEmploymentContract();
  }, [doctorId]);

  return (
    <div>
      <PageContainer>
        <HeaderContainer>
          <Typography variant="h4" component="div" sx={{ color: '#000080' }}>
            Employment Contract
          </Typography>
        </HeaderContainer>
        <CardsContainer>
          <CardWrapper>
            <CardContent>
              <NameTypography variant="h6" sx={{ color: '#000080' }}>
                {employmentContract.employeeName || 'Unknown Doctor'}
              </NameTypography>
              <SubtitleTypography variant="subtitle1" sx={{ color: '#0050C0' }}>
                Job Title:
              </SubtitleTypography>
              <DataTypography variant="body1" sx={{ color: '#000080' }}>
                {employmentContract.jobTitle || 'N/A'}
              </DataTypography>
              <SubtitleTypography variant="subtitle1" sx={{ color: '#0050C0' }}>
                Start Date:
              </SubtitleTypography>
              <DataTypography variant="body1" sx={{ color: '#000080' }}>
                {employmentContract.startDate || 'N/A'}
              </DataTypography>
              <SubtitleTypography variant="subtitle1" sx={{ color: '#0050C0' }}>
                End Date:
              </SubtitleTypography>
              <DataTypography variant="body1" sx={{ color: '#000080' }}>
                {employmentContract.endDate || 'N/A'}
              </DataTypography>
              <SubtitleTypography variant="subtitle1" sx={{ color: '#0050C0' }}>
                Salary:
              </SubtitleTypography>
              <DataTypography variant="body1" sx={{ color: '#000080' }}>
                {employmentContract.salary || 'N/A'}
              </DataTypography>
              <SubtitleTypography variant="subtitle1" sx={{ color: '#0050C0' }}>
                Employment Contract Status:
              </SubtitleTypography>
              <DataTypography variant="body1" sx={{ color: '#000080' }}>
                {employmentContract.status || 'N/A'}
              </DataTypography>
              <Button variant="contained" color="primary" onClick={handleAcceptContract}>
                Accept Employment Contract
              </Button>
              <Button variant="contained" color="secondary" onClick={handleRejectContract}>
                Reject Employment Contract
              </Button>
            </CardContent>
          </CardWrapper>
        </CardsContainer>
      </PageContainer>
    </div>
  );
}

export default EmploymentContracts;
