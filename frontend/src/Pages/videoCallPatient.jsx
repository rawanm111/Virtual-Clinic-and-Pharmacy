// import Button from "@mui/material/Button"
// import IconButton from "@mui/material/IconButton"
// import TextField from "@mui/material/TextField"
// import AssignmentIcon from "@mui/icons-material/Assignment"
// import PhoneIcon from "@mui/icons-material/Phone"
// import React, { useEffect, useRef, useState } from "react"
// import { CopyToClipboard } from "react-copy-to-clipboard"
// import Peer from "simple-peer"
// import io from "socket.io-client"
import { useParams } from "react-router-dom";


// const socket = io.connect('http://localhost:3002')
// function App() {
// 	const [ me, setMe ] = useState("")
// 	const [ stream, setStream ] = useState()
// 	const [ receivingCall, setReceivingCall ] = useState(false)
// 	const [ caller, setCaller ] = useState("")
// 	const [ callerSignal, setCallerSignal ] = useState()
// 	const [ callAccepted, setCallAccepted ] = useState(false)
// 	const [ idToCall, setIdToCall ] = useState("")
// 	const [ callEnded, setCallEnded] = useState(false)
// 	const [ name, setName ] = useState("")
// 	const myVideo = useRef()
// 	const userVideo = useRef()
// 	const connectionRef= useRef()

// 	useEffect(() => {
// 		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
// 		  setStream(stream)
// 		  if (myVideo.current)
// 			myVideo.current.srcObject = stream
// 		})
	  
// 		socket.on("me", (id) => {
// 		  console.log("Received ID:", id);
// 		  setMe(id);
// 		});
	  
// 		socket.on("callUser", (data) => {
// 		  setReceivingCall(true)
// 		  setCaller(data.from)
// 		  setName(data.name)
// 		  setCallerSignal(data.signal)
// 		});
// 	  }, []);
	  

// 	const callUser = (id) => {
// 		const peer = new Peer({
// 			initiator: true,
// 			trickle: false,
// 			stream: stream
// 		})
// 		peer.on("signal", (data) => {
// 			socket.emit("callUser", {
// 				userToCall: id,
// 				signalData: data,
// 				from: me,
// 				name: name
// 			})
// 		})
// 		peer.on("stream", (stream) => {
// 			if(userVideo.current)
// 				userVideo.current.srcObject = stream
			
// 		})
// 		socket.on("callAccepted", (signal) => {
// 			setCallAccepted(true)
// 			peer.signal(signal)
// 		})

// 		connectionRef.current = peer
// 	}

// 	const answerCall =() =>  {
// 		setCallAccepted(true)
// 		const peer = new Peer({
// 			initiator: false,
// 			trickle: false,
// 			stream: stream
// 		})
// 		peer.on("signal", (data) => {
// 			socket.emit("answerCall", { signal: data, to: caller })
// 		})
// 		peer.on("stream", (stream) => {
// 			if(userVideo.current)
// 			userVideo.current.srcObject = stream
// 		})

// 		peer.signal(callerSignal)
// 		connectionRef.current = peer
// 	}

// 	const leaveCall = () => {
// 		setCallEnded(true)
// 		connectionRef.current.destroy()
// 	}

// 	return (
// 		<>
// 			<h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
// 		<div className="container">
// 			<div className="video-container">
// 				<div className="video">
// 					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
// 				</div>
// 				<div className="video">
// 					{callAccepted && !callEnded ?
// 					<video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
// 					null}
// 				</div>
// 			</div>
// 			<div className="myId">
// 				<TextField
// 					id="filled-basic"
// 					label="Name"
// 					variant="filled"
// 					value={name}
// 					onChange={(e) => setName(e.target.value)}
// 					style={{ marginBottom: "20px" }}
// 				/>
// 				<CopyToClipboard text={me} onCopy={() => { console.log(me); alert(me); }}>
//   <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
//     Copy ID
//   </Button>
// </CopyToClipboard>



// 				<TextField
// 					id="filled-basic"
// 					label="ID to call"
// 					variant="filled"
// 					value={idToCall}
// 					onChange={(e) => setIdToCall(e.target.value)}
// 				/>
// 				<div className="call-button">
// 					{callAccepted && !callEnded ? (
// 						<Button variant="contained" color="secondary" onClick={leaveCall}>
// 							End Call
// 						</Button>
// 					) : (
// 						<IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
// 							<PhoneIcon fontSize="large" />
// 						</IconButton>
// 					)}
// 					{idToCall}
// 				</div>
// 			</div>
// 			<div>
// 				{receivingCall && !callAccepted ? (
// 						<div className="caller">
// 						<h1 >{name} is calling...</h1>
// 						<Button variant="contained" color="primary" onClick={answerCall}>
// 							Answer
// 						</Button>
// 					</div>
// 				) : null}
// 			</div>
// 		</div>
// 		</>
// 	)
// }

// export default App
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
      const roomID = "zooni"
      let myMeeting = async (element) => {
     // generate Kit Token
      const appID = 2077415180;
      const serverSecret = "661d88f0c849f74d60747c13454fd1f0";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));


     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
            `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
        showTextChat: true,
        showScreenSharingButton: true,
        showPreJoinView: true,

      });


  };

  return (
    <div
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}