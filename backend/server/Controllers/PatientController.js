const patientModel = require('../Models/patients');
const Appointment = require('../Models/appointements');
const Doctor = require('../Models/doccs');
const FamilyMember = require('../Models/FamilyMember'); 
const patients = require('../Models/patients');

exports.createPatient = async (req, res) => {
  try {
    const newPatient = new patientModel(req.body);
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    res.status(500).json(err);
  }
};

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
