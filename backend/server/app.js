const express = require('express');
const mongoose = require('mongoose');
<<<<<<< HEAD
const bodyParser = require('body-parser');
=======
>>>>>>> origin/marwan
const medsRoutes = require('./Routes/medsroutes'); 
const DoctorRoutes = require('./Routes/DoctorRoutes');
const PharmacistRoutes = require('./Routes/PharmacistRoutes');
const PatientRoutes = require('./Routes/PatientRoutes');
const AppsRoutes= require('./Routes/appointementsrouter')
const healthPackageRoutes = require('./Routes/HealthPackageRoutes');
const drReqRoutes = require('./Routes/drReqRoutes')
const pharmcistReqRoutes = require('./Routes/pharmcistReqRoutes');
const FamilyMemberRoutes = require('./Routes/FamilyMemberRoutes');
const HealthRecRoutes = require('./Routes/HealthRecRoutes.js');
const PrescriptionRoutes = require('./Routes/PrescriptionRoutes.js');
const Adminroutes = require('./Routes/Adminroutes.js');
<<<<<<< HEAD
const Admin = require('./Models/Admin');
=======
>>>>>>> origin/marwan
const cors = require('cors');

const app = express();

const allowedOrigins = ['http://localhost:3001'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());
<<<<<<< HEAD
app.post('/login', async (req, res) => {
  try {
    // Find the admin by username
    const admin = await Admin.findOne({ username: req.body.username });

    // If admin not found, send an error message
    if (!admin) {
      return res.status(407).json({ success: false, message: 'Admin not found' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(req.body.password, admin.password);
    
    // If the password matches, respond with success
    if (isMatch) {
      res.json({ success: true, message: 'Logged in successfully' });
    } else {
      // If the password does not match, send an error message
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    // Handle any other errors
    res.status(500).send("error from server");
  }
});
=======

>>>>>>> origin/marwan
app.use('/meds', medsRoutes);
app.use('/doctors', DoctorRoutes);
app.use('/pharmacists', PharmacistRoutes);
app.use('/patients', PatientRoutes);
app.use('/apps', AppsRoutes);
app.use('/health-packages', healthPackageRoutes);
app.use( '/api/drReq',drReqRoutes);
app.use( '/api/pharmcistReq',pharmcistReqRoutes);
app.use('/family_members', FamilyMemberRoutes);
app.use('/HealthRecords',HealthRecRoutes);
app.use('/Prescription',PrescriptionRoutes);
app.use('/admin',Adminroutes);

<<<<<<< HEAD

=======
>>>>>>> origin/marwan
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
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
<<<<<<< HEAD
});
=======
});
>>>>>>> origin/marwan
