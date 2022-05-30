import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import './App.css';
import Timer from './components/organisms/timer';

function App() {
  return (
    <div>
      <CssBaseline />
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Timer />
      </Box>
    </div>
  );
}

export default App;
