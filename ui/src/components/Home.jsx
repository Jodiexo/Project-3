import React, { useState, useEffect } from 'react';
import './Home.css';
import NavBar from './NavBar';
import { Box, Heading } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import MessageFetch from './Messages';
import Contacts from './Contacts';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('messages');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsLoggedIn(false);
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
        return <Messages selectedContact={selectedContact} />;
      case 'discover':
        return <Discover />;
      case 'contacts':
        return <Contacts />;
      default:
        return <Messages />;
    }
  };

  return (
    <Box className={darkMode ? 'home-container dark' : 'home-container'}>
      <Heading as="h1" textAlign="center">
        Home
      </Heading>
      <Box mt={4}>
        {renderView()} {}
      </Box>
      <NavBar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        setCurrentView={setCurrentView}
        handleLogout={handleLogout}
      />
    </Box>
  );
};

const Messages = ({ selectedContact }) => (
  <Box className="home-messages">
    <Heading as="h2">
      Messages {selectedContact && `with ${selectedContact.customName}`}
    </Heading>
    <MessageFetch contact={selectedContact} />
  </Box>
);

const Discover = () => (
  <Box className="home-discover">
    <Heading as="h2">Discover Groups</Heading>
  </Box>
);

export default Home;
