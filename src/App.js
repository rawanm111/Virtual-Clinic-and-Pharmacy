// import React from 'react';
// import './App.css';
// import DataTable from '../src/pages/pharmacists';
// import Avatar from '@mui/material/Avatar';


// function App() {

//   return (
//     <div className="DataTable" style={{margin:"20px"}}>
//     <Avatar>H</Avatar>
//     <h1>Patients</h1>
//     <DataTable /> 
//   </div>
//   );
// }

// export default App;


// Require and configure dotenv to load environment variables from .env file
// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();

// //to be able to understand the json files in requests
// app.use(express.json());

// // MongoDB Configuration
// const connectionString = process.env.MONGODB_URI ;
// mongoose.connect(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Routes
// const DoctorRoutes = require('./Routes/DoctorRoutes');


// // Define routes for the application
// app.use('/doctors', DoctorRoutes);


// // Start the server on port
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });













const express = require('express');
const mongoose = require('mongoose');
const DoctorRoutes = require('./Routes/DoctorRoutes'); 
const PharmacistRoutes = require('./Routes/PharmacistRoutes'); 
const PatientRoutes = require('./Routes/PatientRoutes'); 


const app = express();

app.use(express.json());

// app.use('/doctors', DoctorRoutes);
// app.use('/pharmacists', PharmacistRoutes);
app.use('/patients', PatientRoutes);



// MongoDB Configuration
const connectionString = "mongodb+srv://TheTeam:AclProj@aclpharmdb.ukxxvcp.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start the server on port
const PORT = 2002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});