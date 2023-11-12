import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import axios from 'axios';
import AppbarDoctor from '../Components/Appbar/AppbarDoctor';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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

const ActionButton = styled(Button)({
  marginRight: '8px',
});

function MedicalHistorys() {
  const [medicalHistory, setMedicalHistory] = useState([]);
  const navigate = useNavigate();
     
  useEffect(() => {
    axios
      .get('http://localhost:3000/MedicalHistory') // Adjust the URL as needed
      .then((response) => {
        setMedicalHistory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching health records:', error);
      });
  }, []);
  const fetchMedicalHistory = () => {
    axios
      .get('http://localhost:3000/MedicalHistorys') // Adjust the URL as needed
      .then((response) => {
        setMedicalHistory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching health records:', error);
      });
  };


  const handleAddMedicalHistory = () => {
    // Implement the logic to add a new medical history entry
    // You might redirect to a form or modal for adding data
    navigate('/NewMedicalHistory');
  };

  const handleRemoveMedicalHistory = (patientId) => {
    // Implement the logic to remove a medical history entry
    axios
      .delete(`http://localhost:3000/MedicalHistorys/${patientId}`)
      .then(() => {
        // Update the state after successful deletion
        fetchMedicalHistory();
      })
      .catch((error) => {
        console.error('Error deleting health record:', error);
      });
  };

  return (
    <div>
      <AppbarDoctor />
      <PageContainer>
        <HeaderContainer>
          <Typography variant="h4" component="div" sx={{ color: '#000080' }}>
            Medical History
          </Typography>
          <div>
            <ActionButton variant="contained" onClick={handleAddMedicalHistory}>
              Add Medical History
            </ActionButton>
          </div>
        </HeaderContainer>
        <CardsContainer>
          {medicalHistory.map((entry) => (
            <CardWrapper key={entry._id} variant="outlined">
              <CardContent>
                <NameTypography variant="h5" component="div">
                  {entry.patientname}
                </NameTypography>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    Diagnosis:
                    </SubtitleTypography>
                  <DataTypography variant="body2">
                    {entry.diagnosis}
                  </DataTypography>
                </div>
                <div>
                  <ActionButton
                    variant="contained"
                    onClick={() => handleRemoveMedicalHistory(entry._id)}
                  >
                    Remove
                  </ActionButton>
                </div>
              </CardContent>
            </CardWrapper>
          ))}
        </CardsContainer>
      </PageContainer>
    </div>
  );
}

export default MedicalHistorys;
