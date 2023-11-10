import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate , useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from '../Pages/Cart'

function MedicationTablePatient() {
  console.log('MedicationTable component is rendering.');
  const [medicationData, setMedicationData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicalUse, setSelectedMedicalUse] = useState('');
  const [uniqueMedicalUses, setUniqueMedicalUses] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();
  

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
  const handleGoToCart = () => {
    
    // Navigate to your cart page when the button is clicked
    navigate('/Cart'); // Replace '/cart' with your actual cart page URL
  };

  const filteredRows = medicationData.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedMedicalUse === '' || row.medicalUse === selectedMedicalUse)
  );
  const addToCart = (medicationId) => {
    const patientId = id.toString();
    // Send a request to your backend to add the medication to the patient's cart
    axios.post('http://localhost:3000/Cart/add', {
      patientId,
      medicationId,
      quantity: 1,
       // You can specify the quantity to add
    })
    .then((response) => {
      console.log('Medication added to cart:', response.data);
      // You can add logic to show a success message or update the UI as needed
    })
    .catch((error) => {
      console.error('Error adding medication to cart:', error);
    });
  };

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
    { 
      field: 'addToCart',
      headerName: 'Add to Cart',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => addToCart(params.row._id)}
        >
          <ShoppingCartIcon />
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Button
          className="cart-button"
          variant="contained"
          color="primary"
          onClick={handleGoToCart}
          style={{
            position: 'absolute',
            top: 180,
            right: 20,
            padding: '10px',
            borderRadius: '50%',
          }}
        >
          <ShoppingCartIcon /> {/* Material-UI cart icon */}
        </Button>
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

export default MedicationTablePatient;
