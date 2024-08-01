import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LoginProvider } from './context/LoginContext.jsx';
import { MessageProvider } from './context/MessageContext.jsx';
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <LoginProvider>
          <MessageProvider>
            <App />
          </MessageProvider>
        </LoginProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
