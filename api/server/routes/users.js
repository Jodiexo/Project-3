const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const knex = require('knex')(
  require('../../knexfile.js')[process.env.NODE_ENV || 'development'],
);

// Get all users
router.get('/', (req, res) => {
  knex('users')
    .select('*')
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again',
      }),
    );
});

// Get a specific user by ID
router.get('/:id', (req, res) => {
  knex('users')
    .select('*')
    .where({ id: req.params.id })
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again',
      }),
    );
});

router.post('/', async (req, res) => {
  const { first_name, last_name, user_name, password, role, email } = req.body;
  console.log('Received request to make account:', req.body);
 
  try {
    const existingUser = await knex('users').where({ user_name }).first();

    if (existingUser) {
      console.log(`Username: ${user_name} already exist`);
      return;
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    await knex('users').insert({
      id: id,
      first_name: first_name,
      last_name: last_name,
      user_name: user_name,
      password: password,
      email: email,
      role: role,
    });
    console.log(`Username: ${user_name} was made successfully`);
    res.status(201).json({ data });
  } catch (err) {
    res.status(503).json({
      message: 'Post request failed. Please try again.',
    });
  }
});

module.exports = router;