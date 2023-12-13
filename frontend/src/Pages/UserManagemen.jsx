import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button,TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// import { useHistory } from 'react-router-dom';
// import ProfilePage from './ProfilePage';
import AppBarComponent from '../Components/Appbar/AppbarAdmin';
import { useNavigate } from 'react-router-dom';


export default function UserManagement() {
  const [doctors, setDoctors] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  
  useEffect(() => {
    axios.get('http://localhost:3000/doctors')
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id, // Adjust this based on your data structure
            username:item.username,
            name: item.fullName,   // Adjust this based on your data structure
            hourlyRate: item.hourlyRate ,
            educational_bg: item.educationalBackground, // Adjust this based on your data structure
            speciality: item.speciality,
            email:item.email,
            affiliation:item.affiliation
          }));
          setDoctors(transformedData);
          setFilteredRows(transformedData);

        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, []);



  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilterValue(value);

    if (Array.isArray(doctors)) {
      const searched = doctors.filter((doctor) => {
        return (
          doctor && doctor.name && doctor.name.toLowerCase().includes(value)
        );
      });

      setFilteredRows(searched);
    }
  };

  const handleDeleteDocs = (id) => {
    // Send a DELETE request to your backend API
    const url = `http://localhost:3000/doctors/${id}`;
    axios.delete(url)
      .then(() => {
        setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor.id !== id));
        setFilteredRows((prevFilteredRows) => prevFilteredRows.filter((doctor) => doctor.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting patient:', error);
      });
  };
  
  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    { field: 'hourlyRate', headerName: 'Hourly Rate', width: 200 },
    { field: 'speciality', headerName: 'Speciality', width: 200 },
    { field: 'educational_bg', headerName: 'Educational Background', width: 200 },
    
    
      {field:'action',headerName:"",width:100,
      renderCell: (params) => (
        <div>
          
          <Button variant="outlined" onClick={() => handleDeleteDocs(params.row.id)}>
            DELETE
          </Button>
        </div>
      ),
      
    }
    

  ];
  const handleButtonClick = (row) => {
    // Implement the action you want to perform when the button is clicked
    console.log('Button clicked for row:', row);
    // history.push(`/ProfilePage/${row.id}`); // Replace with your route structure

  };

  //Pharmacists
  const [pharmacists, setPharmacists] = useState([]);
  const [filteredRowsPharma, setFilteredRowsPharma] = useState([]);
  const [filterValuePharma, setFilterValuePharma] = useState('');



  useEffect(() => {
    axios.get('http://localhost:3000/pharmacists')
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id, // Adjust this based on your data structure
            name: item.fullName, 
            username:item.username,
            email:item.email,
            dateOfBirth:item.dateOfBirth,
            hourlyRate:item.hourlyRate,
            affiliation:item.affiliation,
            educationalBackground:item.educationalBackground

          }));
          setPharmacists(transformedData);
          setFilteredRowsPharma(transformedData);

        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, []);



  const handleFilterChangePharma = (e) => {
    const value = e.target.value.toLowerCase();
    setFilterValuePharma(value);

    if (Array.isArray(pharmacists)) {
      const searched = pharmacists.filter((pharmacist) => {
        return (
          pharmacist && pharmacist.name && pharmacist.name.toLowerCase().includes(value)
        );
      });

      setFilteredRowsPharma(searched);
    }
  };

  const handleDeletePharma = (id) => {
    // Send a DELETE request to your backend API
    const url = `http://localhost:3000/pharmacists/${id}`;
    axios.delete(url)
      .then(() => {
        setPharmacists((prevPharma) => prevPharma.filter((pharmacist) => pharmacist.id !== id));
        setFilteredRowsPharma((prevFilteredRows) => prevFilteredRows.filter((pharmacist) => pharmacist.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting patient:', error);
      });
  };
  
  const columnsPharma = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    { field: 'hourlyRate', headerName: 'Hourly Rate', width: 200 },
    { field: 'educationalBackground', headerName: 'Educational Background', width: 200 },

    
      {field:'action',headerName:"",width:100,
      renderCell: (params) => (
        <div>
          
          <Button variant="outlined" onClick={() => handleDeletePharma(params.row.id)}>
            DELETE
          </Button>
        </div>
      ),
      
    }
    

  ];
  const handleButtonClickPharma = (row) => {
    // Implement the action you want to perform when the button is clicked
    console.log('Button clicked for row:', row);
    // history.push(`/ProfilePage/${row.id}`); // Replace with your route structure

  }; 





  //Patients


  const [patients, setpatients] = useState([]);
  const [filteredRowsP, setFilteredRowsP] = useState([]);
  const [filterValueP, setFilterValueP] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/patients')
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id, 
            name: item.fullName,
            username:item.username,
            email:item.email,
            mobileNumber:item.mobileNumber  

          }));
          setpatients(transformedData);
          setFilteredRowsP(transformedData);

        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  


  const handleFilterChangeP = (e) => {
    const value = e.target.value.toLowerCase();
    setFilterValueP(value);
  
    if (Array.isArray(patients)) {
      const filteredPatients = patients.filter((patient) => {
        return patient && patient.name && patient.name.toLowerCase().includes(value);
      });
  
      setFilteredRowsP(filteredPatients);
    }
  };
  

  const handleDelete = (id) => {
    // Send a DELETE request to your backend API
    const url = `http://localhost:3000/patients/${id}`;
    axios.delete(url)
      .then(() => {
        setpatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
        setFilteredRowsP((prevFilteredRows) => prevFilteredRows.filter((patient) => patient.id !== id));
        console.log(id+"thissss");
      })
      .catch((error) => {
        console.error('Error deleting patient:', error);
      });
  };

  
  const columnsP = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    { field: 'mobileNumber', headerName: 'Mobile Number', width: 200 },

    
      {field:'action',headerName:"",width:100,
      renderCell: (params) => (
        <div>
          
          <Button variant="outlined" onClick={() => handleDelete(params.row.id)}>
            DELETE 
          </Button>
        </div>
      ),
      
    }

  ];
  const handleButtonClickP = (row) => {
    // Implement the action you want to perform when the button is clicked
    console.log('Button clicked for row:', row);
    // history.push(`/ProfilePage/${row.id}`); // Replace with your route structure

  };


  //end





