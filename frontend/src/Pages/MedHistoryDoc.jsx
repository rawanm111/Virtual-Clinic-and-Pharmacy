import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AppBarComponent from '../Components/Appbar/AppbarDoctor';

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

  const [histories, setHistories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [fileData, setFileData] = useState('');
  const [currentHistoryId, setCurrentHistoryId] = useState(null);

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const base64toBlob = (base64Data, contentType) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  const handleDownloadFile = (documentName, contentType, data) => {
    const blobData = base64toBlob(data, contentType);
    const blobUrl = URL.createObjectURL(blobData);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = documentName;
    a.click();
  };

  const fetchMedicalHistories = () => {
    console.log('Fetching doctor appointments...');
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

        // Fetch medical histories for the unique patient IDs
        const requests = Array.from(uniquePatientIds).map((patientId) =>
          axios.get(`http://localhost:3000/medHistory/patient/${patientId}`)
        );

        axios.all(requests)
          .then(axios.spread((...responses) => {
            const allHistories = responses.reduce((acc, response, index) => {
              const history = response.data[0];
              const currentPatientId = Array.from(uniquePatientIds)[index];
              const patientName = validAppointments.find(appointment => appointment.patient._id === currentPatientId).patient.fullName;
              if (history) {
                acc.push({ ...history, patientName });
              }
              return acc;
            }, []);

            setHistories(allHistories);
          }))
          .catch((error) => {
            console.error('Error fetching medical histories:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching doctor appointments:', error);
      });
  };

  const handleAddNotes = async (historyId, notes) => {
    try {
      const response = await axios.post(`http://localhost:3000/medHistory/doctorNotes/${historyId}`, { doctorNotes: notes });
      const updatedHistories = histories.map(history =>
        history._id === historyId ? { ...history, doctorNotes: response.data.doctorNotes } : history
      );
      setHistories(updatedHistories);
    } catch (error) {
      console.error('Error adding notes:', error);
    }
  };

  useEffect(() => {
    fetchMedicalHistories();
  }, [id]);

  return (
    <div>
      <AppBarComponent />
      <PageContainer>
        <HeaderContainer>
          <Typography variant="h4" component="div" sx={{ color: '#000080' }}>
            My Patients' Medical Histories
          </Typography>
        </HeaderContainer>
        {histories.map((history) => (
          <CardWrapper key={history._id}>
            <CardContent>
              <NameTypography variant="h6" sx={{ color: '#000080' }}>
                Patient: {history.patientName || 'Unknown Patient'}
              </NameTypography>
              <div>
                {history.doctorNotes && (
                  <NotesTypography variant="body2" sx={{ color: '#00008B' }}>
                    Doctor Notes: {history.doctorNotes}
                  </NotesTypography>
                )}
                {history.documents && history.documents.map((document) => (
                  <Card key={document._id} style={{ marginBottom: '16px', border: '1px solid #0070F3', backgroundColor: '#f0f8ff', marginRight: '16px', boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.9)', borderRadius: '5px', marginLeft: '5px' }}>
                    <CardContent>
                      <NameTypography variant="h6" sx={{ color: '#000080' }}>
                        {document.filename}
                      </NameTypography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleDownloadFile(document.filename, document.contentType, document.data);
                        }}
                      >
                        Download Document
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setCurrentHistoryId(history._id);
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
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div style={modalStyle}>
          <h2 id="modal-modal-title">Add Doctor Notes</h2>
          <textarea
            rows="4"
            cols="50"
            placeholder="Enter doctor notes..."
            onChange={(e) => setFileData(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleAddNotes(currentHistoryId, fileData);
              setOpenModal(false);
            }}
          >
            Save Notes
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default MedHistory;
