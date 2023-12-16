import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ChangePasswordModal = ({ open, handleClose, handleSubmit, passwords, handleChange }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Typography variant="h4" sx={{ color: '#007bff', fontWeight: 'bold', textAlign: 'center' }}>
          Change Password
        </Typography>
        <form onSubmit={handleSubmit}>
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
            onChange={(e) => handleChange('newPassword')(e)}
          />
          {/* Add the rest of your input fields here */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Change Password
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
