import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminMedsPage from './Pages/AdminMedsPage'
import PatientMedsPage from './Pages/PatientMedsPage'
import PharmacistMedsPage from './Pages/PharmacistMedsPage'
import DoctorProfile from './Pages/DoctorProfile';
import PatientProfile from './Pages/PatientProfile';
import PharmacistProfile from './Pages/PharmacistProfile';
import AddMed from './Pages/addMed';
import UpdatePatient from "./Pages/UpdateProfilePatient";
import UpdateDoctor from "./Pages/UpdateProfileDoc";
import UpdatePharmacist from "./Pages/UpdateProfilePharm";
import StartPage from "./Pages/StartPage";
import LoginPageclinic from  "./Pages/LoginPageclinic";
import LoginPagepharmacy from  "./Pages/LoginPagepharmacy";
import PatientRegistrationHome from "./Pages/PatientRegistrationHome";
import PatientRegistrationHomePharm from "./Pages/PatientRegistrationHomePharm";
import DoctorRegistrationHome from "./Pages/DoctorRegistrationHome";
import PharmRegistrationHome from "./Pages/PharmacistRegistrationHome";
import DoctorHome from  "./Pages/DoctorHome";
import PatientHomeClinic from  "./Pages/PatientHomeClinic";
import PatientHomePharmacy from "./Pages/PatientHomePharmacy";
import PharmacistHome from "./Pages/PharmacistHome";
import AdminHome from  "./Pages/AdminHome";
import PatientsTable from "./Pages/PatientsTable";
import DoctorsTable from "./Pages/DoctorsTable";
import UserManagement from "./Pages/UserManagement";
import HealthPackages from "./Pages/HealthPackagesPage";
import NewPackage from "./Pages/NewPackagePage";
import UpdatePackage from "./Pages/UpdatePackage";

export default function Paths() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/clinic" element={<LoginPageclinic />} />
        <Route path="/pharm" element={<LoginPagepharmacy />} />
        <Route path="/patientreg" element={<PatientRegistrationHome />} />
        <Route path="/pharmreg" element={<PharmRegistrationHome />} />
        <Route path="/patientregpharm" element={<PatientRegistrationHomePharm />} />
        <Route path="/docreg" element={<DoctorRegistrationHome />} />
        <Route path="/doc-home" element={<DoctorHome />} />
        <Route path="/clinic-patient-home" element={<PatientHomeClinic />} />
        <Route path="/pharm-patient-home" element={<PatientHomePharmacy />} />
        <Route path="/pharm-home" element={<PharmacistHome />} />
        <Route path="/admin-home" element={<AdminHome />} />
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
        <Route path="/doctorsTable" element={<DoctorsTable />} />
        <Route path="/patientsTable" element={<PatientsTable />} />
        <Route path="/userManagement" element={<UserManagement />} />
        <Route path="/health-packages" element={<HealthPackages />} />
        <Route path="/new-package" element={<NewPackage />} />
        <Route path="/update-package/:id" element={<UpdatePackage />} /> 

      </Routes>
    </Router>
  );
}


