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
import PatientsTable from "./Pages/PatientsTable";
import DoctorsTable from "./Pages/DoctorsTable";
import UserManagement from "./Pages/UserManagement";
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
import MedHistory from "./Pages/medHistory";
import Order from './Pages/OrderPage';
import NewHealthRecordPage from "./Pages/NewHealthRecordPage"; 
import MedHistoryDoc from "./Pages/MedHistoryDoc";
import HealthPackagesSub from "./Pages/HealthPackagesSub";
import HealthPackagesView from "./Pages/HealthPackagesView";
import Otp from "./Pages/otp";
import PrescriptionDoc from "./Pages/prescriptionsDoc";
import newPres from "./Pages/newPres";
import Store from "./Pages/store";
import StorePharm from "./Pages/storePharm";
import StoreAdmin from "./Pages/storeAdmin";
import StoreMed from "./Pages/storeMed";
import ThankYou from "./Pages/thanks";

import FU from "./Pages/followups";
import ChatsPage from "./Pages/ChatsPage";
import Messages from "./Pages/messages";
import MessagesDoc from "./Pages/messageDoc";
import MessagesPharmToDoc from "./Pages/messagesPharmtoDoc";
import MessagesPharmToPat from "./Pages/messagesPharmtoPat";
import MessagesPatToPharm from "./Pages/messagesPattoPharm";
import MessagesDocToPharm from "./Pages/messagesDoctoPharm";


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
        <Route path="/doctorsTable/:id" element={<DoctorsTable />} />
        <Route path="/patientsTable/:id" element={<PatientsTable />} />
        <Route path="/userManagement" element={<UserManagement />} />
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
        <Route path="/Prescriptions/:id" element={<PrescriptionDoc/>} />
        <Route path="/Cart/:id" element={<Cart/>}/>
        <Route path="/MedHistory/:id" element={<MedHistory/>} /> 
        <Route path="/healthRecs/:id" element={<MedHistoryDoc />} /> 
        <Route path="/new-HealthRecord" element={<NewHealthRecordPage />} />
        <Route path="/health-packages-sub/:id" element={<HealthPackagesSub />} />
        <Route path="/health-packages-VIEW/:id" element={<HealthPackagesView />} />
        <Route path="/Order/:id" element={<Order/>} /> 
        <Route path="/newPres/:id" element={<newPres/>} /> 
        <Route path="/healthRecs/:id" element={<MedHistoryDoc />} /> 
        <Route path="/new-HealthRecord" element={<NewHealthRecordPage />} />
        <Route path="/Prescription/:id" element={<Prescription/>} /> 
        <Route path="/EmploymentContract/:userId" element={<EmploymentContract/>} /> 
        <Route path="/otp/:username" element={<Otp/>} />
        <Route path="/patient-meds/:id"element={<Store/>} />
        <Route path="/pharm-meds/:id"element={<StorePharm/>} />
        <Route path="/admin-meds"element={<StoreAdmin/>} />
        <Route path="/med/:idmed/:id"element={<StoreMed/>}  />
        <Route path="/ThankYou/:id"element={<ThankYou/>}  />
        <Route path="/admin-home"element={<AdminHome/>}  />
        <Route path="/follow-ups/:id"element={<FU/>}  />
        <Route path="/chats/:username"element={<ChatsPage/>}  />
        <Route path="/messages/:id"element={<Messages/>}  />
        <Route path="/messagesDoc/:id"element={<MessagesDoc/>}  />
        <Route path="/messagesPharmtoDoc/:id"element={<MessagesPharmToDoc/>}  />
        <Route path="/messagesPharmtoPat/:id"element={<MessagesPharmToPat/>}  />
        <Route path="/messagesPattoPharm/:id"element={<MessagesPatToPharm/>}  />
        <Route path="/messagesDoctoPharm/:id"element={<MessagesDocToPharm/>}  />
        <Route path="/admin-home" element={<AdminHome />} />
      </Routes>
    </Router>
  );
}

