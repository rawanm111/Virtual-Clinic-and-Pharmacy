import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import axios from 'axios';
import AppbarAdmin from '../Components/Appbar/AppbarAdmin';
import { useNavigate } from 'react-router-dom';
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
  flexWrap: 'wrap',
  gap: '16px',
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

// Move base64toBlob function here
const base64toBlob = (base64Data, contentType) => {
  try {
    const sliceSize = 512;
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  } catch (error) {
    console.error('Error decoding base64:', error);
    return null; // Return null to indicate an error
  }
};

function AdminRequests() {
  const [adminRequests, setAdminRequests] = useState([]);
  const navigate = useNavigate();

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

  const handleRejectRequest = (requestId) => {
    setAdminRequests(adminRequests.filter((req) => req._id !== requestId));

    axios
      .delete(`http://localhost:3000/api/pharmcistReq/delete/${requestId}`)
      .then((response) => {
        console.log('Request rejected and removed successfully');
      })
      .catch((error) => {
        console.error('Error rejecting request:', error);
      });
  };

  const handleAcceptRequest = (requestId, adminRequest) => {
    const requestData = {
      fullName: adminRequest.fullName,
      username: adminRequest.username,
      email: adminRequest.email,
      password: adminRequest.password,
      dateOfBirth: adminRequest.dateOfBirth,
      hourlyRate: adminRequest.hourlyRate,
      affiliation: adminRequest.affiliation,
      educationalBackground: adminRequest.educationalBackground,
    };
    axios
      .post('http://localhost:3000/pharmacists/', requestData)
      .then((response) => {
        console.log('Request accepted successfully');
        axios
          .delete(`http://localhost:3000/api/pharmcistReq/delete/${requestId}`)
          .then((response) => {
            setAdminRequests(adminRequests.filter((req) => req._id !== requestId));
          })
          .catch((error) => {
            console.error('Error removing request:', error);
          });
      })
      .catch((error) => {
        console.error('Error accepting request:', error);
      });
  };

  const handleDownloadFile = (fileInfo, fileName) => {
    if (fileInfo && fileInfo.buffer && fileInfo.buffer.length > 0) {
      const fileExtension = fileName.split('.').pop().toLowerCase();

      // Map file extensions to content types
      const contentTypeMap = {
        png: 'image/png',
        // Add more mappings as needed
      };

      const contentType = contentTypeMap[fileExtension] || 'application/octet-stream';

      console.log('File Extension:', fileExtension);
      console.log('Content Type:', contentType);

      const blobData = base64toBlob(fileInfo.buffer, contentType);
      if (blobData) {
        const blobUrl = URL.createObjectURL(blobData);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName;
        a.click();
      } else {
        console.error('Invalid base64 data for file:', fileName);
        // Handle the error, e.g., show a message to the user
      }
    } else {
      console.error('No or invalid file data for file:', fileName);
      // Handle the error, e.g., show a message to the user
    }
  };

  return (
    <div>
      <AppbarAdmin />
      <PageContainer>
        <HeaderContainer>
          <Typography variant="h4" component="div" sx={{ color: '#000080' }}>
            Pharmacist Requests
          </Typography>
        </HeaderContainer>
        <CardsContainer>
          {adminRequests.map((adminRequest) => (
            <CardWrapper key={adminRequest._id} variant="outlined">
              <CardContent>
                <NameTypography variant="h5" component="div">
                  {adminRequest.fullName}
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
                    {adminRequest.dateOfBirth}
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
                    {adminRequest.affiliation}
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
              <div>
                <SubtitleTypography variant="subtitle1">
                  Pharmacist Files:
                </SubtitleTypography>
                <DataTypography variant="body2">
                  {/* Display any relevant message or status related to the file */}
                </DataTypography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    handleDownloadFile(
                      adminRequest.nationalIdFile[0],
                      `${adminRequest.fullName}_NationalID.png`
                    )
                  }
                >
                  Download National ID
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    handleDownloadFile(
                      adminRequest.pharmacyDegreeFile[0],
                      `${adminRequest.fullName}_PharmacyDegree.pdf`
                    )
                  }
                >
                  Download Pharmacy Degree
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    handleDownloadFile(
                      adminRequest.workingLicenseFile[0],
                      `${adminRequest.fullName}_WorkingLicense.pdf`
                    )
                  }
                >
                  Download Working License
                </Button>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAcceptRequest(adminRequest._id, adminRequest)}
              >
                Accept Request
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRejectRequest(adminRequest._id)}
              >
                Reject Request
              </Button>
            </CardWrapper>
          ))}
        </CardsContainer>
      </PageContainer>
    </div>
  );
}

export default AdminRequests;
