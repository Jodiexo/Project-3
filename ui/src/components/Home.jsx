import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import NavBar from './NavBar';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import Contacts from './Contacts';
import DMs from './DMs'; 

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('messages');
  const [selectedContact, setSelectedContact] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (location.state?.currentView) {
      setCurrentView(location.state.currentView);
      setSelectedContact({
        username: location.state.username,
        customName: location.state.customName,
      });
    }
  }, [location.state]);

  const renderView = () => {
    switch (currentView) {
      case 'messages':
        return <DMs selectedContact={selectedContact} />;
      case 'contacts':
        return <Contacts />;
      case 'chats':
        return <Heading as="h2">Chats</Heading>;
      default:
        return <DMs selectedContact={selectedContact} />;
    }
  };

  return (
    <VStack className={darkMode ? 'home-container dark' : 'home-container'} spacing={6}>
      <Heading as="h1" textAlign="center" mt={6}>
        Home
      </Heading>
      <Box mt={4} width="full" maxW="xl">
        {renderView()}
      </Box>
      <NavBar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        setCurrentView={setCurrentView}
        handleLogout={handleLogout}
      />
    </VStack>
  );
};

export default Home;

