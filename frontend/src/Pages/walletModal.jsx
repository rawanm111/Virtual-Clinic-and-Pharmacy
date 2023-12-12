import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Popover, Typography, Container,CssBaseline } from '@mui/material';
import { ChakraProvider } from '@chakra-ui/react'
import { Modal2, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure} from '@chakra-ui/react';

import { useParams } from 'react-router-dom';
import { FaWallet } from 'react-icons/fa';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 



export default function WalletModal() {
    const [walletBalance, setWalletBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const { id } = useParams();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    
    
    useEffect(() => {
      // Fetch user's wallet balance and transaction history
      axios.get(`http://localhost:3000/wallet/${id}`)
        .then((response) => {
          console.log(response.data)
          if (response.data) {
            setWalletBalance(response.data.balance );
            setTransactions(response.data.transactions || []);
          }
        })
        .catch((error) => {
          console.error('Error fetching wallet data:', error);
        });
    }, [id]);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)
  
    return (
      <>
        <Button onClick={handleOpen} style={{marginTop:"20%"}}>
        <FaWallet style={{ fontSize: '20px', marginRight: '5px' ,color:"black"}} />
        </Button>
        

<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      MY WALLET
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    Current Balance: ${walletBalance}
    </Typography>
  </Box>
</Modal>
      </>
    )
  }
