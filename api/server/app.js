const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Space Force isnt a real branch');
});

// Import and using routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const chatRoutes = require('./routes/chats');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/chats', chatRoutes);

module.exports = app;
