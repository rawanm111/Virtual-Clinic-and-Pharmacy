// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import img from '../Components/Logo/img.png';
// // import Button from '@mui/material/Button';

// // function StartPage() {
// //   const navigate = useNavigate();

// //   const navigateToClinic = () => {
// //     navigate('/clinic');
// //   };

// //   const navigateToPharmacy = () => {
// //     navigate('/pharm');
// //   };

// //   return (
// //     <div
// //       style={{
// //         display: 'flex',
// //         flexDirection: 'column',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         minHeight: '100vh', // Set the height to 100vh to fill the whole page
// //         backgroundColor: 'white',
// //       }}
// //     >
// //       <img
// //         src={img}
// //         alt=""
// //         style={{
// //           top:-300,
// //           width: '70%',
// //           maxWidth: '100%',
// //         }}
// //       />

// //       <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
// //         <Button
// //           variant="outlined"
// //           onClick={navigateToClinic}
// //           style={{
// //             width: '450px',
// //             height: '60px',
// //             fontSize: '19px',
// //           }}
// //         >
// //           VISIT VIRTUAL CLINIC
// //         </Button>
// //         <Button
// //           variant="outlined"
// //           onClick={navigateToPharmacy}
// //           style={{
// //             width: '450px',
// //             height: '60px',
// //             fontSize: '19px',
// //           }}
// //         >
// //           VISIT VIRTUAL PHARMACY
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default StartPage;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import img from '../Components/Logo/img.png';
// import Button from '@mui/material/Button';

// function StartPage() {
//   const navigate = useNavigate();

//   const navigateToClinic = () => {
//     navigate('/clinic');
//   };

//   const navigateToPharmacy = () => {
//     navigate('/pharm');
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//         backgroundColor: '#f5f5f5', // Light gray background
//         padding: '20px', // Add padding for better spacing
//       }}
//     >
//       <img
//         src={img}
//         alt=""
//         style={{
//           width: '70%',
//           maxWidth: '100%',
//           marginBottom: '20px', // Add margin at the bottom for spacing
//         }}
//       />

//       <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//         <Button
//           variant="contained" // Use contained style for primary actions
//           color="primary" // Set primary color
//           onClick={navigateToClinic}
//           style={{
//             width: '100%', // Make the button full width
//             height: '60px',
//             fontSize: '18px',
//           }}
//         >
//           Visit Virtual Clinic
//         </Button>

//         <Button
//           variant="outlined"
//           color="primary"
//           onClick={navigateToPharmacy}
//           style={{
//             width: '100%',
//             height: '60px',
//             fontSize: '18px',
//           }}
//         >
//           Visit Virtual Pharmacy
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default StartPage;

////////////////////
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import img from '../Components/Logo/img.png';
// import Button from '@mui/material/Button';

// function StartPage() {
//   const navigate = useNavigate();

//   const navigateToClinic = () => {
//     navigate('/clinic');
//   };

//   const navigateToPharmacy = () => {
//     navigate('/pharm');
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//         backgroundColor: '#f5f5f5', // Light gray background
//         padding: '20px', // Add padding for better spacing
//         textAlign: 'center',
//       }}
//     >
//       <img
//         src={img}
//         alt=""
//         style={{
//           width: '200px',
//           height: 'auto',
//           marginBottom: '20px',
//         }}
//       />

//       <h1 style={{ fontSize: '36px', marginBottom: '20px', color: '#333' }}>Welcome to Metacare</h1>

//       <p style={{ fontSize: '16px', marginBottom: '30px', color: '#555' }}>
//         Your trusted virtual healthcare provider. Access our virtual clinic and pharmacy from the comfort of your home.
//       </p>

//       <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '450px' }}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={navigateToClinic}
//           style={{
//             height: '60px',
//             fontSize: '18px',
//           }}
//         >
//           Visit Virtual Clinic
//         </Button>

//         <Button
//           variant="outlined"
//           color="primary"
//           onClick={navigateToPharmacy}
//           style={{
//             height: '60px',
//             fontSize: '18px',
//           }}
//         >
//           Visit Virtual Pharmacy
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default StartPage;
///////////////////
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import img from '../Components/Logo/cli.png';

// function StartPage() {
//   const navigate = useNavigate();

//   const navigateToGetStarted = () => {
//     navigate('/new');
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '100vh',
//         backgroundColor: '#f5f5f5', // Light gray background
//         padding: '20px', // Add padding for better spacing
//         textAlign: 'center',
//       }}
//     >
//       <img
//         src={img}
//         alt=""
//         style={{
//           width: '200px',
//           height: 'auto',
//           marginBottom: '20px',
//         }}
//       />

//       <h1 style={{ fontSize: '36px', marginBottom: '20px', color: '#333' }}>Welcome to Metacare</h1>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={navigateToGetStarted}
//         style={{
//           height: '60px',
//           fontSize: '18px',
//         }}
//       >
//         Get Started
//       </Button>
//     </div>
//   );
// }

// export default StartPage;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import img from '../Components/Logo/cli.png';

// function StartPage() {
//   const navigate = useNavigate();

