import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

import AppBarComponent from '../Components/Appbar/AppbarPatientClinc';

function FamilyMember() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [familyMembers, setFamilyMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getFamilyMembersForUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/patients/family_members/user/${id}`);
        const responseData = response.data;
        setFamilyMembers(responseData);
      } catch (error) {
        console.error('Error fetching family member data:', error);
      }
    };

    getFamilyMembersForUser();
  }, [id]);

  // Log the state whenever it changes
  useEffect(() => {
    console.log('Family Members State:', familyMembers);
  }, [familyMembers]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = familyMembers.map((row) => ({
    id: row._id, // Assuming _id is the unique identifier
    fullName: row.patient.fullName,
    relation: row.relation,
  })).filter((row) =>
    row &&
    row.fullName &&
    row.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: 'fullName', headerName: 'Name', flex: 1 },
    { field: 'relation', headerName: 'Relation to Patient', flex: 1 },
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
        onClick={() => navigate(`/add-family-member/${id}`)}
      >
        Add Family Member
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row.id}
        />
      </div>
    </div>
  );
}

export default FamilyMember;
