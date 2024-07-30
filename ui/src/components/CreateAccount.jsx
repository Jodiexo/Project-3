import React, { useState, useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { LoginContext } from '../context/LoginContext';

/*
  Try using Context to make your life easier as this
  will allow you to easily pass data around
  Made a context Provider Component for this portion to consume


*/

/*
const CreateAccount = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const history = useHistory();

  const handleCreateAccount = (e) => {
    e.preventDefault();

    if (Password !== confirmPassword) {
      // this will be handled on server side so user cannot see the returned data
      alert('Passwords do not match'); // you can still display conditional alerts based on the return from server side
      return;
    }
  };
};
*/

const CreateAccount = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // our createUser context is basically a reuse of other context. see line 26 of LoginContext.jsx
  const { createUser } = useContext(LoginContext);

  const [userDetails, setUserDetails] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    password: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(userDetails);
    Swal.fire({
      title: 'Success!',
      text: 'User created successfully',
      icon: 'success',
      confirmButtonText: 'OK',
    });
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Create Account</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl id="first_name" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="first_name"
                  value={userDetails.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </FormControl>
              <FormControl id="last_name" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="last_name"
                  value={userDetails.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </FormControl>
              <FormControl id="user_name" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="user_name"
                  value={userDetails.user_name}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={userDetails.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </FormControl>
              <Button mt={4} colorScheme="teal" type="submit">
                Create Account
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateAccount;
