
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AppBarComponent from '../Components/Appbar/AppbarDoctor';


export default function AppTable() {
  const [apps, setApps] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [dateFilterStart, setDateFilterStart] = useState(null);
  const [dateFilterEnd, setDateFilterEnd] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/apps')
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id,
            Pid: item.pid,
            Did: item.did,
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

  const columns = [
    { field: 'Pid', headerName: 'Patientid', width: 200 },
    { field: 'Did', headerName: 'Docid', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'date', headerName: 'Date', width: 200 },
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

  return (
    <Box sx={{ height: '100%', width: '80%', margin: 5 }} bgcolor="#daf4ff">
      <AppBarComponent />
      <h1>Appointments</h1>
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
          label="Start Date"
          type="date"
          variant="outlined"
          value={dateFilterStart ? dateFilterStart.toISOString().split('T')[0] : ''}
          onChange={(e) => setDateFilterStart(new Date(e.target.value))}
        />
        <TextField
          label="End Date"
          type="date"
          variant="outlined"
          value={dateFilterEnd ? dateFilterEnd.toISOString().split('T')[0] : ''}
          onChange={(e) => setDateFilterEnd(new Date(e.target.value))}
        />
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
    </Box>
  );
}

