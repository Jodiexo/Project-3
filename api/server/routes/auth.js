const express = require('express');
const bcrypt = require('bcrypt');
const { findUserByUsername } = require('../models/user');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { user_name, password } = req.body;

  console.log('Received login request:', req.body); // Add this line

  try {
    const user = await findUserByUsername(user_name);

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Passwords match
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
