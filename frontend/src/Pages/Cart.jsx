import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneIcon from '@mui/icons-material/Done';import { Typography, Grid, ButtonGroup ,Box } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import WalletModal from './walletModal';
import { FaUser, FaWallet, FaShoppingBasket  } from 'react-icons/fa';


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
    3: <DoneIcon />,
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
  'Complete your Billing Details',
  'Done',
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
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('');
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

const calculateTotal = () => {
  let total = 0;
  cartData.forEach((item) => {
    const medicationDetail = medicationDetails.find(
      (detail) => detail._id === item.medicationId
    );
    if (medicationDetail) {
      total += medicationDetail.price * item.quantity;
    }
  });
  return total;
};

const calculateItemTotal = (medicationId) => {
  const medicationDetail = medicationDetails.find(
    (detail) => detail._id === medicationId
  );
  console.log(medicationDetail);
  if (medicationDetail) {
    return medicationDetail.price * cartData.find((item) => item.medicationId === medicationId).quantity;
  }
  console.log(medicationDetail);

  return 0;
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
      patientId: id,
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

const handleNext = () => {
  
  setActiveStep(2);

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

const isNotFirstStep = activeStep > 0;

const isLastStep = activeStep === steps.length - 1;

return (
  <div className="site-wrap" style={{margin:"50px"}}>
  <div className="site-section">
<div className="container">
  <div className="row mb-5">
    <form className="col-md-12" method="post">
      <div className="site-blocks-table">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="product-thumbnail">Image</th>
              <th className="product-name">Product</th>
              <th className="product-price">Price</th>
              <th className="product-quantity">Quantity</th>
              <th className="product-total">Total</th>
              <th className="product-remove">Remove</th>
            </tr>
          </thead>
          <tbody>
{Array.isArray(cartData) && cartData.length > 0 ? (
  cartData.map((item) => {
    // Find the corresponding medication details by medicationId
    const medicationDetail = medicationDetails.find(
      (detail) => detail._id === item.medicationId
    );

    if (medicationDetail) {
      return (


            <><tr>
          <td className="product-thumbnail">
            <img
             src={medicationDetail.picture}
             alt={medicationDetail.name}
             style={imageStyle}/>
          </td>
          <td className="product-name">
            <h2 className="h5 text-black">{medicationDetail.name}</h2>
          </td>
          <td>${medicationDetail.price}</td>
          <td>
          <div
style={{
display: 'flex',
gap: 15,
maxWidth: 150,

}}
>
<TextField
type="number"
value={editedQuantity[item.medicationId] || item.quantity}
onChange={(e) => {
setEditedQuantity({
  ...editedQuantity,
  [item.medicationId]: e.target.value,
});
}}
height="1px"
style={{ marginBottom: 8, width: 100  }}
/>
<Button
onClick={() => handleEditQuantity(item.medicationId)}
variant="outlined"
color="primary"
style={{ marginBottom: 8 }}
>
Update
</Button>
</div>

          </td>
          <td>${calculateItemTotal(item.medicationId)}</td>
          <td>
          <a
            onClick={() => handleDelete(item.medicationId)}
            className="btn btn-primary height-auto btn-sm"
            style={{ cursor: 'pointer', color: 'white', transition: 'color 0.3s' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'blue'} // Change to the desired color on hover
            onMouseOut={(e) => e.currentTarget.style.color = 'white'} // Change back to the original color on mouse out
          >
            X
          </a>

          </td>
        </tr>
        </>
         
);
      
}
return null;
}
)
) : (
<div>
{/* <h1>No items in cart</h1> */}

</div>
)}
</tbody>
        </table>
      </div>
    </form>
  </div>
  <div className="row">
    <div className="col-md-6">
      <div className="row mb-5">
        <div className="col-md-6 mb-3 mb-md-0">
          <button className="btn btn-primary btn-md btn-block"
          navigate={`/med/${id}`}
                  >
            Continue Shopping
          </button>
        </div>
        
      </div>
      
    </div>
    <div className="col-md-6 pl-5">
      <div className="row justify-content-end">
        <div className="col-md-7">
          <div className="row">
            <div className="col-md-12 text-right border-bottom mb-5">
              <h3 className="text-black h4 text-uppercase">
                Cart Totals
              </h3>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <span className="text-black">Subtotal</span>
            </div>
            <div className="col-md-6 text-right">
              <strong className="text-black">${calculateTotal()}</strong>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-md-6">
              <span className="text-black">Total</span>
            </div>
            <div className="col-md-6 text-right">
              <strong className="text-black">${calculateTotal()}</strong>
            </div>
          </div>
          <div className="row">
            {/* <div className="col-md-12">
              <Button
                className="btn btn-primary btn-lg btn-block"
                onClick={handleNext}
                disabled={isLastStep}
              >
                Proceed To Checkout
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
);
}

function AddressStep({ selectedAddress, onAddressChange, onAddAddress }) {
  const [newAddress, setNewAddress] = useState('');
  const {id} = useParams();
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [medicationDetails, setMedicationDetails] = useState([]);
 
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
    handlegetAddress();
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
  const calculateItemTotal = (medicationId) => {
    const medicationDetail = medicationDetails.find(
      (detail) => detail._id === medicationId
    );
    console.log(medicationDetail);
    if (medicationDetail) {
      return medicationDetail.price * cartData.find((item) => item.medicationId === medicationId).quantity;
    }
    console.log(medicationDetail);
  
    return 0;
  };
  const calculateTotal = () => {
    let total = 0;
    cartData.forEach((item) => {
      const medicationDetail = medicationDetails.find(
        (detail) => detail._id === item.medicationId
      );
      if (medicationDetail) {
        total += medicationDetail.price * item.quantity;
      }
    });
    return total;
  };

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
      navigate(`/Thankyou/${id}`);

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
        patientId: id,
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

      

    
  };
}

  return (
    
    <div className="site-wrap">
    
    <div className="site-section">
      <div className="container mb-5">
      
        <div className="row">
          <div className="col-md-6 mb-5 mb-md-0" >
            <h2 className="h3 mb-3 text-black">Billing Details</h2>
            <div className="p-3 p-lg-5 border">
              <div className="form-group">
                <label htmlFor="c_country" className="text-black">
                  Country <span className="text-danger">*</span>
                </label>
                <select id="c_country" className="form-control">
                  <option value={1}>Select a country</option>
                  <option value={2}>Egypt</option>
                  <option value={3}>UAE</option>

                </select>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <label htmlFor="c_fname" className="text-black">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="c_fname"
                    name="c_fname"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="c_lname" className="text-black">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="c_lname"
                    name="c_lname"
                  />
                </div>
              </div>
              
              <div className="form-group row">
              {handlegetAddress()}
                <div className="col-md-12">
                  <label htmlFor="c_address" className="text-black">
                    Choose Address <span className="text-danger">*</span>
                  </label>
                  <select id="c_address" className="form-control"
                  value={selectedAddress}
                  onChange={handlechangeAddress}
                  // onClick={handlegetAddress}
                  >
                    <option value={1}>Select an Address</option>
                    {deliveryAddresses.map((address, index) => (
            <option key={index} value={address.address}>
              {address.address}
            </option>
          ))}
                    

                  </select>
                  
      <div  marginTop= {"2.5rem"} style={{marginTop:"1.2rem"}}>

      <label htmlFor="c_address" className="text-black">
    Add a new Address <span className="text-danger"></span>
  </label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
  
  <input
    type="text"
    className="form-control"
    id="c_address"
    name="c_address"
    placeholder=""
    required
    value={newAddress}
    onChange={(e) => setNewAddress(e.target.value)}
  />
  <Button
    variant="contained"
    color="primary"
    onClick={handleAddAddress}
    style={{ marginLeft: "10px" }}
    
  >
    <AddIcon />
  </Button>
</div>

                  </div>
                </div>
              </div>
              
            </div>
          </div>
          <div className="col-md-6">
            
            <div className="row mb-5">
              <div className="col-md-12">
                <h2 className="h3 mb-3 text-black">Your Order</h2>
                <div className="p-3 p-lg-5 border">
                  <table className="table site-block-order-table mb-5">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      {Array.isArray(cartData) && cartData.length > 0 ? (
        cartData.map((item) => {
          // Find the corresponding medication details by medicationId
          const medicationDetail = medicationDetails.find(
            (detail) => detail._id === item.medicationId
          );

          if (medicationDetail) {
            return (
              
<tr>
                        <td>
                          {medicationDetail.name} <strong className="mx-2">x</strong> {item.quantity}
                        </td>
                        <td>${calculateItemTotal(item.medicationId)}</td>
                        </tr>
                        
                        
                      );
                    }
                    return null;
                  })
                ) : (
                  <div>

                  </div>
                )}
                <tr>
                        <td className="text-black font-weight-bold">
                          <strong>Order Total</strong>
                        </td>
                        <td className="text-black font-weight-bold">
                          <strong>${calculateTotal()}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
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

                  <div className="form-group">
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      onclick="window.location='thankyou.html'"

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
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </form> */}
      </div>
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
        patientId: id,
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

      

    
  };
}



  return (
  <div>
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




export default function() {
  const navigate = useNavigate();
  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
  const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const { id } = useParams();
  const [cartData, setCartData] = useState([]);
  const [medicationDetails, setMedicationDetails] = useState([]);
  const [editedQuantity, setEditedQuantity] = useState({});
  const [activeStep, setActiveStep] = useState(0);
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
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
const [currentImage, setCurrentImage] = useState(I2);

const [passwords, setPasswords] = useState({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
});
const [success, setSuccess] = useState(false); 
const handleChange = (prop) => (event) => {
  setPasswords({ ...passwords, [prop]: event.target.value });
  setSuccess(false); 
};  const handleCloseChangePassword = () => {
  setChangePasswordOpen(false);
};  const handleOpenChangePassword = () => {
  setChangePasswordOpen(true);
};
const handleSubmit = (event) => {
  event.preventDefault();
  
  setSuccess(false);

  
  if (passwords.newPassword !== passwords.confirmNewPassword) {
    alert("New passwords don't match.");
    return;
  }

  if (!isValidPassword(passwords.newPassword)) {
    alert("Password must contain at least one capital letter, one number, and be at least 4 characters long.");
    return;
  }

  console.log('Passwords submitted:', passwords);
  
  
  
  setSuccess(true);

 
  updatePassword(passwords.newPassword)
  alert("Password changed successfully");
};

const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
  return regex.test(password);
};

const updatePassword = async (newPassword) => {
  try {
    // Replace '/api/reset-password' with your actual API endpoint
    const response = await axios.put('http://localhost:3000/changepassword', { id, newPassword });
    console.log(response.data);
    alert('Password successfully updated');
  } catch (error) {
    console.error('Error updating password:', error);
    alert('Error updating password');
  }
};
  
  const toggleImage = () => {
    setCurrentImage((prevImage) => (prevImage === I2 ? I3 : I2));
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
      patientId: id,
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
const imageStyle = {
  width: '100px', // Set the desired width for the images
  height: '100px', // Set the desired height for the images
};
  return (
    <div>
    <title>MetaCare </title>
    <nav className="navbar py-4 navbar-expand-lg ftco_navbar navbar-light bg-light flex-row">
        <div className="container"  >
          <div className="row no-gutters d-flex align-items-start align-items-center px-3 px-md-0">
            <div className="col-lg-2 pr-4 align-items-center">
              <a className="navbar-brand">
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
        
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item " style={{marginRight:"10px"} }>
                <a  className="nav-link pl-0"  style={{cursor:"pointer" } } onClick={() => navigate(`/pharm-patient-home/${id}`)}>
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
                  style={{cursor:"pointer" } }
                  id="doctorsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={setShowPersonalDropdown}
                >
                  Store
                </a>
                <div
                  className={`dropdown-menu ${
                    showPersonalDropdown ? 'show' : ''
                  }`}
                  aria-labelledby="personalDropdown"
                >
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/patient-meds/${id}`)}>
                    Products
                  </a>
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/Order/${id}`)}>
                    My Orders
                  </a>
                  
                </div>
              </li>
              {/* New dropdown for Doctors */}
             
              
              {/* Profile dropdown */}
              
    
<li
  className="nav-item dropdown "
  onMouseEnter={() => setShowProfileDropdown(true)}
  onMouseLeave={() => setShowProfileDropdown(false)}
  style={{marginLeft:"850px"}}
>
  <a style={{cursor:"pointer" } }
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
    <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={handleOpenChangePassword}>
      Change Password
    </a>
    <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
              onClick={() => navigate(`/clinic`)}>
      Logout
    </a>
  </div>
</li>
<li className="nav-item active " >
                <a  className="nav-link pl-0"  style={{cursor:"pointer" } } onClick={() => navigate(`/Cart/${id}`)}>
                <FaShoppingBasket style={{ fontSize: '20px'}} />
                </a>
              </li>

{/* Wallet icon without dropdown */}
<li className="nav-item ">
<WalletModal/>
</li>


            </ul>
          </div>
        </div>
      </nav>

      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />} style={{margin:"80px"}}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 ? (
          <div>

          <CartStep
            selectedAddress={selectedAddress}
            deliveryAddresses={deliveryAddresses}
            onAddressChange={handleAddressChange}
            onAddAddress={handleAddAddress}
          />
          
          <div className="row">
          <div className="col-md-12" style={{display:"flex",alignContent:"flex-end",justifyContent:"flex-end"}}>

              <button
              display={"flex"} justifyContent={"flex-end"} style={{margin:"50px",padding:"20px",width:"230px",height:"50px",borderRadius:"80px", justifyContent:"center", alignItems:"center", display:"flex",}}
                className="btn btn-primary btn-block"
                onClick={handleNext}
                disabled={isLastStep }
              >
                Proceed to {activeStep==1 ? 'Payment' : 'Checkout'}
              </button>
              
            </div>
            
          </div>
          </div>
        ) : activeStep === 1 ? (
          <AddressStep
            selectedAddress={selectedAddress}
            deliveryAddresses={deliveryAddresses}
            onAddressChange={handleAddressChange}
            onAddAddress={handleAddAddress}
          />
        ) : (
          <PaymentStep />
          
        )
        
        }
        
        
      </div>
      
      <div className="row" >
            
          </div>
  

   {/* Change Password pop-up */}
   <Modal
        open={isChangePasswordOpen}
        onClose={handleCloseChangePassword}
        aria-labelledby="change-password-popup"
      >
        <Box
          sx={{
            marginTop: '15%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '400px',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h4" component="div" sx={{ color: '#007bff' , fontWeight: 'bold', textAlign: 'center'}}>
              Change Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                autoComplete="new-password"
                value={passwords.newPassword}
                onChange={handleChange('newPassword')}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmNewPassword"
                label="Confirm New Password"
                type="password"
                id="confirmNewPassword"
                autoComplete="new-password"
                value={passwords.confirmNewPassword}
                onChange={handleChange('confirmNewPassword')}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
</div>
  );
}