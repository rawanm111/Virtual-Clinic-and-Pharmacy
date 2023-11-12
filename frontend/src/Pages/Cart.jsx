

import React, {useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {Radio ,FormControlLabel ,RadioGroup} from '@mui/material'
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button'; // Import the Button component
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, ButtonGroup  } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(136deg, #0074cc 0%, #00a0e5 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(136deg, #0074cc 0%, #00a0e5 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient(136deg, #0074cc 0%, #00a0e5 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient(136deg, #0074cc 0%, #00a0e5 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ShoppingCartIcon />,
    2: <LocalShippingIcon />,
    3: <PaymentIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = [
  'View your cart',
  'Choose your shipping address',
  'Payment',
];
const imageStyle = {
  width: '100px', // Set the desired width for the images
  height: '100px', // Set the desired height for the images
};
function CartStep() {
  const [cartData, setCartData] = useState([]);
  const {id} = useParams();
  const [medicationDetails, setMedicationDetails] = useState([]);
  const [editedQuantity, setEditedQuantity] = useState({});
  useEffect(() => {
    // Fetch cart data for the patient
    axios.get(`http://localhost:3000/Cart/${id}`)
    .then((response) => {
      if (response.data && Array.isArray(response.data.medications)) {
        // Access the medications array within cartData
        setCartData(response.data.medications);
      } else {
        console.error('Cart data is not as expected:', response.data);
      }
    })
    .catch((error) => {
      console.error('Error fetching cart data:', error);
    });
    axios
    .get('http://localhost:3000/meds/') // Use the appropriate URL
    .then((response) => {
      // Handle the response and set the medication details in state
      setMedicationDetails(response.data);
    })
    .catch((error) => {
      console.error('Error fetching medication details:', error);
    });
}, [id]);
const handleDelete = (medicationId) => {
  // Remove the medication from the cart in the backend
  axios
    .delete('http://localhost:3000/Cart/remove', {
      data: {
        patientId: id,
        medicationId: medicationId,
      },
    })
    .then((response) => {
      // If the medication is successfully removed, update the cart in the state
      const updatedCart = cartData.filter((item) => item.medicationId !== medicationId);
      setCartData(updatedCart);
    })
    .catch((error) => {
      console.error('Error deleting medication:', error);
    });
};


const handleEditQuantity = (medicationId) => {
  const updatedQuantity = editedQuantity[medicationId];

  // Update the medication's quantity in the backend
  axios
    .put('http://localhost:3000/Cart/update', {
      patientId: id,
      medicationId: medicationId,
      quantity: updatedQuantity,
    })
    .then((response) => {
      // If the quantity is successfully updated, update the cart in the state
      const updatedCart = cartData.map((item) => {
        if (item.medicationId === medicationId) {
          item.quantity = updatedQuantity;
        }
        return item;
      });
      setCartData(updatedCart);
    })
    .catch((error) => {
      console.error('Error updating quantity:', error);
    });
};
const getCartItems = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/Cart/${id}`);
    console.log(response.data);
    if (response.status === 200) {
      // Ensure that medications array exists in cart data
      if (Array.isArray(response.data.medications)) {
        console.log(response.data);
        // Perform payment after fetching cart data
        console.log('will handle now');
        console.log(response.data)
        handlePayment(response.data);
      } else {
        console.error('No medications found in the cart data.');
      }
    } else {
      console.error('Error:', response.data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
const handlePayment = async (cartData) => {
  try {
    const items = cartData.medications;
    const cartId = cartData._id;

    if (!items || !Array.isArray(items)) {
      console.error('No medications found in the cart data.');
      return;
    }

    const response = await axios.post('http://localhost:3000/paymentCart', {
      cartId: cartId,
      items: items.map((item) => ({
        id: item.medicationId,
        quantity: item.quantity,
      })),
    });
    console.log(response.data);

    if (response.status === 200) {
      window.location = response.data.url;
      console.log(response.data.url);
    } else {
      console.error('Error:', response.data);
    }
  } catch (error) {
    console.error('Error:', error.response.data); // Log the detailed error message
  }
};


return (
  <div>
    <h2>Your Cart</h2>

    <Grid container spacing={2}>
      {Array.isArray(cartData) && cartData.length > 0 ? (
        cartData.map((item) => {
          // Find the corresponding medication details by medicationId
          const medicationDetail = medicationDetails.find(
            (detail) => detail._id === item.medicationId
          );

          if (medicationDetail) {
            return (
              <Grid item key={item.medicationId}>
                <Card variant="outlined">
                  <CardContent>
                    <img
                      src={medicationDetail.picture}
                      alt={medicationDetail.name}
                      style={imageStyle}
                    />
                    <Typography variant="h6" component="div">
                      {medicationDetail.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${medicationDetail.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                    <ButtonGroup>
                      <Button
                        onClick={() => handleDelete(item.medicationId)}
                        variant="outlined"
                        color="error"
                      >
                        Delete
                      </Button>
                      <TextField
                        type="number"
                        label="Quantity"
                        value={editedQuantity[item.medicationId] || item.quantity}
                        onChange={(e) => {
                          setEditedQuantity({
                            ...editedQuantity,
                            [item.medicationId]: e.target.value,
                          });
                        }}
                      />
                      <Button
                        onClick={() => handleEditQuantity(item.medicationId)}
                        variant="outlined"
                        color="primary"
                      >
                        Update
                      </Button>
                    </ButtonGroup>
                  </CardContent>

                </Card>

              </Grid>

            );
            
          }


          return null;
        })
      ) : (
        <Box mt={2}>
          <Typography variant="body1" color="textSecondary">
            Your cart is empty.
          </Typography>
        </Box>
      )}
    </Grid>
  </div>
);
}

function AddressStep({ selectedAddress, onAddressChange, onAddAddress }) {
  const [newAddress, setNewAddress] = useState('');
  const {id} = useParams();
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const handleAddAddress = () => {
    if (newAddress.trim() !== '') {
      // Send a request to your backend to add the new address
      axios.post(`http://localhost:3000/Address/add`, {
        patient: id, // Replace with your patient ID
        address: newAddress,
      })
        .then((response) => {
          // Handle the response if needed
          console.log('Address added:', response.data);
        })
        .catch((error) => {
          console.error('Error adding address:', error);
        });

      // Call the onAddAddress function to add the new address
      onAddAddress(newAddress);
      setNewAddress(''); // Clear the input field
    }
  };
  const handlegetAddress = () => {
    // Send a request to your backend to get the addresses for the patient using Axios
    const patientId=id;
    axios.get(`http://localhost:3000/Address/addresses/${patientId}`)
      .then((response) => {
        // Handle the response and set the deliveryAddresses state
        const addresses = response.data;
        
        setDeliveryAddresses(addresses); 
        
      })
      .catch((error) => {
        console.error('Error fetching addresses:', error);
      });
  };
  const handlechangeAddress =(event)=>{
    const selectedValue = event.target.value;

    // Send a request to update the cart's address with the selected address
    axios
      .put(`http://localhost:3000/Cart/update-address`, {
        patientId: id, // Replace with your patient ID
        newAddress: selectedValue,
      })
      .then((response) => {
        // Handle the response if needed
        console.log('Cart address updated:', response.data);
        onAddressChange(selectedValue); // Update the selected address in the parent component
      })
      .catch((error) => {
        console.error('Error updating cart address:', error);
      });
  };
  return (
    <div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="First Name"
            defaultValue=""
          />
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            defaultValue=""
          />
          {/* Add more fields for the address, city, postal code, etc. */}
        </div>
        </Box>
      <div>
        <TextField
          required
          label="New Address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddAddress}>
          Add Address
        </Button>
      </div>
      <Button variant="contained" color="primary" onClick={handlegetAddress}>
        Refresh Addresses
      </Button>
      <div>
        <Select
          value={selectedAddress}
          onChange={handlechangeAddress}
        >
          <MenuItem value="select a Delivery Address">Select a Delivery Address</MenuItem>
          {deliveryAddresses.map((address, index) => (
            <MenuItem key={index} value={address.address}>
              {address.address}
            </MenuItem>
          ))}
        </Select>
      </div>
      
    </div>
  );
}

