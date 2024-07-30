import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
// import CreateAccount from './components/CreateAccount';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div>
        <h1>WELCOME TO CHAPP!</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
