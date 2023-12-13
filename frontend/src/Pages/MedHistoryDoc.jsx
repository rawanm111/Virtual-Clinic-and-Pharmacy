import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AppBarComponent from '../Components/Appbar/AppbarDoctor';
import { useNavigate } from 'react-router-dom';
import S1 from '../css/open-iconic-bootstrap.min.css';
import S2 from '../css/animate.css';
import S3 from '../css/owl.carousel.min.css';
import S4 from '../css/owl.theme.default.min.css';
import S5 from '../css/magnific-popup.css';
import S6 from '../css/aos.css';
import S7 from '../css/ionicons.min.css';
import S8 from '../css/bootstrap-datepicker.css';
import S9 from '../css/jquery.timepicker.css';
import S10 from '../css/flaticon.css';
import S11 from '../css/icomoon.css';
import S12 from '../css/style.css';
import I1 from "../images/about.jpg";
import I2 from "../images/bg_1.jpg";
import I3 from "../images/bg_2.jpg";
import { FaUser, FaWallet } from 'react-icons/fa';

const PageContainer = styled('div')({
  backgroundColor: 'white',
  padding: '16px',
});

const HeaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
});

const CardWrapper = styled(Card)(({ theme }) => ({
  width: '250px',
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
  border: '2px solid #0070F3',
  borderRadius: '10px',
  boxShadow: 24,
  padding: '16px',
  overflow: 'auto',
};

function MedHistory() {
  const { id } = useParams(); // This is the doctor's ID, not the patient's ID
  const [currentImage, setCurrentImage] = useState(I2);
  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
  const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const [healthPackages, setHealthPackages] = useState([]);
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
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

  const TwoColumnLayout = styled('div')({
    margintop:"auto",
    display: 'flex',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  });
  
  const LeftSide = styled('div')({
     
    marginLeft: 'auto',
    // Add styles for the left side if needed
  });
  
  const RightSide = styled('div')({
   marginRight:"auto",
    marginLeft: 'auto', // This will move the content to the right
  padding: '16px',
   
    // Add styles for the right side if needed
  });
  const buttonStyles = {
    background: 'white',
    color: '#0070F3', // Blue color
    border: '1px solid #0070F3', // Blue border
  };
  const BlueDataGrid = styled(DataGrid)(({ theme }) => ({
   fontSize:"18px",
    border: '2px solid #0070F3', // Blue border
    // Shadow
    
  }));

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'patientName', headerName: 'Patient Name', width: 200 },
    { field: 'doctorNotes', headerName: 'Doctor Notes', width: 200 },
    {
      field: 'addNotes',
      headerName: 'Add Notes',
      width: 200,
      renderCell: (params) => (
        <Button
        style={buttonStyles}
          variant="contained"
          color="primary"
          onClick={() => {
            setCurrentHistoryId(params.row.id);
            setOpenModal(true);
          }}
        >
          Add Notes
        </Button>
      ),
    },
    {
      field: 'viewDocuments',
      headerName: 'View Documents',
      width: 200,
      renderCell: (params) => (
        <Button
        style={buttonStyles}
          variant="contained"
          color="primary"
          onClick={() => handleViewDocuments(params.row.id)}
        >
          View Documents
        </Button>
      ),
    },
    // ... Add more columns as needed
  ];

  const rows = histories.map((history) => ({
    id: history._id,
    patientName: history.patientName || 'Unknown Patient',
    doctorNotes: history.doctorNotes || '',
    // ... Add more fields as needed
  }));

  const handleViewDocuments = (historyId) => {
    // Handle the logic to fetch and set patient documents based on historyId
    const selectedHistory = histories.find((history) => history._id === historyId);
    // Set the documents for the right side
    setPatientDocuments(selectedHistory.documents || []);
  };

  const [patientDocuments, setPatientDocuments] = useState([]);

  return (
<div style={{ backgroundColor: "white" }}>
  <title>MetaCare </title>
   <nav className="navbar py-4 navbar-expand-lg ftco_navbar navbar-light bg-light flex-row">
        <div className="container"  >
          <div className="row no-gutters d-flex align-items-start align-items-center px-3 px-md-0">
            <div className="col-lg-2 pr-4 align-items-center">
              <a className="navbar-brand" >
                Meta<span>Care</span>
              </a>
              
            </div>
          </div>
        </div>
      </nav>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark ftco-navbar-light"
        id="ftco-navbar"
        
      >
        <div className="container d-flex align-items-center">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu" /> Menu
          </button>
        
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active" style={{marginRight:"10px"} }>
                <a  className="nav-link pl-0"  onClick={() => navigate(`/doc-home/${id}`)}>
                  Home
                </a>
              </li>
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setShowPersonalDropdown(true)}
                onMouseLeave={() => setShowPersonalDropdown(false)}
              >
                <a
                  className="nav-link dropdown-toggle"
                  
                  id="doctorsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={setShowPersonalDropdown}
                >
                 My Patients
                </a>
                <div
                  className={`dropdown-menu ${
                    showPersonalDropdown ? 'show' : ''
                  }`}
                  aria-labelledby="personalDropdown"
                >
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/patientsTable/${id}`)}>
                     Patients List 
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/healthRecs/${id}`)}>
                     Patients Health Record
                     </a>
                 
                </div>
              </li>
              
              <li className="nav-item " style={{marginRight:"10px"} }>
                <a  className="nav-link pl-0"  onClick={() => navigate(`/appPageDoc/${id}`)}>
                  My Appointments
                </a>
              </li>
              
              {/* Profile dropdown */}
              
    
