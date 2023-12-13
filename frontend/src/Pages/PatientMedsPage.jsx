// import AppbarPatientPharmacy from '../Components/Appbar/AppbarPatientPharmacy';
// import MedicationTablePatient from '../Components/MedicationTablePatient'
// import React, { useEffect, useState } from 'react';
// import { useNavigate,useParams } from 'react-router-dom';
// import axios from 'axios';
// import S1 from '../css/open-iconic-bootstrap.min.css';
// import S2 from '../css/animate.css';
// import S3 from '../css/owl.carousel.min.css';
// import S4 from '../css/owl.theme.default.min.css';
// import S5 from '../css/magnific-popup.css';
// import S6 from '../css/aos.css';
// import S7 from '../css/ionicons.min.css';
// import S8 from '../css/bootstrap-datepicker.css';
// import S9 from '../css/jquery.timepicker.css';
// import S10 from '../css/flaticon.css';
// import S11 from '../css/icomoon.css';
// import S12 from '../css/style.css';
// import I1 from "../images/about.jpg";
// import I2 from "../images/bg_1.jpg";
// import I3 from "../images/bg_2.jpg";
// import { FaUser, FaWallet } from 'react-icons/fa';
// import { styled } from '@mui/system';
// function PatientMedsPage() {
//   const [medicationData, setMedicationData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedMedicalUse, setSelectedMedicalUse] = useState('');
//   const [uniqueMedicalUses, setUniqueMedicalUses] = useState([]);
//   const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
//   const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
// const [currentImage, setCurrentImage] = useState(I2);

// const [passwords, setPasswords] = useState({
//   currentPassword: '',
//   newPassword: '',
//   confirmNewPassword: '',
// });
// const [success, setSuccess] = useState(false); 
// const handleChange = (prop) => (event) => {
//   setPasswords({ ...passwords, [prop]: event.target.value });
//   setSuccess(false); 
// };  const handleCloseChangePassword = () => {
//   setChangePasswordOpen(false);
// };  const handleOpenChangePassword = () => {
//   setChangePasswordOpen(true);
// };
// const handleSubmit = (event) => {
//   event.preventDefault();
  
//   setSuccess(false);

  
//   if (passwords.newPassword !== passwords.confirmNewPassword) {
//     alert("New passwords don't match.");
//     return;
//   }

//   if (!isValidPassword(passwords.newPassword)) {
//     alert("Password must contain at least one capital letter, one number, and be at least 4 characters long.");
//     return;
//   }

//   console.log('Passwords submitted:', passwords);
  
  
  
//   setSuccess(true);

 
//   updatePassword(passwords.newPassword)
//   alert("Password changed successfully");
// };
// const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);

// const PopupContainer = styled('div')({
 
//   position: 'absolute',
//   width: 400,
//   backgroundColor: 'white',
//   boxShadow: 24,
//   p: 4,
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
 
//   borderRadius: 8,  
// });
// const isValidPassword = (password) => {
//   const regex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
//   return regex.test(password);
// };

// const updatePassword = async (newPassword) => {
//   try {
//     // Replace '/api/reset-password' with your actual API endpoint
//     const response = await axios.put('http://localhost:3000/changepassword', { id, newPassword });
//     console.log(response.data);
//     alert('Password successfully updated');
//   } catch (error) {
//     console.error('Error updating password:', error);
//     alert('Error updating password');
//   }
// };
  
//   const toggleImage = () => {
//     setCurrentImage((prevImage) => (prevImage === I2 ? I3 : I2));
//   };

//   useEffect(() => {
//     const intervalId = setInterval(toggleImage, 2000);
//     return () => clearInterval(intervalId);
//   }, []);


//   useEffect(() => {
//     const queryParameters = {
//       medicalUse: selectedMedicalUse, // Add the medical use filter here
//     };
    
//     const fetchMedicationData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/meds/', {
//           params: queryParameters,
//         });
//         const responseData = response.data;
//         console.log('Fetched data:', responseData);
//         setMedicationData(responseData);

