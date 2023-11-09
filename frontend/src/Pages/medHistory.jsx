import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AppBarComponent from '../Components/Appbar/AppbarPatientClinc';

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
  const { id } = useParams();

  const [histories, setHistories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [fileData, setFileData] = useState('');

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadFile = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      axios.post(`http://localhost:3000/med-history/upload/${id}`, formData)
        .then((response) => {
          console.log('File uploaded successfully');
          fetchMedicalHistories(); // Trigger refetch after upload
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    } else {
      console.error('No file selected');
    }
  };

  const handleDownloadFile = (documentName, contentType, data) => {
    const blobData = base64toBlob(data, contentType);
    const blobUrl = URL.createObjectURL(blobData);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = documentName;
    a.click();
  };

  const handleDeleteFile = (documentId) => {
    axios.delete(`http://localhost:3000/med-history/delete/${id}/${documentId}`)
      .then((response) => {
        console.log('File deleted successfully');
        fetchMedicalHistories();
      })
      .catch((error) => {
        console.error('Error deleting file:', error);
      });
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

  const fetchMedicalHistories = () => {
    axios.get(`http://localhost:3000/med-history/patient/${id}`)
      .then((response) => {
        setHistories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching medical histories:', error);
      });
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
            My Medical History
          </Typography>
        </HeaderContainer>
        {histories.map((history) => (
          <CardWrapper key={history._id}>
            <CardContent>
              <NameTypography variant="h6" sx={{ color: '#000080' }}>
                {history.description}
              </NameTypography>
              <div>
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
                      <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                handleDeleteFile(document._id);
              }}
            >
              Delete Document
            </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </CardWrapper>
        ))}
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileSelect} />
        <Button variant="contained" color="primary" onClick={handleUploadFile}>
          Upload Medical History
        </Button>
      </PageContainer>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div style={modalStyle}>
          <h2 id="modal-modal-title">Medical History File</h2>
          <p id="modal-modal-description">
            {fileData}
            <Button variant="contained" color="secondary" onClick={() => setOpenModal(false)}>
              Close
            </Button>
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default MedHistory;
