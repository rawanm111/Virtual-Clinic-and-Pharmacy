import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminMedsPage from './Pagess/AdminMedsPage'
import PatientMedsPage from './Pagess/PatientMedsPage'
import PharmacistMedsPage from './Pagess/PharmacistMedsPage'
import DoctorProfile from './Pagess/DoctorProfile';
import PatientProfile from './Pagess/PatientProfile';
import PharmacistProfile from './Pagess/PharmacistProfile';
import AddMed from './Pagess/addMed';
import UpdatePatient from "./Pagess/UpdateProfilePatient";
import UpdateDoctor from "./Pagess/UpdateProfileDoc";
import UpdatePharmacist from "./Pagess/UpdateProfilePharm";

export default function Paths() {
  return (
    <Router>
      <Routes>
        <Route path="/admin-meds" element={<AdminMedsPage />} />
        <Route path="/patient-meds" element={<PatientMedsPage />} />
        <Route path="/pharm-meds" element={<PharmacistMedsPage />} />
        <Route path="/doc-profile" element={<DoctorProfile />} />
        <Route path="/patient-profile" element={<PatientProfile />} />
        <Route path="/pharm-profile" element={<PharmacistProfile />} />
        <Route path="/new-med" element={<AddMed />} />
        <Route path="/update-patient/:username" element={<UpdatePatient />} />
        <Route path="/update-doctor/:username" element={<UpdateDoctor />} />
        <Route path="/update-pharmacist/:username" element={<UpdatePharmacist />} />
      </Routes>
    </Router>
  );
}

