
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const medsRoutes = require('./Routes/medsroutes'); 
const DoctorRoutes = require('./Routes/DoctorRoutes');
const PharmacistRoutes = require('./Routes/PharmacistRoutes');
const PatientRoutes = require('./Routes/PatientRoutes');
const AppsRoutes= require('./Routes/appointmentsRouter');
const healthPackageRoutes = require('./Routes/HealthPackageRoutes');
const drReqRoutes = require('./Routes/drReqRoutes')
const pharmcistReqRoutes = require('./Routes/pharmcistReqRoutes');
const HealthRecRoutes = require('./Routes/HealthRecRoutes.js');
const PrescriptionRoutes = require('./Routes/PrescriptionRoutes.js');
const Adminroutes = require('./Routes/AdminRoutes.js');
const wallet = require('./Routes/walletRoutes.js');
const walletDoc=require('./Routes/walletRoutesDoc.js')
const CartRoutes = require('./Routes/CartRoutes'); 
const AddressRoutes=require('./Routes/Adressroutes.js')
const medicalHistoryRoutes = require('./Routes/medHistoryRoutes');
const PatientPackagesRoutes = require('./Routes/PatientPackagesRoutes');
const authroutes = require('./Routes/authenticationRoutes');
const EmploymentContract= require('./Routes/EmploymentContractRoutes.js');
const OrderRoutes=require("./Routes/OrderRouter.js")
const FollowupRoutes= require('./Routes/followupsRouter');
const messageRoutes = require('./Routes/MessageRoutes');
const messageDocRoutes = require('./Routes/MessageDocRoutes');
const messagePharmPatRoutes = require('./Routes/MessagePharmPatRoutes');
const messagesPharmDocRoutes = require('./Routes/MessagePharmDocRoutes');



const cors = require('cors');
const http = require("http");
const { Server } = require("socket.io");


const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
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

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});


app.use(express.json());
app.use('/meds', medsRoutes);
app.use('/doctors', DoctorRoutes);
app.use('/pharmacists', PharmacistRoutes);
app.use('/patients', PatientRoutes);
app.use('/apps', AppsRoutes);
app.use('/health-packages', healthPackageRoutes);
app.use( '/api/drReq',drReqRoutes);
app.use( '/api/pharmcistReq',pharmcistReqRoutes);
app.use('/HealthRecords',HealthRecRoutes);
app.use('/Prescription',PrescriptionRoutes);
app.use('/admin',Adminroutes);
app.use('/login', authroutes);
app.use('/wallet', wallet);
app.use('/walletDoc', walletDoc);
app.use('/cart', CartRoutes);
app.use('/address',AddressRoutes);
app.use('/medHistory', medicalHistoryRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/admin',Adminroutes);
app.use('/', authroutes)
app.use('/employmentContract',EmploymentContract);
app.use("/Order",OrderRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/messagesDoc', messageDocRoutes);
app.use('/api/messagesPharmPat', messagePharmPatRoutes);
app.use('/api/messagesPharmDoc', messagesPharmDocRoutes);

app.use('/followup',FollowupRoutes);


const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const Packages = require('./Models/PatientPackages'); 
const healthPackage = require('./Models/HealthPackage');


const appointment = require('./Models/appointements');
const { cp } = require('fs');
const storeItems = new Map([
  [1, { priceInCents: 10000, name: "kk" }],
  [2, { priceInCents: 20000, name: "karol" }]
]);


app.post('/payment', async (req, res) => {
  try {
    const appId = req.body.appId;
    const price = req.body.price;
    const app = await appointment.findById(appId).populate('doctor');
    const patientId = req.body.patientId;
    console.log(price,"price");
    if (!app) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const lineItem = {
      price_data: {
        currency: 'usd',
        product_data: {
          name: app._id.toString(),
        },
        unit_amount: price * 100,
      },
      quantity: 1,
    };
    console.log(lineItem);
    // Calculate total amount in cents
    const totalAmountInCents = lineItem.price_data.unit_amount * lineItem.quantity;

    // Ensure the total amount is at least 50 cents
    if (totalAmountInCents < 50) {
      return res.status(400).json({
        error: "The Checkout Session's total amount must be at least 50 cents.",
      });
    }

    // Create a Stripe session for payment

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [lineItem],
      success_url: `http://localhost:3001/clinic-patient-home/${patientId}`,
      cancel_url: `http://localhost:3001/clinic-patient-home/${patientId}`,
    });


    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


const Cart = require('./Models/Cart'); 




///start

app.post('/paymentCart', async (req, res) => {
  try {

    const cartId = req.body.cartId;
    const cart = await Cart.findById(cartId).populate('medications.medicationId');
    const patientId = req.body.patientId;

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const lineItems = cart.medications.map((medication) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: medication.medicationId.name,
          },
          unit_amount: medication.medicationId.price *100,
        },
        quantity: medication.quantity,
      };
    });

    // Calculate total amount in cents
    const totalAmountInCents = lineItems.reduce((total, item) => {
      return total + item.price_data.unit_amount * item.quantity;
    }, 0);

    // Ensure the total amount is at least 50 cents
    if (totalAmountInCents < 50) {
      return res.status(400).json({
        error: "The Checkout Session's total amount must be at least 50 cents.",
      });
    }

    // Create a Stripe session for payment
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `http://localhost:3001/Thankyou/${patientId}`,
      cancel_url: `http://localhost:3001/Thankyou/${patientId}`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});




///start

app.post('/paymentPack', async (req, res) => {
  try {
    const packageId = req.body.packageId;
    const patientId = req.body.patientId;
    console.log(patientId);

    const healthPackageItem = await healthPackage.findById(packageId);

    if (!healthPackageItem) {
      return res.status(404).json({ error: 'Package not found' });
    }

    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: healthPackageItem.name,
          },
          unit_amount: healthPackageItem.annualPrice * 1000, // Amount should be in cents
        },
        quantity: 1,
      }
    ];

    // Create a Stripe session for payment
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `http://localhost:3001/clinic-patient-home/${patientId}`,
      cancel_url: `http://localhost:3001/clinic-patient-home/${patientId}`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.use('/login', authroutes)
app.use('/PatientPackages', PatientPackagesRoutes);



// Start the server on port
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});


const socketApp = express();
socketApp.use(cors());
const socketServer = http.createServer(socketApp);

const socketIo = new Server(socketServer, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  },
});

socketIo.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });
});

const SOCKET_PORT = 3002;
socketServer.listen(SOCKET_PORT, () => {
  console.log('Socket.io server is running on port 3001');
});

// MongoDB Configuration
const connectionString = 'mongodb+srv://TheTeam:AclProj@aclpharmdb.ukxxvcp.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});