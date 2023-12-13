import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PatientProfile from './Pages/PatientProfile';
import PharmacistProfile from './Pages/PharmacistProfile';
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
import AdminRequestsD from "./Pages/AdminReqPageDoc";
import AdminRequestsP from "./Pages/AdminReqPagePharm";
import FamilyMember from "./Pages/FamMem";
import Form from "./Pages/Form";
import AppTable from "./Pages/appointmentsD";
import AppTableP from "./Pages/appointmentsP";
import AppTablePP from "./Pages/appointmentsP2";
import Prescription from "./Pages/prescription";
import EmploymentContract from "./Pages/EmploymentContract";
import Cart from "./Pages/Cart";
<<<<<<< HEAD
// import MedHistory from "./Pages/medHistory";
import Order from './Pages/OrderPage'
import Walletclinic from './Pages/walletclinic'
=======
import MedHistory from "./Pages/medHistory";
import Order from './Pages/OrderPage';
>>>>>>> origin/main
import NewHealthRecordPage from "./Pages/NewHealthRecordPage"; 
import MedHistoryDoc from "./Pages/MedHistoryDoc";
import HealthPackagesSub from "./Pages/HealthPackagesSub";
import HealthPackagesView from "./Pages/HealthPackagesView";
import Otp from "./Pages/otp";
<<<<<<< HEAD
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





=======
import PrescriptionDoc from "./Pages/prescriptionsDoc";
import newPres from "./Pages/newPres";
import Store from "./Pages/store";
import StorePharm from "./Pages/storePharm";
import StoreAdmin from "./Pages/storeAdmin";
import StoreMed from "./Pages/storeMed";
import ThankYou from "./Pages/thanks";
>>>>>>> origin/main
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
        <Route path="/patient-profile" element={<PatientProfile />} />
        <Route path="/pharm-profile" element={<PharmacistProfile />} />
<<<<<<< HEAD
        <Route path="/new-med" element={<AddMed />} />
        <Route path="/update-patient/:username" element={<UpdatePatient />} />
        <Route path="/update-doctor/:username" element={<UpdateDoctor />} />
        <Route path="/update-pharmacist/:username" element={<UpdatePharmacist />} />
=======
        <Route path="/doctorsTable/:id" element={<DoctorsTable />} />
        <Route path="/patientsTable/:id" element={<PatientsTable />} />
        <Route path="/userManagement" element={<UserManagement />} />
>>>>>>> origin/main
        <Route path="/health-packages" element={<HealthPackagesMain />} />
        <Route path="/add-family-member/:id" element={<Form />} />
        <Route path="/new-package" element={<NewPackage />} />
        <Route path="/my-fam/:id" element={<FamilyMember />} /> 
        <Route path="/pharmacist-requests" element={<AdminRequestsP />} /> 
        <Route path="/doctor-requests" element={<AdminRequestsD />} /> 
        <Route path="/appPageDoc/:id" element={<AppTable />} /> 
        <Route path="/appPagePatient/:id" element={<AppTableP/>} /> 
        <Route path="/appPagePatientt/:id" element={<AppTablePP/>} /> 
        <Route path="/Prescription/:id" element={<Prescription/>} />
<<<<<<< HEAD
        <Route path="/Cart/:id" element={<Cart/>}/>
        {/* <Route path="/MedHistory/:id" element={<MedHistory/>} />  */}
        <Route path="/HealthRecordPatient/:id" element={<PatientHealthRecordsPage/>} /> 
=======
        <Route path="/Prescriptions/:id" element={<PrescriptionDoc/>} />
        <Route path="/Cart/:id" element={<Cart/>}/>
        <Route path="/MedHistory/:id" element={<MedHistory/>} /> 
>>>>>>> origin/main
        <Route path="/healthRecs/:id" element={<MedHistoryDoc />} /> 
        <Route path="/new-HealthRecord" element={<NewHealthRecordPage />} />
        <Route path="/health-packages-sub/:id" element={<HealthPackagesSub />} />
        <Route path="/health-packages-VIEW/:id" element={<HealthPackagesView />} />
        <Route path="/Order/:id" element={<Order/>} /> 
<<<<<<< HEAD
        {/* <Route path="/walletclinic/:id" element={<Walletclinic/>} />  */}
        <Route path="/HealthRecordPatient/:id" element={<PatientHealthRecordsPage/>} /> 
=======
        <Route path="/newPres/:id" element={<newPres/>} /> 
>>>>>>> origin/main
        <Route path="/healthRecs/:id" element={<MedHistoryDoc />} /> 
        <Route path="/new-HealthRecord" element={<NewHealthRecordPage />} />
        <Route path="/Prescription/:id" element={<Prescription/>} /> 
        <Route path="/EmploymentContract/:userId" element={<EmploymentContract/>} /> 
        <Route path="/otp/:username" element={<Otp/>} />
<<<<<<< HEAD
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



        
=======
        <Route path="/patient-meds/:id"element={<Store/>} />
        <Route path="/pharm-meds/:id"element={<StorePharm/>} />
        <Route path="/admin-meds"element={<StoreAdmin/>} />
        <Route path="/med/:idmed/:id"element={<StoreMed/>}  />
        <Route path="/ThankYou/:id"element={<ThankYou/>}  />
>>>>>>> origin/main
      </Routes>
    </Router>
  );
}


