import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Home from './components/Home';
import { Box, Heading } from '@chakra-ui/react';

function App() {
  return (
    <Box>
      <Heading>WELCOME TO CHAPP!</Heading>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Box>
  );
}

export default App;
