import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AppBarComponent from '../Components/Appbar/AppbarPatientClinc';
import { useParams } from 'react-router-dom';

export default function AppTableP() {
  const [apps, setApps] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [availableApps, setAvailableApps] = useState([]);
  const [dateFilterStart, setDateFilterStart] = useState(null);
  const [dateFilterEnd, setDateFilterEnd] = useState(null);
  const currentDate = new Date();
  const { id } = useParams();
  const [checkAvailabilityDate, setCheckAvailabilityDate] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/apps/patient/${id}`)
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id,
            DoctorName: item.doctor ? item.doctor.fullName : 'Doctor Not Found',
            status: item.status,
            date: new Date(item.date),
          }));
          setApps(transformedData);
          setFilteredRows(transformedData);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching apps:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3000/apps/available-appointments`)
      .then((response) => {
        if (response.data) {
          const availableData = response.data.map((item) => ({
            id: item._id,
            DoctorName: item.doctor ? item.doctor.fullName : 'Doctor Not Found',
            date: new Date(item.date),
          })).filter((item) => item.date >= currentDate);

          setAvailableApps(availableData);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching available appointments:', error);
      });
  }, []);

  const columns = [
    { field: 'DoctorName', headerName: 'Doctor Name', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'date', headerName: 'Date', width: 200 },
  ];

  const availableColumns = [
    { field: 'DoctorName', headerName: 'Doctor Name', width: 200 },
    { field: 'date', headerName: 'Date', width: 200 },
    {
      field: 'action',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleBookAppointment(params.row.id)}
        >
          Book Appointment
        </Button>
      ),
    },
  ];

  const handleFilterChange = () => {
    const filteredApps = apps.filter((app) => {
      if (!dateFilterStart || !dateFilterEnd) {
        return true;
      }
      return app.date >= dateFilterStart && app.date <= dateFilterEnd;
    });
    setFilteredRows(filteredApps);
  };

  const handleFilterChangeOne = () => {
    const checkDate = new Date(checkAvailabilityDate);
    const filteredAvailableApps = availableApps.filter((app) => {
      const appDate = app.date;
      return (
        appDate.getFullYear() === checkDate.getFullYear() &&
        appDate.getMonth() === checkDate.getMonth() &&
        appDate.getDate() === checkDate.getDate() &&
        appDate.getHours() === checkDate.getHours() &&
        appDate.getMinutes() === checkDate.getMinutes()
      );
    });
    setAvailableApps(filteredAvailableApps);
  };
  

  const handleBookAppointment = (appointmentId) => {
    const updatedAppointment = {
      patient: id,
      status: 'Upcoming',
    };

    axios.put(`http://localhost:3000/apps/${appointmentId}`, updatedAppointment)
      .then((response) => {
        console.log(`Booked appointment with ID: ${appointmentId}`);

        // After successfully booking, reload the available appointments
        axios.get(`http://localhost:3000/apps/available-appointments`)
          .then((response) => {
            if (response.data) {
              const availableData = response.data.map((item) => ({
                id: item._id,
                DoctorName: item.doctor ? item.doctor.fullName : 'Doctor Not Found',
                date: new Date(item.date),
              }));
              setAvailableApps(availableData);
            } else {
              console.error('No available appointments data received from the API');
            }
          })
          .catch((error) => {
            console.error('Error fetching available appointments:', error);
          });

        // After booking, also update 'My Appointments' list
        axios.get(`http://localhost:3000/apps/patient/${id}`)
          .then((response) => {
            if (response.data) {
              const transformedData = response.data.map((item) => ({
                id: item._id,
                DoctorName: item.doctor ? item.doctor.fullName : 'Doctor Not Found',
                status: item.status,
                date: new Date(item.date),
              }));
              setApps(transformedData);
              setFilteredRows(transformedData);
            } else {
              console.error('No data received from the API');
            }
          })
          .catch((error) => {
            console.error('Error fetching apps:', error);
          });
      })
      .catch((error) => {
        console.error('Error booking appointment:', error);
      });
  };

  return (
    <>
      <AppBarComponent />
      <h1>My Appointments</h1>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          gap: '16px',
          padding: '10px',
        }}
      >
        <TextField
          type="datetime-local"
          variant="outlined"
          value={checkAvailabilityDate}
          onChange={(e) => setCheckAvailabilityDate(e.target.value)}
        />
        <Button variant="contained" onClick={handleFilterChangeOne}>
          Check Availability
        </Button>
        <Button
        variant="contained"
        onClick={() => {
          setCheckAvailabilityDate('');
          
          axios.get(`http://localhost:3000/apps/available-appointments`)
            .then((response) => {
              if (response.data) {
                const availableData = response.data.map((item) => ({
                  id: item._id,
                  DoctorName: item.doctor ? item.doctor.fullName : 'Doctor Not Found',
                  date: new Date(item.date),
                })).filter((item) => item.date >= currentDate);
  
                setAvailableApps(availableData);
              } else {
                console.error('No data received from the API');
              }
            })
            .catch((error) => {
              console.error('Error fetching available appointments:', error);
            });
        }}
      >
        Reset
      </Button>
      </Box>
      

      <h2>Available Appointments</h2>
      <DataGrid
        rows={availableApps}
        columns={availableColumns}
        pageSize={5}
        checkboxSelection
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          gap: '16px',
          padding: '10px',
        }}
      >
        <TextField
          type="date"
          variant="outlined"
          value={dateFilterStart ? dateFilterStart.toISOString().split('T')[0] : ''}
          onChange={(e) => setDateFilterStart(new Date(e.target.value))}
        />
        <TextField
          type="date"
          variant="outlined"
          value={dateFilterEnd ? dateFilterEnd.toISOString().split('T')[0] : ''}
          onChange={(e) => setDateFilterEnd(new Date(e.target.value))}
        />
        <Button variant="contained" onClick={handleFilterChange}>
          Check My Appointments
        </Button>
      </Box>

      <h2>My Appointments</h2>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </>
  );
}
