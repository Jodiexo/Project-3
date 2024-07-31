import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Box, Heading } from '@chakra-ui/react';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      <h1>Home</h1>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <p>You are logged out</p>
      )}
    </div>
  );
};

export default Home;
