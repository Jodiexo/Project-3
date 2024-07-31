const { v4: uuidv4 } = require ('uuid');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV||'development'])
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Home route
app.get('/', (req, res) => {
  res.send('Space Force isnt a real branch');
});
// Get all users
app.get('/users', async (req, res) => {
  knex('users')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});
// Get a specific user by ID
app.get('/users/:id', async (req, res) => {
  knex('users')
    .select('*')
    .where({ id:req.params.id })
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
})
// Get all chats
app.get('/chats', async (req, res) => {
  knex('chats')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
})
// Get a specific chat by Id
app.get('/chat/:id', async (req, res) => {
  knex('chats')
    .select('*')
    .where({ id:req.params.id })
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
})
// Post a new message
app.post('/messages', async (req, res) => {
  const { content, user_id, chat_id } = req.body;
  knex('messages')
    .insert({ content: content, user_id: user_id, chat_id: chat_id })
    .then(data => res.status(201).json(data))
    .catch(err => 
      res.status(503).json({
        message: 'Post request failed. Please try again.'
      })
    )
  //   try {
  //   const [id] = await chapp_db('messages').insert({ content, user_id, chat_id }).returning('id');
  //   const message = await chapp_db('messages').where({ id }).first();
  //   res.status(201).json(message);
  // } catch (error) {
  //   res.status(503).json({ error: 'Database error' }); 
  // }
})
// Post a new user upon sign up
app.post('/users', async (req, res) => {
  const { first_name, last_name, user_name, password, role, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10)
  const id = uuidv4();

  knex('messages')
    .insert({ id: id, first_name: first_name, last_name: last_name, user_name: user_name, password: hashedPassword, email: email, role: role })
    .then(data => res.status(201).json(data))
    .catch(err => 
      res.status(503).json({
        message: 'Post request failed. Please try again.'
      })
    )
  // try {
  //   await chapp_db('users').insert({ id, first_name, last_name, user_name, hashedPassword, role, email });
  //   const newUser = await chapp_db('users').where({ id }).first();
  //   res.status(201).json(newUser);
  // } catch (error) {
  //   res.status(503).json({ error: 'Database error' }); 
  // }
})

const authRoutes = require('./routes/auth'); //checks if user password matches via routes
app.use('/users', authRoutes);

module.exports = app;