//         // Extract unique medical uses from fetched data
//         const uniqueUses = [...new Set(responseData.map((item) => item.medicalUse))];
//         setUniqueMedicalUses(uniqueUses);
//       } catch (error) {
//         console.error('Error fetching medication data:', error);
//       }
//     };

//     fetchMedicationData();
//   }, [selectedMedicalUse]);

//   const handleSearchInputChange = (event) => {
//     setSearchQuery(event.target.value);
//   };
//   const handleGoToCart = () => {
    
//     // Navigate to your cart page when the button is clicked
//     navigate(`/Cart/${id}`); // Replace '/cart' with your actual cart page URL
//   };

//   const filteredRows = medicationData.filter((row) =>
//     row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//     (selectedMedicalUse === '' || row.medicalUse === selectedMedicalUse)
//   );
//   const addToCart = (medicationId) => {
//     const patientId = id.toString();
//     // Send a request to your backend to add the medication to the patient's cart
//     axios.post('http://localhost:3000/Cart/add', {
//       patientId,
//       medicationId,
//       quantity: 1,
//        // You can specify the quantity to add
//     })
//     .then((response) => {
//       console.log('Medication added to cart:', response.data);
//       // You can add logic to show a success message or update the UI as needed
//     })
//     .catch((error) => {
//       console.error('Error adding medication to cart:', error);
//     });
//   };
//   return (
    
// <div style={{ backgroundColor: "white" }}>
// <title>MetaCare </title>
// <nav className="navbar py-4 navbar-expand-lg ftco_navbar navbar-light bg-light flex-row">
//         <div className="container"  >
//           <div className="row no-gutters d-flex align-items-start align-items-center px-3 px-md-0">
//             <div className="col-lg-2 pr-4 align-items-center">
//               <a className="navbar-brand">
//                 Meta<span>Care</span>
//               </a>
              
//             </div>
//           </div>
//         </div>
//       </nav>
//       <nav
//         className="navbar navbar-expand-lg navbar-dark bg-dark ftco-navbar-light"
//         id="ftco-navbar"
        
//       >
//         <div className="container d-flex align-items-center">
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-toggle="collapse"
//             data-target="#ftco-nav"
//             aria-controls="ftco-nav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="oi oi-menu" /> Menu
//           </button>
        
//           <div className="collapse navbar-collapse">
//             <ul className="navbar-nav mr-auto">
//               <li className="nav-item active" style={{marginRight:"10px"} }>
//                 <a  className="nav-link pl-0"  style={{cursor:"pointer" } } onClick={() => navigate(`/pharm-patient-home/${id}`)}>
//                   Home
//                 </a>
//               </li>
//               <li
//                 className="nav-item dropdown"
//                 onMouseEnter={() => setShowPersonalDropdown(true)}
//                 onMouseLeave={() => setShowPersonalDropdown(false)}
//               >
//                 <a
//                   className="nav-link dropdown-toggle"
//                   style={{cursor:"pointer" } }
//                   id="doctorsDropdown"
//                   role="button"
//                   data-toggle="dropdown"
//                   aria-haspopup="true"
//                   aria-expanded={setShowPersonalDropdown}
//                 >
//                   Store
//                 </a>
//                 <div
//                   className={`dropdown-menu ${
//                     showPersonalDropdown ? 'show' : ''
//                   }`}
//                   aria-labelledby="personalDropdown"
//                 >
//                   <a className="dropdown-item" style={{cursor:"pointer" } }
//                   onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
//                   onMouseLeave={(e) => e.target.style.backgroundColor = ''}
//                   onClick={() => navigate(`/patient-meds/${id}`)}>
//                     Products
//                   </a>
//                   <a className="dropdown-item" style={{cursor:"pointer" } }
//                   onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
//                   onMouseLeave={(e) => e.target.style.backgroundColor = ''}
//                    onClick={() => navigate(`/Order/${id}`)}>
//                     My Orders
//                   </a>
                  
//                 </div>
//               </li>
//               {/* New dropdown for Doctors */}
             
              
//               {/* Profile dropdown */}
              
    
// <li
//   className="nav-item dropdown "
//   onMouseEnter={() => setShowProfileDropdown(true)}
//   onMouseLeave={() => setShowProfileDropdown(false)}
//   style={{marginLeft:"880px"}}
// >
//   <a style={{cursor:"pointer" } }
//     className="nav-link dropdown-toggle"
   