<li
  className="nav-item dropdown "
  onMouseEnter={() => setShowProfileDropdown(true)}
  onMouseLeave={() => setShowProfileDropdown(false)}
  style={{marginLeft:"700px"}}
>
  <a
    className="nav-link dropdown-toggle"
    
    id="profileDropdown"
    role="button"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded={showProfileDropdown}
    
  >
    <FaUser style={{ fontSize: '20px', marginRight: '5px' }} />
    
  </a>
  <div
    className={`dropdown-menu ${showProfileDropdown ? 'show' : ''}`}
    aria-labelledby="profileDropdown"
  >
    <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/changepassTwo/${id}`)}>
      Change Password
    </a>
    <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/doc-profile/${id}`)}>
      My Profile
    </a>
    <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/clinic`)}>
      Logout
    </a>
  </div>
</li>

{/* Wallet icon without dropdown */}
<li className="nav-item ">
<a className="nav-link"  onClick={() => navigate(`/wallet`)}>
    <FaWallet style={{ fontSize: '20px', marginRight: '5px' }} />
  
  </a>
</li>

            </ul>
          </div>
        </div>
      </nav>

      
      <section
      className="hero-wrap hero-wrap-2"
      style={{ backgroundImage: `url(${I2})` }}
      data-stellar-background-ratio="0.5"
    >
      <div className="overlay" />
      <div className="container">
        <div className="row no-gutters slider-text align-items-center justify-content-center">
          <div className="col-md-9  text-center" style={{ fontWeight: 'bold', fontSize: '72px' }}>
            <h1 className="mb-2 bread" style={{ fontWeight: 'bold', fontSize: '72px' }}>
            My Patient Health Record
            </h1>
            <p className="breadcrumbs">
              <span className="mr-2" style={{ fontSize: '14px', color: '#fff' }}>
                <a >
                  Home <i className="ion-ios-arrow-forward" />
                </a>
              </span>{' '}
              <span style={{ fontSize: '14px', color: '#fff' }}>
              My Patient <i className="ion-ios-arrow-forward" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
     
    <TwoColumnLayout>
        <LeftSide>
          <PageContainer>
            {/* Use Material-UI DataGrid for the left side */}
            <BlueDataGrid rows={rows} columns={columns} pageSize={5} />
          </PageContainer>
        </LeftSide>

        <RightSide>
 
    {patientDocuments.map((document) => (
      <div className="col-md-4" key={document._id}  style={{ borderRadius: '8px', display: 'flex'}}>
        <div className="pricing-entry pb-5 text-center" style={{ borderRadius: '8px', display: 'flex'}}>
          <div style={{ flex: '1' }}>
            <h3 className="mb-4" style={{ display: 'flex' }}>
              {document.filename}
            </h3>
            <div style={{ flex: '1', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <Button
              style={buttonStyles}
              variant="contained"
              color="primary"
              onClick={() => {
                handleDownloadFile(document.filename, document.contentType, document.data);
              }}
            >
              Download Document
            </Button>
          </div>
          </div>
          
        </div>
      </div>
    ))}
 
</RightSide>
      </TwoColumnLayout>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
  <div style={modalStyle}>
    <h2 id="modal-modal-title"style={{ textAlign: 'center', fontWeight: 'bold', color: '#0070F3' }}>Add Doctor Notes</h2>
    <textarea
      rows="4"
      cols="50"
      placeholder="Enter doctor notes..."
      onChange={(e) => setFileData(e.target.value)}
      style={{ marginBottom: '10px' }} // Add margin bottom for spacing
    />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button
        style={{
          background: 'white',
          color: '#0070F3', // Blue text
          border: '2px solid #0070F3', // Blue border
          marginBottom: '10px', // Adjust the spacing as needed
        }}
        variant="contained"
        onClick={() => {
          handleAddNotes(currentHistoryId, fileData);
          setOpenModal(false);
        }}
      >
        Save Notes
      </Button>
      <Button
        style={{
          background: 'white',
          color: '#0070F3', // Blue text
          border: '2px solid #0070F3', // Blue border
        }}
        variant="contained"
        color="secondary"
        onClick={() => setOpenModal(false)}
      >
        Close
      </Button>
    </div>
  </div>
</Modal>
    </div>
  );
}

export default MedHistory;
