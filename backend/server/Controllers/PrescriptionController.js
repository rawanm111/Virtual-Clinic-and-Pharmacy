const Prescription = require('../Models/Prescription');
const Appointments = require('../Models/appointements');
const Patient = require('../Models/patients');

// Create a new Prescription
exports.createPrescription = async (req, res) => {
  try {
    const { Date, Patient, Doctor, filled, medicines } = req.body;
    
    const newPrescription = new Prescription({
      Date,
      Patient,
      Doctor,
      filled,
      medicines, 
    });

    const saved = await newPrescription.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
};



// Get all Prescriptions with populated Doctor and Patient details
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptionData = await Prescription.find()
      .populate('Doctor', 'fullName')
      .populate('Patient', 'patientName')
      .populate('medicines.medicine', 'name'); // Populate medicine details

    res.status(200).json(prescriptionData);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a Prescription
exports.updatePrescription = async (req, res) => {
  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPrescription);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a Prescription
exports.deletePrescription = async (req, res) => {
  try {
    await Prescription.findByIdAndRemove(req.params.id);
    res.status(200).json('The Prescription has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.getPrescriptionsForDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    // Fetch appointments for the doctor
    const appointments = await Appointments.find({ doctor: doctorId });

    // Extract patient IDs from appointments
    const patientIds = appointments.map(appointment => appointment.patient);

    // Fetch prescriptions for the patients with appointments
    const prescriptions = await Prescription.find({ Patient: { $in: patientIds } })
      .populate('Doctor', 'fullName')
      .populate('medicines.medicine', 'name');

    res.status(200).json(prescriptions);
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.getPrescriptionsForPatient = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    // Check if the patient exists
    const patientExists = await Patient.findById(patientId);
    if (!patientExists) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Fetch prescriptions for the specified patient
    const prescriptions = await Prescription.find({ Patient: patientId })
      .populate('Doctor', 'fullName')
      .populate('medicines.medicine', 'name');

    res.status(200).json(prescriptions);
  } catch (err) {
    res.status(500).json(err);
  }
};