//     id="profileDropdown"
//     role="button"
//     data-toggle="dropdown"
//     aria-haspopup="true"
//     aria-expanded={showProfileDropdown}
    
//   >
//     <FaUser style={{ fontSize: '20px', marginRight: '5px' }} />
    
//   </a>
//   <div
//     className={`dropdown-menu ${showProfileDropdown ? 'show' : ''}`}
//     aria-labelledby="profileDropdown"
//   >
//     <a className="dropdown-item" style={{cursor:"pointer" } }
//                   onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
//                   onMouseLeave={(e) => e.target.style.backgroundColor = ''}
//                   onClick={handleOpenChangePassword}>
//       Change Password
//     </a>
//     <a className="dropdown-item" style={{cursor:"pointer" } }
//                   onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
//                   onMouseLeave={(e) => e.target.style.backgroundColor = ''}
//               onClick={() => navigate(`/clinic`)}>
//       Logout
//     </a>
//   </div>
// </li>

// {/* Wallet icon without dropdown */}
// <li className="nav-item ">
//   <a className="nav-link" onClick={() => navigate(`/wallet`)} style={{cursor:"pointer" } }>
//     <FaWallet style={{ fontSize: '20px', marginRight: '5px' }} />
  
//   </a>
// </li>

//             </ul>
//           </div>
//         </div>
//       </nav>

    
//     {/* <div className="py-5"> */}
//       {/* <div className="container">
//         <div className="row">
//           <div className="col-lg-6">
//             <h3 className="mb-3 h6 text-uppercase text-black d-block">
//               Filter by Price
//             </h3>
//             <div id="slider-range" className="border-primary" />
//             <input
//               type="text"
//               name="text"
//               id="amount"
//               className="form-control border-0 pl-0 bg-white"
//               disabled=""
//             />
//           </div>
//           <div className="col-lg-6 text-lg-right">
//             <h3 className="mb-3 h6 text-uppercase text-black d-block">
//               Filter
//             </h3>
//             <button
//               type="button"
//               className="btn btn-primary btn-md dropdown-toggle px-4"
//               id="dropdownMenuReference"
//               data-toggle="dropdown"
//             >
//               Reference
//             </button>
//             <div
//               className="dropdown-menu"
//               aria-labelledby="dropdownMenuReference"
//             >
//               <a className="dropdown-item" href="#">
//                 Relevance
//               </a>
//               <a className="dropdown-item" href="#">
//                 Name, A to Z
//               </a>
//               <a className="dropdown-item" href="#">
//                 Name, Z to A
//               </a>
//               <div className="dropdown-divider" />
//               <a className="dropdown-item" href="#">
//                 Price, low to high
//               </a>
//               <a className="dropdown-item" href="#">
//                 Price, high to low
//               </a>
//             </div>
//           </div>
//         </div>
//       </div> */}
//     {/* </div> */}
    