function PaymentStep() {
const [cartData, setCartData] = useState([]);
const {id} = useParams();
const [medicationDetails, setMedicationDetails] = useState([]);
const [editedQuantity, setEditedQuantity] = useState({});
const [paymentOption, setPaymentOption] = useState('wallet');
const [totalAmount, setTotalAmount] = useState(0); // State to store the total amount
const navigate = useNavigate();

const handleFinish = () => {
  // Make an API call to add the cart to orders
  axios.post('http://localhost:3000/Order/place-order', {
    patientId: id, // Assuming patient ID is available in the component
    // Add other necessary data for the order
  })
  .then((response) => {
    // If the order is successfully placed, delete the cart
    axios.delete(`http://localhost:3000/Cart/delete/${id}`)
    .then(() => {
      // Redirect to a confirmation or thank-you page
      navigate(`/patient-meds/${id}`);
      // Change '/confirmation' to the desired route
    })
    .catch((error) => {
      console.error('Error deleting cart:', error);
    });
  })
  .catch((error) => {
    console.error('Error placing order:', error);
  });
};
const handleFinishVisa = () => {
  // Make an API call to add the cart to orders
  axios.post('http://localhost:3000/Order/place-order', {
    patientId: id, // Assuming patient ID is available in the component
    // Add other necessary data for the order
  })
  .then((response) => {
    // If the order is successfully placed, delete the cart
    axios.delete(`http://localhost:3000/Cart/delete/${id}`)
    .then(() => {
      
    })
    .catch((error) => {
      console.error('Error deleting cart:', error);
    });
  })
  .catch((error) => {
    console.error('Error placing order:', error);
  });
};


const handlePaymentOptionChange = (event) => {
  setPaymentOption(event.target.value);

};

useEffect(() => {
  // Fetch cart data for the patient
  axios.get(`http://localhost:3000/Cart/${id}`)
    .then((response) => {
      if (response.data && Array.isArray(response.data.medications)) {
        // Access the medications array within cartData
        setCartData(response.data.medications);
      } else {
        console.error('Cart data is not as expected:', response.data);
      }
    })
    .catch((error) => {
      console.error('Error fetching cart data:', error);
    });
}, [id]);

useEffect(() => {
  // Fetch medication details
  axios.get('http://localhost:3000/meds/')
    .then((response) => {
      // Handle the response and set the medication details in state
      setMedicationDetails(response.data);
    })
    .catch((error) => {
      console.error('Error fetching medication details:', error);
    });
}, []);

useEffect(() => {
  // Calculate total amount when cart data or medication details change
  calculateTotalAmount(cartData);
}, [cartData, medicationDetails]);

const calculateTotalAmount = (medications) => {
  const total = medications.reduce((acc, item) => {
    const medicationDetail = medicationDetails.find((detail) => detail._id === item.medicationId);

    if (medicationDetail) {
      return acc + item.quantity * medicationDetail.price;
    }

    return acc;
  }, 0);

  setTotalAmount(total);
};

{console.log(totalAmount)}


  const getCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/Cart/${id}`);
      console.log(response.data);

      if (response.status === 200) {
        // Ensure that medications array exists in cart data
        if (Array.isArray(response.data.medications)) {
          console.log(response.data);
          // Perform payment after fetching cart data
          console.log('will handle now');
          console.log(response.data)
          handlePayment(response.data);
        } else {
          console.error('No medications found in the cart data.');
        }
      } else {
        console.error('Error:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handlePayment = async (cartData) => {
    try {
      const items = cartData.medications;
      const cartId = cartData._id;
  
      if (!items || !Array.isArray(items)) {
        console.error('No medications found in the cart data.');
        return;
      }
  
      const response = await axios.post('http://localhost:3000/paymentCart', {
        cartId: cartId,
        items: items.map((item) => ({
          id: item.medicationId,
          quantity: item.quantity,
        })),
      });
      console.log(response.data);
      
      if (response.status === 200) {
        window.location = response.data.url;
        console.log(response.data.url);
      } else {
        console.error('Error:', response.data);
      }
    } catch (error) {
      console.error('Error:', error.response.data); 
    }
  };

  const [walletBalance, setWalletBalance] = useState(0); // Add wallet balance state

  const handleWallet = async () => {
    try {
      if (paymentOption === 'wallet') {
        // Make a request to your backend to process wallet payment
        
        const response = await axios.get(`http://localhost:3000/wallet/${id}`, {
          
        });
        // const prev= response.data.balance - 200;
        console.log(response.data)

        if (response.data.balance < totalAmount) {
          console.error("Insufficient balance");
          
        }
        else{
        if (response && response.status === 200) {
          console.log('Wallet payment successful!');
          // Optionally, you c baan handle any additional logic after a successful wallet payment
          
          // Update the user's wallet balance (assuming you have a state for wallet balance)
          // setWalletBalance(prev);
          // console.log(walletBalance)
          
          const response1 = await axios.put(`http://localhost:3000/wallet/${id}/update-balance`, {
            
            patientId: id,
            balance: response.data.balance - totalAmount,
          });

          
        } else {
          console.error('Wallet payment failed:', response && response.data);
          // Handle wallet payment failure (e.g., show error message to the user)
        }
      }}
    } catch (error) {
      console.error('Error processing wallet payment:', error);
      // Handle error (e.g., show error message to the user)
    }
  };
  
  const handleSubmitPayment = () => {
    console.log("here")
    if (id) {

      if (paymentOption === 'wallet') {
        const appointmentPrice =  totalAmount;
        
        // Update the user's wallet balance (assuming you have a state for wallet balance)
        setWalletBalance((prevBalance) => prevBalance - appointmentPrice);
      }

      

    //   axios.put(`http://localhost:3000/cart/${id}`, updatedAppointment)
    //     .then((response) => {
    //       // ... (remaining logic)
    //     })
    //     .catch((error) => {
    //       console.error('Error booking appointment:', error);
    //     });
    // }
  };
}



  return (
  <div>This is the payment step content.
          <RadioGroup
            name="paymentOption"
            value={paymentOption}
            onChange={handlePaymentOptionChange}
          >
            <FormControlLabel
              value="wallet"
              control={<Radio />}
              label="Payment by Wallet"
            />
            <FormControlLabel
              value="visa"
              control={<Radio />}
              label="Payment by Visa"
            />
            <FormControlLabel
              value="COD"
              control={<Radio />}
              label="Cash On Delivery"
            />
          </RadioGroup>
          
          <Button
  onClick={() => {
    if (paymentOption === 'visa') {
      getCartItems();
      handleFinishVisa();

    } else if (paymentOption === 'COD') {
        handleFinish();
      
    } else {
      handleWallet();
      handleFinish();

    }
  }}
  color="primary"
>
  Submit
</Button>

          <div>
        <Typography variant="h6">Total Amount: ${totalAmount}</Typography>
       
      </div>

  </div>
 
  );
}

