import React, { useContext, useEffect } from 'react';

import { Grid, Typography, Paper } from '@mui/material';
import { SocketContext } from '../Context';

const VideoPlayer = () => {

  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

  // Check if refs are defined before using them
  useEffect(() => {
    if (myVideo && myVideo.current && stream) {
      myVideo.current.srcObject = stream;
    }
  }, [stream]);
  return (
    <Grid
      container
      style={{
        justifyContent: 'center',
        flexDirection: stream && callAccepted && !callEnded ? 'column' : 'row',
      }}
    >
      {stream && (
        <Paper
          style={{
            padding: '10px',
            border: '2px solid black',
            margin: '10px',
          }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || 'Name'}
            </Typography>
            <video playsInline muted ref={myVideo} autoPlay style={{ width: '550px', ...(stream && { width: '300px' }) }} />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper
          style={{
            padding: '10px',
            border: '2px solid black',
            margin: '10px',
          }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call.name || 'Name'}
            </Typography>
            <video playsInline ref={userVideo} autoPlay style={{ width: '550px', ...(stream && { width: '300px' }) }} />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
