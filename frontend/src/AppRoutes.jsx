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
import HealthPackagesMain from "./Pages/HealthPackagesPage";
import NewPackage from "./Pages/NewPackagePage";
import UpdatePackage from "./Pages/UpdatePackage";
import AdminRequestsD from "./Pages/AdminReqPageDoc";
import AdminRequestsP from "./Pages/AdminReqPagePharm";
import FamilyMember from "./Pages/DisplayPage";
import Form from "./Pages/Form";
import AppTable from "./Pages/appointmentsD";
import AppTableP from "./Pages/appointmentsP";
import AdminForm from "./Pages/adminform";
import Prescription from "./Pages/prescription";
import EmploymentContract from "./Pages/EmploymentContract";
import NewMedicalHistory from "./Pages/NewMedicalHistory";
import Wallet from "./Pages/wallet";
import WalletDoc from "./Pages/walletDoc";
import Cart from "./Pages/Cart";
// import MedHistory from "./Pages/medHistory";
import Order from './Pages/OrderPage'
import Walletclinic from './Pages/walletclinic'
import NewHealthRecordPage from "./Pages/NewHealthRecordPage"; 
import PatientHealthRecordsPage from "./Pages/PatientHealthRecordsPage"; 
import HealthRecords from "./Pages/HealthRecPage";
import MedHistoryDoc from "./Pages/MedHistoryDoc";
import HealthPackagesSub from "./Pages/HealthPackagesSub";
import HealthPackagesView from "./Pages/HealthPackagesView";
import Otp from "./Pages/otp";
import ChangePassword from "./Pages/changepassword";
import ChangePasswordTwo from "./Pages/changePasswordTwo";
import DoctorsPage from "./Pages/doctorsPage";
import PatientsPage from "./Pages/patientsPage";
import WalletModal from "./Pages/walletModal";
import User from "./Pages/UserManagemen";
import UserManagement from "./Pages/userManagement";
import MyFamily from "./Pages/myFam";
import MedHistoryPatient from "./Pages/MedHistoryPatient";
import MyCart from "./Pages/myCart";
import Thankyou from "./Pages/thankyou";





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
        <Route path="/doc-home/:id" element={<DoctorHome />} />
        <Route path="/clinic-patient-home/:id" element={<PatientHomeClinic />} />
        <Route path="/pharm-patient-home/:id" element={<PatientHomePharmacy />} />
        <Route path="/pharm-home/:id" element={<PharmacistHome />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin-meds" element={<AdminMedsPage />} />
        <Route path="/patient-meds/:id" element={<PatientMedsPage />} />
        <Route path="/pharm-meds/:id" element={<PharmacistMedsPage />} />
        <Route path="/doc-profile/:id" element={<DoctorProfile />} />
        <Route path="/patient-profile" element={<PatientProfile />} />
        <Route path="/pharm-profile" element={<PharmacistProfile />} />
        <Route path="/new-med" element={<AddMed />} />
        <Route path="/update-patient/:username" element={<UpdatePatient />} />
        <Route path="/update-doctor/:username" element={<UpdateDoctor />} />
        <Route path="/update-pharmacist/:username" element={<UpdatePharmacist />} />
        <Route path="/health-packages" element={<HealthPackagesMain />} />
        <Route path="/add-family-member/:id" element={<Form />} />
        <Route path="/new-package" element={<NewPackage />} />
        <Route path="/my-fam/:id" element={<FamilyMember />} /> 
        <Route path="/update-package/:id" element={<UpdatePackage />} /> 
        <Route path="/pharmacist-requests" element={<AdminRequestsP />} /> 
        <Route path="/doctor-requests" element={<AdminRequestsD />} /> 
        <Route path="/health-recs/:id" element={<HealthRecords />} /> 
        <Route path="/appPageDoc/:id" element={<AppTable />} /> 
        <Route path="/appPagePatient/:id" element={<AppTableP/>} /> 
        <Route path="/AdminForm" element={<AdminForm />} /> 
        <Route path="/Prescription/:id" element={<Prescription/>} />
        <Route path="/Cart/:id" element={<Cart/>}/>
        {/* <Route path="/MedHistory/:id" element={<MedHistory/>} />  */}
        <Route path="/HealthRecordPatient/:id" element={<PatientHealthRecordsPage/>} /> 
        <Route path="/healthRecs/:id" element={<MedHistoryDoc />} /> 
        <Route path="/new-HealthRecord" element={<NewHealthRecordPage />} />
        <Route path="/health-packages-sub/:id" element={<HealthPackagesSub />} />
        <Route path="/health-packages-VIEW/:id" element={<HealthPackagesView />} />
        <Route path="/Order/:id" element={<Order/>} /> 
        {/* <Route path="/walletclinic/:id" element={<Walletclinic/>} />  */}
        <Route path="/HealthRecordPatient/:id" element={<PatientHealthRecordsPage/>} /> 
        <Route path="/healthRecs/:id" element={<MedHistoryDoc />} /> 
        <Route path="/new-HealthRecord" element={<NewHealthRecordPage />} />
        <Route path="/Prescription/:id" element={<Prescription/>} /> 
        <Route path="/EmploymentContract/:userId" element={<EmploymentContract/>} /> 
        <Route path="/otp/:username" element={<Otp/>} />
        <Route path="/changepass/:username"element={<ChangePassword/>} />
        <Route path="/changepassTwo/:id"element={<ChangePasswordTwo/>} />
        <Route path="/user/:id" element={<User />} />

        {/* new */}

        <Route path="/doctors/:id" element={<DoctorsPage/>} />
        <Route path="/patients/:id" element={<PatientsPage/>} />
        <Route path="/wallet/:id" element={<WalletModal/>} />
        <Route path="/userManagement/:id" element={<UserManagement />} />
        <Route path="/myFam/:id" element={<MyFamily/>} />
        <Route path="/MyMedHistory/:id" element={<MedHistoryPatient/>} />
        <Route path="/myCart/:id" element={<MyCart />} />
        <Route path="/Thankyou/:id" element={<Thankyou />} />



        
      </Routes>
    </Router>
  );
}