export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = useState(0);
  const {patient} = useParams();
  const [selectedAddress, setSelectedAddress] = useState(''); // Add selected address state
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const handleAddAddress = (newAddress) => {
    // Update the list of delivery addresses
    setDeliveryAddresses([...deliveryAddresses, newAddress]);
  };

  const handleAddressChange = (address) => {
    // Handle the selection of a delivery address
    setSelectedAddress(address);
  };
  const handleNext = () => {
    if (activeStep === 1 && !selectedAddress) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const isNotFirstStep = activeStep > 0;

  const isLastStep = activeStep === steps.length - 1;

  return (
    <Stack sx={{ width: '100%' }} spacing={4} mt={5}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 ? (
          <CartStep
            selectedAddress={selectedAddress}
            deliveryAddresses={deliveryAddresses}
            onAddressChange={handleAddressChange}
            onAddAddress={handleAddAddress}
          />
        ) : activeStep === 1 ? (
          <AddressStep
            selectedAddress={selectedAddress}
            deliveryAddresses={deliveryAddresses}
            onAddressChange={handleAddressChange}
            onAddAddress={handleAddAddress}
          />
        ) : (
          <PaymentStep />
        )}
      </div>

      <Stack direction="row">
        {isNotFirstStep && (
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
        )}
        {!isLastStep ?
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={isLastStep}
        >

          Next
        </Button>
        : ''}
      </Stack>
    </Stack>
  );
}