const [admins, setAdmins] = useState([]);
const [filteredRowsA, setFilteredRowsA] = useState([]);
const [filterValueA, setFilterValueA] = useState('');
const navigate = useNavigate();

useEffect(() => {
  axios.get('http://localhost:3000/admin')
    .then((response) => {
      if (response.data) {
        const transformedData = response.data.map((item) => ({
          id: item._id, 
          username: item.username,   
        }));
        setAdmins(transformedData);
        setFilteredRowsA(transformedData);

      } else {
        console.error('No data received from the API');
      }
    })
    .catch((error) => {
      console.error('Error fetching admins:', error);
    });
}, []);




const handleFilterChangeA = (e) => {
  const value = e.target.value.toLowerCase();
  setFilterValueA(value);

  if (Array.isArray(admins)) {
    const filteredAdmins = admins.filter((admin) => {
      return admin && admin.username && admin.username.toLowerCase().includes(value);
    });

    setFilteredRowsA(filteredAdmins);
  }
};


const handleDeleteA = (id) => {
  // Send a DELETE request to your backend API
  const url = `http://localhost:3000/admin/${id}`;
  axios.delete(url)
    .then(() => {
      setAdmins((prevPatients) => prevPatients.filter((admin) => admin.id !== id));
      setFilteredRowsA((prevFilteredRows) => prevFilteredRows.filter((admin) => admin.id !== id));
    })
    .catch((error) => {
      console.error('Error deleting admin:', error);
    });
};
const handleResetPassword = (adminusername) => {
  // Implement the logic to reset password
  navigate(`/changepass/${adminusername}`);
  console.log(`Reset password for adminId: ${adminusername}`);
  // Example: axios.post(`http://localhost:3000/admin/reset-password/${adminId}`);
};

const columnsA = [
  { field: 'username', headerName: 'Username', width: 200 },
  // ... [other columns] ...
  {
    field: 'action',
    headerName: 'Action',
    width: 300,
    renderCell: (params) => (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleResetPassword(params.row.username)}
          style={{ marginRight: 10 }}
        >
          Reset Password
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleDeleteA(params.row.id)}
        >
          DELETE
        </Button>
      </div>
    ),
  },
];
const handleButtonClickA = (row) => {
  // Implement the action you want to perform when the button is clicked
  console.log('Button clicked for row:', row);
  // history.push(`/ProfilePage/${row.id}`); // Replace with your route structure

};

const navigateToAdminForm = () => {
  navigate('/AdminForm');
};


//end


  return (
    <Box bgcolor="#daf4ff">
       <AppBarComponent/>
      <h1>Doctors</h1>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          gap: '16px',
          padding: '10px',
        }}
      >
        <TextField
          label="Search by Name"
          variant="outlined"
          value={filterValue}
          onChange={handleFilterChange}
        />
        <Button variant="contained">
          Search
        </Button>
      </Box>
      
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
      />

<h1>Pharmacists</h1>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          gap: '16px',
          padding: '10px',
        }}
      >
        <TextField
          label="Search by Name"
          variant="outlined"
          value={filterValuePharma}
          onChange={handleFilterChangePharma}
        />
        <Button variant="contained">
          Search
        </Button>
      </Box>
      
      <DataGrid
        rows={filteredRowsPharma}
        columns={columnsPharma}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
      />
    <h1>Patients</h1>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          gap: '16px',
          padding: '10px',
        }}
      >
        <TextField
          label="Search by Name"
          variant="outlined"
          value={filterValueP}
          onChange={handleFilterChangeP}
        />
        <Button variant="contained">
          Search
        </Button>
      </Box>
      
      <DataGrid
        rows={filteredRowsP}
        columns={columnsP}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
      />

<h1>Admins</h1>
<Box
sx={{flexDirection: 'row'}}>

        
        <Button variant="contained" onClick={navigateToAdminForm}>
        Create Admin
      </Button>

      
       
     </Box>
     <Box
        sx={{
          display: 'flex',
          justifyContent: 'left',
          gap: '16px',
          padding: '10px',
        }}
      >
     <TextField
          label="Search by Name"
          variant="outlined"
          value={filterValueA}
          onChange={handleFilterChangeA}
          
        />
        <Button variant="contained">
          Search
        </Button>

      </Box>
      <DataGrid
        rows={filteredRowsA}
        columns={columnsA}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
      />
    
    </Box>



  );
}
