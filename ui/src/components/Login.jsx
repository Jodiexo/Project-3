import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import CreateAccount from './CreateAccount';
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          title: 'Success!',
          text: 'Login successful',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate('/home');
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: 'Error!',
          text: errorData.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h1" mb={6} textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleLogin}>
        <VStack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            Login
          </Button>
        </VStack>
      </form>
      <CreateAccount isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </Box>
  );
};

export default Login;
