import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AppBarComponent from '../Components/Appbar/AppbarDoctor';
import { useParams } from 'react-router-dom';

export default function AppTable() {
  const [apps, setApps] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [dateFilterStart, setDateFilterStart] = useState(null);
  const [dateFilterEnd, setDateFilterEnd] = useState(null);
  const [newAppointmentDateTime, setNewAppointmentDateTime] = useState('');
  const [followUpDateTime, setFollowUpDateTime] = useState('');
  const [followUpPatientName, setFollowUpPatientName] = useState('');
  const [appointmentStatus, setAppointmentStatus] = useState('');
  const currentDate = new Date();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/apps/doctor/${id}`)
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id,
            PatientName: item.patient ? item.patient.fullName : 'Not Assigned Yet',
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
  }, [id]);

  const isDateTimeValid = (selectedDateTime) => {
    return selectedDateTime >= currentDate;
  };

  const handleAddAppointment = () => {
    if (isDateTimeValid(new Date(newAppointmentDateTime))) {
      const newAppointment = {
        patient: null,
        doctor: id,
        status: 'Available',
        date: new Date(newAppointmentDateTime),
      };

      axios.post('http://localhost:3000/apps', newAppointment)
        .then((response) => {
          console.log('New appointment created:', response.data);
          axios.get(`http://localhost:3000/apps/doctor/${id}`)
            .then((response) => {
              if (response.data) {
                const transformedData = response.data.map((item) => ({
                  id: item._id,
                  PatientName: item.patient ? item.patient.fullName : 'Not Assigned Yet',
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
          console.error('Error creating appointment:', error);
        });
    } else {
      console.error('Selected date is before the current date');
    }
  };

  const handleBookFollowUpAppointment = () => {
    if (isDateTimeValid(new Date(followUpDateTime))) {
      const followUpAppointment = {
        doctor: id,
        patientName: followUpPatientName,
        date: new Date(followUpDateTime),
      };
      axios.post('http://localhost:3000/apps/create-upcoming-appointment', followUpAppointment)
        .then((response) => {
          console.log('Follow-up appointment created:', response.data);
          axios.get(`http://localhost:3000/apps/doctor/${id}`)
            .then((response) => {
              if (response.data) {
                const transformedData = response.data.map((item) => ({
                  id: item._id,
                  PatientName: item.patient ? item.patient.fullName : 'Not Assigned Yet',
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
          console.error('Error creating follow-up appointment:', error);
        });
    } else {
      console.error('Selected date is before the current date');
    }
  };

  const columns = [
    { field: 'PatientName', headerName: 'Patient Name', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'date', headerName: 'Date', width: 200 },
  ];

  const handleFilterChange = () => {
    const filteredApps = apps.filter((app) => {
      const statusCondition =
        !appointmentStatus || app.status.toLowerCase() === appointmentStatus.toLowerCase();

      const dateCondition =
        !dateFilterStart || !dateFilterEnd || (app.date >= dateFilterStart && app.date <= dateFilterEnd);

      return statusCondition && dateCondition;
    });

    setFilteredRows(filteredApps);
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
        <TextField
          select
          label="Status"
          value={appointmentStatus}
          onChange={(e) => setAppointmentStatus(e.target.value)}
          variant="outlined"
          sx={{ minWidth: '150px' }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="upcoming">Upcoming</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
          <MenuItem value="rescheduled">Rescheduled</MenuItem>
          <MenuItem value="available">Available</MenuItem>
        </TextField>
        <Button variant="contained" onClick={handleFilterChange}>
          Filter
        </Button>
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
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
        <p>Add Available Time Slot for appointments : </p>
        <TextField
          type="datetime-local"
          variant="outlined"
          value={newAppointmentDateTime}
          onChange={(e) => setNewAppointmentDateTime(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleAddAppointment}
          disabled={!isDateTimeValid(new Date(newAppointmentDateTime))}
        >
          Add Date
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          gap: '16px',
          padding: '10px',
        }}
      >
        <p>Book follow-up appointment with a patient : </p>
        <TextField
          type="datetime-local"
          variant="outlined"
          value={followUpDateTime}
          onChange={(e) => setFollowUpDateTime(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Patient Name"
          value={followUpPatientName}
          onChange={(e) => setFollowUpPatientName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleBookFollowUpAppointment}
          disabled={!isDateTimeValid(new Date(followUpDateTime))}
        >
          Book
        </Button>
      </Box>
    </>
  );
}

