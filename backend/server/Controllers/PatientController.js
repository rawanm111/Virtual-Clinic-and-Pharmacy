const patientModel = require('../Models/patients');
const Appointment = require('../Models/appointements');
const Doctor = require('../Models/doccs');
const walletModel = require('../Models/Wallet'); // Import the wallet model
const patients = require('../Models/patients');
const bcrypt = require('bcrypt');
const prescriptions = require('../Models/Prescription');
const PatientPackages = require('../Models/PatientPackages');
const healthPackage = require('../Models/HealthPackage');

exports.createPatient = async (req, res) => {
  try {
    // Create a new patient
    const newPatient = new patientModel(req.body);
    const savedPatient = await newPatient.save();

    // Create a wallet for the patient
    const newWallet = new walletModel({
      patient: savedPatient._id,
      balance: 0,
    });
    const savedWallet = await newWallet.save();

    // Associate the wallet with the patient
    savedPatient.wallet = savedWallet._id;
    await savedPatient.save();

    // Respond with the created patient
    res.status(201).json(savedPatient);
  } catch (err) {
    // Handle errors
    console.error(err);  // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createPatient = async (req, res) => {
  const {
    fullName,
    email,
    dateOfBirth,
    gender,
    mobileNumber,
    emergencyContactFullName,
    emergencyContactMobileNumber,
    emergencyContactRelationToPatient,
    password, 
    username,
  } = req.body;
  try {
 
      const salt = await bcrypt.genSalt(); 
      const hashedPassword = await bcrypt.hash(password, salt);
      const newPatient= new patientModel({
        username,
        fullName,
        email,
        dateOfBirth,
        gender,
        mobileNumber ,
        emergencyContactFullName ,
        emergencyContactMobileNumber,
        emergencyContactRelationToPatient,
        password: hashedPassword,
      });

      const newWallet = new walletModel({
        patient: newPatient._id, // Assuming patientModel has an _id field
        balance: 0, // You can set an initial balance if needed
      });
      // Save the wallet
      const savedWallet = await newWallet.save();
      // Update the patient with the wallet information
      newPatient.wallet = savedWallet._id;
      const savedPatient = await newPatient.save();
      res.status(200).json(savedPatient)
  } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message })
  } };

exports.getPatient = async (req, res) => {
  try {
    const patient = await patientModel.find();
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addFamilyMemberLinkedToPatient = async (req, res) => {

  const { emailOrPhone, relation} = req.body;

  try {
    // Find the current patient based on the logged-in user
    const currentPatient = await patients.findById(req.params.userid);

    if (!currentPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check if the patient already exists based on email or phone
    let patientMember = await patients.findOne({ $or: [{ email: emailOrPhone }, { mobileNumber: emailOrPhone }] });

    if (!patientMember) {
      return res.status(404).json({ message: 'no Patient with such email or phone number' });
    }

    // Add the family member to the current patient's record
    currentPatient.familyMembers.push({
      patient: patientMember._id,
      relation,
    });

    await currentPatient.save();

    return res.status(200).json(currentPatient);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};     

exports.updatePatient = async (req, res) => {
  const { username } = req.params;
  try {
    const updated = await patientModel.findOneAndUpdate(
      { username: username },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deletePatient= async (req, res) => {
  try {
    await patientModel.findByIdAndDelete(req.params.userid);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getPatientByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const patient = await patientModel.findOne({ username: username });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getPatientsByDoctorId = async (req, res) => {
  const { docId } = req.params; 
  try {
    const doctor = await Doctor.findById(docId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    const appointments = await Appointment.find({ doctor: doctor._id });
    const patientIds = appointments.map((appointment) => appointment.patient);
    const patients = await patientModel.find({ _id: { $in: patientIds } });
    return res.json(patients);
  } catch (error) {
    console.error('Error fetching patients by doctor:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getFamilyMembersForUser = async (req, res) => {
  try {
    const familyMembers = await patients.findById(req.params.id)
      .populate({
        path: 'familyMembers.patient',
        model: 'patients',
      })
      .select('familyMembers'); // Retrieve only familyMembers field

    if (!familyMembers) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(familyMembers.familyMembers);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};