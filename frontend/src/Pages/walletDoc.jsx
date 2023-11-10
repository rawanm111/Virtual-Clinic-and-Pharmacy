import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Popover, Typography, Container,CssBaseline } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AppBarComponent from '../Components/Appbar/AppbarPatientClinc';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useParams } from 'react-router-dom';




const WalletPage = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const { id } = useParams();

  
  const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: 'white',
    },
  });
  
  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      color: 'rgba(255, 255, 255, 0.7)',
      '&.Mui-selected': {
        color: '#fff',
      },
      '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
      },
    }),
  );
  useEffect(() => {
    // Fetch user's wallet balance and transaction history
    axios.get(`http://localhost:3000/walletDoc/${id}`)
      .then((response) => {
        console.log(response.data)
        if (response.data) {
          setWalletBalance(response.data.balance || 10);
          setTransactions(response.data.transactions || []);
        }
      })
      .catch((error) => {
        console.error('Error fetching wallet data:', error);
      });
  }, [id]);

  return (
    <div>
        <AppBarComponent />
      <React.Fragment>
      <CssBaseline />
      <Container >
        <Box sx={{ bgcolor: 'white', height: '15vh',width:'100%' }} />
        <div class="container" style={{textAlign:"center"}}>
        <h1>MY WALLET</h1>
        <h3>Current Balance: ${walletBalance}</h3>
        
        </div>
      </Container>
    </React.Fragment>

      <Box sx={{ width: '100%' }}>

      <Box sx={{ bgcolor: '#add8e6' }}>
        <StyledTabs
          value={walletBalance}
        //   onChange={handleChange}
          aria-label="styled tabs example"
          
        >
          <StyledTab label="Earn" />
          <StyledTab label="Spent" />
        </StyledTabs>
        <Box sx={{ p: 3,height:"60vh" }} />
      </Box>
    </Box>
      <h1>Wallet Page</h1>
      <p>Wallet Balance: ${walletBalance}</p>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.type === 'debit' ? 'Debit' : 'Credit'} - ${transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default WalletPage;


