import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import WalletModal from './walletModal';

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

const NotesTypography = styled(Typography)({
  color: '#00008B', // Dark blue color
  marginBottom: '1rem',
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  padding: '16px',
  overflow: 'auto',
};

function MedHistory() {
  const { id } = useParams(); // This is the doctor's ID, not the patient's ID

  const [prescriptions, setPrescriptions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [fileData, setFileData] = useState('');
  const [currentPrescriptionId, setCurrentPrescriptionId] = useState(null);

  const fetchPrescriptionsForPatients = () => {
    console.log('Fetching doctor appointments and prescriptions...');
    axios
      .get(`http://localhost:3000/apps/doctor/${id}`)
      .then((response) => {
        console.log('Doctor appointments response:', response.data);

        if (!Array.isArray(response.data)) {
          console.error('Invalid response format. Expected an array.');
          return;
        }

        const doctorAppointments = response.data;

        // Ensure that patient property is present and not undefined
        const validAppointments = doctorAppointments.filter(appointment => appointment.patient && appointment.patient._id);

        // Use a Set to track unique patient IDs
        const uniquePatientIds = new Set(validAppointments.map(appointment => appointment.patient._id));

        // Fetch prescriptions for the unique patient IDs
        const requests = Array.from(uniquePatientIds).map((patientId) =>
          axios.get(`http://localhost:3000/Prescription/${patientId}`)
        );

        axios.all(requests)
          .then(axios.spread((...responses) => {
            const allPrescriptions = responses.reduce((acc, response, index) => {
              const prescription = response.data;
              const currentPatientId = Array.from(uniquePatientIds)[index];
              const patientName = validAppointments.find(appointment => appointment.patient._id === currentPatientId).patient.fullName;
              if (prescription.length > 0) {
                acc.push({ ...prescription[0], patientName }); // Assuming only one prescription per patient for simplicity
              }
              return acc;
            }, []);

            setPrescriptions(allPrescriptions);
          }))
          .catch((error) => {
            console.error('Error fetching prescriptions:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching doctor appointments:', error);
      });
  };


  useEffect(() => {
    fetchPrescriptionsForPatients();
  }, [id]);

  const handleAddPresClick = () => {
    //navigate('/newPres');
  };

  return (
    <div>

      <PageContainer>
        <HeaderContainer>
          <Typography variant="h4" component="div" sx={{ color: '#000080' }}>
            My Patients' Prescriptions
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddPresClick}>
            Add New Prescription
          </Button>
        </HeaderContainer>
        {prescriptions.map((prescription) => (
          <CardWrapper key={prescription._id}>
            <CardContent>
              <NameTypography variant="h6" sx={{ color: '#000080' }}>
                Patient: {prescription.patientName || 'Unknown Patient'}
              </NameTypography>
              <div>
                {prescription.doctorNotes && (
                  <NotesTypography variant="body2" sx={{ color: '#00008B' }}>
                    Doctor Notes: {prescription.doctorNotes}
                  </NotesTypography>
                )}
                {prescription.medicines && prescription.medicines.map((medicine) => (
                  <div key={medicine._id}>
                    <Typography variant="body2" sx={{ color: '#00008B' }}>
                      Medicine: {medicine.name}
                    </Typography>
                    {/* Add more medicine details as needed */}
                  </div>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setCurrentPrescriptionId(prescription._id);
                    setOpenModal(true);
                  }}
                >
                  Add Notes
                </Button>
              </div>
            </CardContent>
          </CardWrapper>
        ))}
      </PageContainer>
    </div>
  );
}

export default MedHistory;
