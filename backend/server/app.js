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
const Adminroutes = require('./Routes/Adminroutes.js');
const wallet = require('./Routes/walletRoutes');
const walletDoc=require('./Routes/walletRoutesDoc.js')
const CartRoutes = require('./Routes/CartRoutes'); 
const AddressRoutes=require('./Routes/Adressroutes.js')
const medicalHistoryRoutes = require('./Routes/medHistoryRoutes');
const authroutes = require('./Routes/authenticationRoutes');
const cors = require('cors');
const meds = require('./Models/meds.js');

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
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const appointment = require('./Models/appointements');
const { cp } = require('fs');
const storeItems = new Map([
  [1, { priceInCents: 10000, name: "kk" }],
  [2, { priceInCents: 20000, name: "karol" }]
]);

app.post('/payment', async (req, res) => {
  try {
    const appId = req.body.appId;
    const app = await appointment.findById(appId).populate('doctor');
console.log(appId); 
    if (!app) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const lineItem = {
      price_data: {
        currency: 'usd',
        product_data: {
          name: app._id.toString(),
        },
        unit_amount: 200,
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
      success_url: `http://localhost:3001/clinic-patient-home/${appId}`,
      cancel_url: `http://localhost:3001/clinic-patient-home/${appId}`,
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
          unit_amount: medication.medicationId.price,
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
      success_url: `http://localhost:3001/pharm-patient-home/:${cartId}`,
      cancel_url: `http://localhost:3001/pharm-patient-home/:${cartId}`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


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
});
