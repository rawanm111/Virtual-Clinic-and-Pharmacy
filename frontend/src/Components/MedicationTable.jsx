import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

function MedicationTable() {
  console.log('MedicationTable component is rendering.');
  const [medicationData, setMedicationData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicalUse, setSelectedMedicalUse] = useState('');
  const [uniqueMedicalUses, setUniqueMedicalUses] = useState([]);

  useEffect(() => {
    const queryParameters = {
      medicalUse: selectedMedicalUse, // Add the medical use filter here
    };

    const fetchMedicationData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/meds/', {
          params: queryParameters,
        });
        const responseData = response.data;
        console.log('Fetched data:', responseData);
        setMedicationData(responseData);

        // Extract unique medical uses from fetched data
        const uniqueUses = [...new Set(responseData.map((item) => item.medicalUse))];
        setUniqueMedicalUses(uniqueUses);
      } catch (error) {
        console.error('Error fetching medication data:', error);
      }
    };

    fetchMedicationData();
  }, [selectedMedicalUse]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = medicationData.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedMedicalUse === '' || row.medicalUse === selectedMedicalUse)
  );

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
    { field: 'picture', headerName: 'Picture', flex: 1, renderCell: (params) => (
      <img
        src={params.row.picture}
        alt="Medication"
        style={{ width: '100px', height: 'auto' }}
      />
    ) },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        {/* Medical Use filter */}
        <select
          value={selectedMedicalUse}
          onChange={(e) => setSelectedMedicalUse(e.target.value)}
        >
          <option value="">Filter using Medical Uses</option>
          <option value="">All Medical Uses</option>
          {uniqueMedicalUses.map((use) => (
            <option key={use} value={use}>
              {use}
            </option>
          ))}
        </select>
      </div>
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

export default MedicationTable;