//   const navigateToGetStarted = () => {
//     navigate('/new');
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         minHeight: '100vh',
//         backgroundColor: '#f5f5f5', // Light gray background
//         padding: '20px', // Add padding for better spacing
//         textAlign: 'left',
//       }}
//     >
//       <div style={{ marginRight: '20px' }}>
//         <h1 style={{ fontSize: '36px', marginBottom: '20px', color: '#333' }}>Welcome to Metacare</h1>

//         <p style={{ fontSize: '18px', marginBottom: '20px', color: '#666' }}>
//           Your virtual clinic and pharmacy for personalized healthcare.
//         </p>

//         <Button
//           variant="contained"
//           color="primary"
//           onClick={navigateToGetStarted}
//           style={{
//             height: '60px',
//             fontSize: '18px',
//           }}
//         >
//           Get Started
//         </Button>
//       </div>

//       <img
//         src={img}
//         alt=""
//         style={{
//           width: '50%', // Adjust the width as needed
//           height: 'auto',
//         }}
//       />
//     </div>
//   );
// }

// export default StartPage;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import img from '../Components/Logo/cli.png';

// function StartPage() {
//   const navigate = useNavigate();

//   const navigateToGetStarted = () => {
//     navigate('/new');
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'flex-end',
//         minHeight: '100vh',
//         backgroundColor: '#f5f5f5', // Light gray background
//         padding: '20px', // Add padding for better spacing
//         textAlign: 'left',
//       }}
//     >
//       <img
//         src={img}
//         alt=""
//         style={{
//           width: '100%', // Take the whole screen horizontally
//           height: 'auto',
//         }}
//       />

//       <div style={{ marginLeft: '20px', maxWidth: '50%' }}>
//         <h1 style={{ fontSize: '36px', marginBottom: '20px', color: '#333' }}>Welcome to Metacare</h1>

//         <p style={{ fontSize: '18px', marginBottom: '20px', color: '#666' }}>
//           Your virtual clinic and pharmacy for personalized healthcare.
//         </p>

//         <Button
//           variant="contained"
//           color="primary"
//           onClick={navigateToGetStarted}
//           style={{
//             height: '60px',
//             fontSize: '18px',
//           }}
//         >
//           Get Started
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default StartPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
// import img from '../Components/Logo/cli.png';
import img from "../images/cli.png";


function StartPage() {
  const navigate = useNavigate();

  const navigateToGetStarted = () => {
    navigate('/new');
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5', // Light gray background
        padding: '20px', // Add padding for better spacing
        textAlign: 'left',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.25)', // Light blue overlay
        }}
      ></div>

      <img
        src={img}
        alt=""
        style={{
          width: '100%',
          height: '99%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '80px', // Adjusted to move text more to the left
          transform: 'translateY(-50%)',
          zIndex: 1,
          maxWidth: '40%',
          color: '#333',
        }}
      >
        <h1 style={{ fontSize: '25px', color: '#1159c8', marginBottom: '35px', fontWeight: 'bold'  }}>
          Welcome to Metacare
        </h1>
        <p style={{ fontSize: '69px', marginBottom: '-85px', fontWeight: 'bold' ,  maxWidth: '100%'}}>
          We are here for
        </p>
        <p style={{ fontSize: '69px', marginBottom: '-115px', fontWeight: 'bold' ,  maxWidth: '100%',   marginTop: '40px'}}>
         your care.
        </p>
        <p style={{ fontSize: '18px', marginBottom: '80px' ,   marginTop: '120px'}}>
          At Metacare, our mission is to provide personalized healthcare that meets
          your unique needs and ensures your well-being. 
          Your virtual clinic and
          pharmacy are just a click away.
        </p>
        <Button
          variant="contained"
          color="primary"
          style={{
            height: '70px', // Increased height
            fontSize: '18px',
            borderRadius: '20px', // Rounded corners
            marginTop: '-40px', // Lowered the button
            backgroundColor: '#1159c8', // Matching the color of Welcome to Metacare
          }}
          onClick={navigateToGetStarted}
        
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}



//   return (
//     <div
//       style={{
//         position: 'relative',
//         minHeight: '100vh',
//         backgroundColor: '#f5f5f5', // Light gray background
//         padding: '20px', // Add padding for better spacing
//         textAlign: 'left',
//       }}
//     >
//   <div
//   style={{
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     zIndex: 1,
//     backgroundColor: 'rgba(173, 216, 290, 0.6)', // Light blue overlay
//     // border: '2px solid red', // Add a red border for visibility during debugging
//   }}
// ></div>


//       <img
//         src={img}
//         alt=""
//         style={{
//           width: '100%',
//           height: '99%',
//           // objectFit: 'cover',
//           position: 'absolute',
//           top: 0,
//           left: 0,
//         }}
//       />

//       <div
//         style={{
//           position: 'absolute',
//           top: '50%',
//           right: '20px',
//           transform: 'translateY(-50%)',
//           zIndex: 1,
//           maxWidth: '50%',
//           color: '#333',
//         }}
//       >
//         <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Welcome to Metacare</h1>

//         <p style={{ fontSize: '18px', marginBottom: '20px' }}>
//           Your virtual clinic and pharmacy for personalized healthcare.
//         </p>

//         <Button
//           variant="contained"
//           color="primary"
//           onClick={navigateToGetStarted}
//           style={{
//             height: '60px',
//             fontSize: '18px',
//           }}
//         >
//           Get Started
//         </Button>
//       </div>
//     </div>
//   );
// }

export default StartPage;
