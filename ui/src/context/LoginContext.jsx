import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const LoginContext = createContext({
  first_name: '',
  last_name: '',
  user_name: '',
  password: '',
  role: [],
  email: '',
  setUser: () => {},
  createUser: async () => {},
});

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    password: '',
    role: [],
    email: '',
  });

  const createUser = async (newUser) => {
    try {
      newUser.id = uuidv4(); // Generate a new UUID for the user
      newUser.role = ['user']; // Set role to 'user'
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    // passing the user props created on line 17 and functions from lines 12/13
    <LoginContext.Provider value={{ ...user, setUser, createUser }}>
      {children}
    </LoginContext.Provider>
  );
};
export { LoginContext, LoginProvider };
