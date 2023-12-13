import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {  Box } from '@mui/material';
function EmploymentContracts() {
  const [employmentContract, setEmploymentContract] = useState({});
  const { userId } = useParams();
  const doctorId = userId;
  const navigate = useNavigate();

  const fetchEmploymentContract = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/employmentContract/details/${doctorId}`);
      setEmploymentContract(response.data);
    } catch (error) {
      console.error('Error fetching employment contract:', error);
    }
  };

  const handleAcceptContract = async () => {
    try {
      await axios.put(`http://localhost:3000/employmentContract/updateStatus/${doctorId}`);
      navigate('/clinic');
    } catch (error) {
      console.error('Error accepting employment contract:', error);
    }
  };

  const handleRejectContract = () => {
    navigate('/clinic');
  };

  useEffect(() => {
    fetchEmploymentContract();
  }, [doctorId]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh', // Adjust the height as needed
        width: '100%',
        marginTop: '15%', // Adjust the margin from the top
    }}
  >
     <div className="col-md-10" key={employmentContract._id} style={{ marginBottom: '40px' }}>
     <div className="pricing-entry pb-5 text-center" style={{ borderRadius: '8px', height: '100%'}}>
     <p>
         <span className="price">EMPLOYMENT CONTRACT</span>
       </p>
       <p>
         <span className="price">Doctor:</span>
       </p>
       <h5 className="mb-2"> {employmentContract.employeeName || 'Unknown Doctor'}</h5>
       <p>
         <span className="price">Job Title:</span>
       </p>
       <h5 className="mb-2"> {employmentContract.jobTitle || 'N/A'} </h5>
       <p>
         <span className="price">Start Date:</span>
       </p>
       <h5 className="mb-2"> {employmentContract.startDate || 'N/A'} </h5>
       <p>
         <span className="price">Salary:</span>
       </p>
       <h5 className="mb-2">  {employmentContract.salary || 'N/A'} </h5>
       <p>
         <span className="price">Status:</span>
       </p>
       <h5 className="mb-2">  {employmentContract.status || 'N/A'} </h5>
       <p className="button text-center">
         <Button
           variant="contained"
           color="primary"
           className="btn btn-primary px-4 py-3"
           onClick={handleAcceptContract}
         >
           Accept Contract
         </Button>

         <Button
    variant="contained"
    color="primary"
    className="btn btn-primary px-4 py-3"
    onClick={handleRejectContract}
    style={{ marginLeft: '5%' }} // Adjust the margin as needed
  >
    Reject Contract
  </Button>
       </p>
     </div>
   </div> </Box>
  )
}

export default EmploymentContracts;
