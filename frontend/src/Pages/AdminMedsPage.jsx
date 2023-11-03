import AppbarAdmin from '../Components/Appbar/AppbarAdmin';
import './AdminMedsPage.css'
import MedicationTable from '../Components/MedicationTable'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function AdminMedsPage() {
  
  return (
    <div > 
      <AppbarAdmin userName="Gera"></AppbarAdmin>
      <p className="centered-text">Available Medications</p>
      <MedicationTable /> 
    </div>
  );
}

export default AdminMedsPage;