//     <div className="site-section bg-light">
//       <div className="container">
//         <div className="row">
//           <div className="col-sm-6 col-lg-4 text-center item mb-4 item-v2">
//             <span className="onsale">Sale</span>
//             <a href="shop-single.html">
//               {" "}
//               <img src="images/product_01.png" alt="Image" />
//             </a>
//             <h3 className="text-dark">
//               <a >Bioderma</a>
//             </h3>
//             <p className="price">
//               <del>95.00</del> — $55.00
//             </p>
//           </div>
//           <div className="col-sm-6 col-lg-4 text-center item mb-4 item-v2">
//             <a >
//               {" "}
//               <img src="images/product_02.png" alt="Image" />
//             </a>
//             <h3 className="text-dark">
//               <a >Chanca Piedra</a>
//             </h3>
//             <p className="price">$70.00</p>
//           </div>
//           <div className="col-sm-6 col-lg-4 text-center item mb-4 item-v2">
//             <a >
//               {" "}
//               <img src="images/product_03.png" alt="Image" />
//             </a>
//             <h3 className="text-dark">
//               <a >Umcka Cold Care</a>
//             </h3>
//             <p className="price">$120.00</p>
//           </div>
//           <div className="col-sm-6 col-lg-4 text-center item mb-4 item-v2">
//             <a >
//               {" "}
//               <img src="images/product_04.png" alt="Image" />
//             </a>
//             <h3 className="text-dark">
//               <a >Cetyl Pure</a>
//             </h3>
//             <p className="price">
//               <del>45.00</del> — $20.00
//             </p>
//           </div>
//           <div className="col-sm-6 col-lg-4 text-center item mb-4 item-v2">
//             <a >
//               {" "}
//               <img src="images/product_05.png" alt="Image" />
//             </a>
//             <h3 className="text-dark">
//               <a>CLA Core</a>
//             </h3>
//             <p className="price">$38.00</p>
//           </div>
//           <div className="col-sm-6 col-lg-4 text-center item mb-4 item-v2">
//             <span className="onsale">Sale</span>
//             <a >
//               {" "}
//               <img src="images/product_06.png" alt="Image" />
//             </a>
//             <h3 className="text-dark">
//               <a >Poo Pourri</a>
//             </h3>
//             <p className="price">
//               <del>$89</del> — $38.00
//             </p>
//           </div>
//           <div className="col-sm-6 col-lg-4 text-center item mb-4 item-v2">
//             <span className="onsale">Sale</span>
//             <a >
//               {" "}
//               <img src="images/product_01.png" alt="Image" />
//             </a>
//             <h3 className="text-dark">
//               <a >Bioderma</a>
//             </h3>
//             <p className="price">
//               <del>95.00</del> — $55.00
//             </p>
//           </div>
//           <div className="col-sm-6 col-lg-4 text-center item mb-4 item-v2">
//             <a >
//               {" "}
//               <img src="images/product_02.png" alt="Image" />
//             </a>
//             <h3 className="text-dark">
//               <a >Chanca Piedra</a>
//             </h3>
//             <p className="price">$70.00</p>
//           </div>
//           <div className="col-sm-6 col-lg-4 text-center item mb-4 item-v2">
//             <a >
//               {" "}
//               <img src="images/product_03.png" alt="Image" />
//             </a>
//             <h3 className="text-dark">
//               <a >Umcka Cold Care</a>
//             </h3>
//             <p className="price">$120.00</p>
//           </div>
//           <div className="col-sm-6 col-lg-4 text-center item mb-4 item-v2">
//             <a >
//               {" "}
//               <img src="images/product_04.png" alt="Image" />
//             </a>
//             <h3 className="text-dark">
//               <a >Cetyl Pure</a>
//             </h3>
//             <p className="price">
//               <del>45.00</del> — $20.00
//             </p>
//           </div>
//           <div className="col-sm-6 col-lg-4 text-center item mb-4 item-v2">
//             <a >
//               {" "}
//               <img src="images/product_05.png" alt="Image" />
//             </a>
//             <h3 className="text-dark">
//               <a >CLA Core</a>
//             </h3>
//             <p className="price">$38.00</p>
//           </div>
//           <div className="col-sm-6 col-lg-4 text-center item mb-4 item-v2">
//             <span className="onsale">Sale</span>
//             <a >
//               {" "}
//               <img src="images/product_06.png" alt="Image" />
//             </a>
//             <h3 className="text-dark">
//               <a >Poo Pourri</a>
//             </h3>
//             <p className="price">
//               <del>$89</del> — $38.00
//             </p>
//           </div>
//         </div>
//         <div className="row mt-5">
//           <div className="col-md-12 text-center">
//             <div className="site-block-27">
//               <ul>
//                 <li>
//                   <a href="#">&lt;</a>
//                 </li>
//                 <li className="active">
//                   <span>1</span>
//                 </li>
//                 <li>
//                   <a href="#">2</a>
//                 </li>
//                 <li>
//                   <a href="#">3</a>
//                 </li>
//                 <li>
//                   <a href="#">4</a>
//                 </li>
//                 <li>
//                   <a href="#">5</a>
//                 </li>
//                 <li>
//                   <a href="#">&gt;</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
    
//   </div>


//   );
// }

// export default PatientMedsPage;