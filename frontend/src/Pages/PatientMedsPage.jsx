import AppbarPatientPharmacy from '../Components/Appbar/AppbarPatientPharmacy';
import './AdminMedsPage.css'
import MedicationTablePatient from '../Components/MedicationTablePatient'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function PatientMedsPage() {
  
  return (
    <div > 
      <AppbarPatientPharmacy userName="Gera"></AppbarPatientPharmacy>
      <p className="centered-text">Available Medications</p>
      <MedicationTablePatient /> 
    </div>
  );
}

export default PatientMedsPage;