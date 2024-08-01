const router = express.Router();
const express = require('express');
const bcrypt = require('bcrypt');
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

router.post('/create', (req, res) => {
  const { first_name, last_name, user_name, password, role, email } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      const id = uuidv4();
      return knex('users').insert({
        id,
        first_name,
        last_name,
        user_name,
        password: hashedPassword,
        email,
        role,
      });
    })
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      console.error('Error creating user:', err);
      res.status(503).json({
        message: 'Post request failed. Please try again.',
      });
    });
});

module.exports = router;
