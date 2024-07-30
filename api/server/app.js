const express = require('express');
// const knex = require('knex');
const cors = require('cors');
const bodyParser = require('body-parser');
// const knexConfig = require('./knexfile');
const port = process.env.port || 5000;



const app = express();
// Server start
app.listen(port, console.log(`server running on port ${port}`))

app.use(cors());
app.use(bodyParser.json());

// Home route
app.get('/', (req, res) => {
    res.send('Space Force isnt a real branch');
});
// Get all users
app.get('/users', async (req, res) => { 
  try {
    const users = await db('users').select('*');
    res.json(users);
  } catch (error) {
    res.status(503).json({ error: 'Database error' });
  }
    res.send('Everyone in the Army wants to be in the Space Force')
});
// Get a specific user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await db('users').where({ id:req.params.id }).first();
    res.json(user);
  } catch (error) {
    res.status(503).json({error: 'Database error'});
  }
  res.send('Everyone in the Army wants to be in the Space Force')
})
// Get all chats
app.get('/chats', async (req, res) => {
  try {
    const chats = await db('chats').select('*');
    res.json(chats);
  } catch (error) {
    res.status(503).json({ error: 'Database error' });
  }
  res.send('Everyone in the Army wants to be in the Space Force')
})
// Get a specific chat by Id
app.get('/chat/:id', async (req, res) => {
  try {
    const chat = await db('chats').where({ id:req.params.id }).first();
    res.json(chat);
  } catch (error) {
    res.status(503).json({error: 'Database error'});
  }
  res.send('Everyone in the Army wants to be in the Space Force')
})
// Post a new message
app.post('/messages', async (req, res) => {
  try {
    const { content, user_id, chat_id } = req.body;
    const [id] = await db('messages').insert({ content, user_id, chat_id }).returning('id');
    const message = await db('messages').where({ id }).first();
    res.status(201).json(message);
  } catch (error) {
    res.status(503).json({ error: 'Database error' }); 
  }
  res.send('Post to /messages')
})
// Post a new sign up
app.post('/signup', async (req, res) => {
  res.send('Post to /account')
})

