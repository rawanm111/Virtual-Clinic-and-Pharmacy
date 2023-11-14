import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AppbarPatientPharmacy from '../Components/Appbar/AppbarPatientPharmacy';

function OrderPage() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [medicationNames, setMedicationNames] = useState([]);

  useEffect(() => {
    // Fetch order details from the backend based on the order ID
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Order/orders/${id}`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const cancelOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:3000/Order/cancel-order/${orderId}`);
      setOrderDetails(prevOrder => ({ ...prevOrder, status: 'cancelled' }));
      window.location.reload();
    } catch (error) {
      console.error('Error canceling order:', error);
      // Log the server response
    }
  };
  

 

  return (
    <div>
      <AppbarPatientPharmacy userName="Gera" />
      <p className="centered-text">Your Order Details</p>

      {Array.isArray(orderDetails) && orderDetails.map((order, index) => (
        <Card key={order._id}>
          <CardContent>
            <Typography variant="h5" component="div">
              Order Status: {order.status}
            </Typography>

            {order.items.length > 0 && order.items.map((item, itemIndex) => (
              <div key={item._id}>
                <Typography variant="h6" component="div">
                  Medication: {item.name}
                </Typography>
                <Typography component="div">
                  Quantity: {item.quantity}
                </Typography>
                <Typography component="div">
                  Price: {item.price}
                </Typography>
              </div>
            ))}

            <Typography variant="body1" component="div">
              Address: {order.address}
            </Typography>
            
            
            <Button
    variant="outlined"
    onClick={() => cancelOrder(order._id)}
  >
    Cancel Order
  </Button>


            
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default OrderPage;
