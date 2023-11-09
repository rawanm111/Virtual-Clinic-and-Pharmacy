import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from '@mui/material/Button';

import AppBarComponent from '../Components/Appbar/AppbarPatientClinc';

function FamilyMember() {
  const navigate = useNavigate(); // Initialize the navigate function

  console.log('FamilyMember component is rendering.');

  const [familyMembers, setFamilyMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const queryParameters = {
      // Define your query parameters here, if needed
    };

    const getAllFamilyMembers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/family_members/', {
          params: queryParameters
        });
        const responseData = response.data;
        console.log('Fetched data:', responseData);
        setFamilyMembers(responseData);
      } catch (error) {
        console.error('Error fetching family member data:', error);
      }
    };

    getAllFamilyMembers();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = familyMembers.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'age', headerName: 'Age', flex: 1 },
    { field: 'nationalid', headerName: 'National ID', flex: 1 },
    { field: 'relationtopatient', headerName: 'Relation to Patient', flex: 1 },
  ];

  return (
    <div>
      <AppBarComponent />
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/add-family-member')} // Use navigate to go to the add family member route
      >
        Add Family Member
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
}

export default FamilyMember;
