// import React, { useState } from 'react';
// import axios from 'axios';
// import { TextField, Button, Container, Typography, Box } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

//  function AdminForm() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   const handleSubmit = () => {
//     axios.post('http://localhost:3000/admin', formData)
//       .then(response => {
//         console.log('Response:', response.data);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <Box
//       style={{
//         backgroundColor: 'lightblue',
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Container
//         maxWidth="sm"
//         style={{
//           padding: '2rem',
//           backgroundColor: 'rgba(255, 255, 255, 0.8)',
//           borderRadius: '15px',
//         }}
//       >
//         <Typography variant="h4" gutterBottom align="center">
//           Admin Form
//         </Typography>
//         <div style={{ marginBottom: '1rem' }}>
//           <TextField
//             fullWidth
//             label="Username"
//             variant="outlined"
//             name="username"
//             value={formData.username}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div style={{ marginBottom: '1rem' }}>
//           <TextField
//             fullWidth
//             label="Password"
//             variant="outlined"
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//           />
//         </div>
//         <Button variant="contained" color="primary" startIcon={<LockOutlinedIcon />} onClick={handleSubmit}>
//           Add Admin
//         </Button>
//       </Container>
//     </Box>
//   );
// }

// export default AdminForm;

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function AdminForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = () => {
    axios.post('http://localhost:3000/admin', formData) // Use '/admin' for the POST request
      .then(response => {
        console.log('Response:', response.data);

        
        // Reset the form or display a success message as needed
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors or display an error message
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box
      style={{
        backgroundColor: 'lightblue',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="sm"
        style={{
          padding: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '15px',
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Admin Form
        </Typography>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <Button variant="contained" color="primary" startIcon={<LockOutlinedIcon />} onClick={handleSubmit}>
          Add Admin
        </Button>
      </Container>
    </Box>
  );
}

export default AdminForm;
