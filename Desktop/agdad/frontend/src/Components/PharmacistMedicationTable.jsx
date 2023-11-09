import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function PharmacistMedicationTable() {
  const [medicationData, setMedicationData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicalUse, setSelectedMedicalUse] = useState('');
  const [uniqueMedicalUses, setUniqueMedicalUses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParameters = {
      medicalUse: selectedMedicalUse,
    };

    const fetchMedicationData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/meds/', {
          params: queryParameters,
        });
        const responseData = response.data;

        const rowsWithIds = responseData.map((row) => ({
          ...row,
          id: row._id,
          isEditingDescription: false,
          isEditingPrice: false,
        }));

        // Filter data based on searchQuery and selectedMedicalUse
        const filteredData = rowsWithIds.filter((row) => {
          const matchesSearch = row.name.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesMedicalUse = !selectedMedicalUse || row.medicalUse === selectedMedicalUse;
          return matchesSearch && matchesMedicalUse;
        });

        setMedicationData(filteredData);

        const uniqueUses = [...new Set(rowsWithIds.map((item) => item.medicalUse))];
        setUniqueMedicalUses(uniqueUses);
      } catch (error) {
        console.error('Error fetching medication data:', error);
      }
    };

    fetchMedicationData();
  }, [selectedMedicalUse, searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Functions to handle editing description and price
  const handleEditDescription = (row) => {
    // Create a copy of the medicationData
    const updatedData = [...medicationData];
    const index = updatedData.findIndex((item) => item.id === row.id);
    updatedData[index].isEditingDescription = true;
    setMedicationData(updatedData);
  };

  const handleEditPrice = (row) => {
    // Create a copy of the medicationData
    const updatedData = [...medicationData];
    const index = updatedData.findIndex((item) => item.id === row.id);
    updatedData[index].isEditingPrice = true;
    setMedicationData(updatedData);
  };

  const handleAddMedClick = () => {
    navigate('/new-med');
  };

  // Functions to handle saving description and price changes
  const handleSaveDescription = async (row) => {
    try {
      const updatedData = [...medicationData];
      const index = updatedData.findIndex((item) => item.id === row.id);
      updatedData[index].isEditingDescription = false;

      // Send the updated description to the backend API
      await axios.put(`http://localhost:2002/meds/updateDescription/${row.id}`, { description: row.description });

      setMedicationData(updatedData);
    } catch (error) {
      console.error('Error updating description:', error);
    }
  };

  const handleSavePrice = async (row) => {
    try {
      const updatedData = [...medicationData];
      const index = updatedData.findIndex((item) => item.id === row.id);
      updatedData[index].isEditingPrice = false;

      // Send the updated price to the backend API
      await axios.put(`http://localhost:2002/meds/updatePrice/${row.id}`, { price: row.price });

      setMedicationData(updatedData);
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  // Define columns for the DataGrid
  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      renderCell: (params) => (
        <div>
          {params.row.isEditingDescription ? (
            <>
              <input
                type="text"
                value={params.row.description}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setMedicationData((prevData) =>
                    prevData.map((item) =>
                      item.id === params.row.id
                        ? { ...item, description: newValue }
                        : item
                    )
                  );
                }}
              />
              <Button variant="outlined" color="primary" size="small" onClick={() => handleSaveDescription(params.row)}>Save</Button>
            </>
          ) : (
            <>
              {params.value}
              <Button variant="outlined" color="primary" size="small" onClick={() => handleEditDescription(params.row)}>Edit</Button>
            </>
          )}
        </div>
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      renderCell: (params) => (
        <div>
          {params.row.isEditingPrice ? (
            <>
              <input
                type="number"
                value={params.row.price}
                onChange={(e) => {
                  const newValue = parseFloat(e.target.value);
                  setMedicationData((prevData) =>
                    prevData.map((item) =>
                      item.id === params.row.id
                        ? { ...item, price: newValue }
                        : item
                    )
                  );
                }}
              />
              <Button variant="outlined" color="primary" size="small" onClick={() => handleSavePrice(params.row)}>Save</Button>
            </>
          ) : (
            <>
              {params.value}
              <Button variant="outlined" color="primary" size="small" onClick={() => handleEditPrice(params.row)}>Edit</Button>
            </>
          )}
        </div>
      ),
    },
    { field: 'availableQuantity', headerName: 'Available Quantity', flex: 1 },
    { field: 'sales', headerName: 'Sale', flex: 1 },
    {
      field: 'picture',
      headerName: 'Picture',
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Medication"
          style={{ width: '100px', height: 'auto' }}
        />
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Input for searching by name */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <Button variant="contained" color="primary" onClick={handleAddMedClick}> 
          Add New Medication
        </Button>
        
        {/* Dropdown for filtering by medical use */}
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
        {/* DataGrid to display medication data */}
        <DataGrid
          rows={medicationData}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row.id}
        />
      </div>
    </div>
  );
}

export default PharmacistMedicationTable;
