import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import './Contacts.css';
import { useNavigate } from 'react-router-dom';

const Contacts = () => {
  const [view, setView] = useState('list');
  const [username, setUsername] = useState('');
  const [customName, setCustomName] = useState('');
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const handleAddContact = async (e) => {
    e.preventDefault();

    const newContact = {
      username,
      customName,
    };

    setContacts([...contacts, newContact]);
    setUsername('');
    setCustomName('');
    setView('list');

    Swal.fire({
      title: 'Success!',
      text: 'Contact added successfully',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  const handleContactClick = (username, customName) => {
    navigate('/home', {
      state: { currentView: 'messages', username, customName },
    });
  };

  return (
    <Box className="contacts-container">
      {view === 'list' ? (
        <>
          <Heading as="h2" mb={6} className="contacts-heading">
            Contacts
          </Heading>
          <Box className="contacts-list">
            <ul>
              {contacts.map((contact, index) => (
                <li
                  key={index}
                  className="contacts-list-item"
                  onClick={() =>
                    handleContactClick(contact.username, contact.customName)
                  }
                >
                  {contact.customName} ({contact.username})
                </li>
              ))}
            </ul>
          </Box>
          <Button colorScheme="blue" onClick={() => setView('add')}>
            Add New Contact
          </Button>
        </>
      ) : (
        <form onSubmit={handleAddContact} className="contacts-form">
          <Heading as="h2" mb={6} className="contacts-heading">
            Add New Contact
          </Heading>
          <VStack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel className="contacts-label">Username</FormLabel>
              <Input
                className="contacts-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="customName" isRequired>
              <FormLabel className="contacts-label">Custom Name</FormLabel>
              <Input
                className="contacts-input"
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              className="contacts-button"
            >
              Add Contact
            </Button>
            <Button
              colorScheme="gray"
              width="full"
              onClick={() => setView('list')}
            >
              Cancel
            </Button>
          </VStack>
        </form>
      )}
    </Box>
  );
};

export default Contacts;
