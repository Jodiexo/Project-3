const express = require('express');
const router = express.Router();
const knex = require('knex')(
  require('../../knexfile.js')[process.env.NODE_ENV || 'development'],
);
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res) => {
  const { chat_name } = req.body;
  console.log('Received request to make a chat:', req.body);

  try {
    const existingChat = await knex('chats').where({ chat_name }).first();

    if (existingMessage) {
      console.log(`Message: Chat ${existingChat} already exist`);
      return;
    }
    const id = uuidv4();

    await knex('users').insert({
      chat_id: id,
      chat_name: message_body,
    });
    console.log(`Message: ${chat_name} has been created`);
    res.status(201).json({ data });
  } catch (err) {
    res.status(503).json({
      message: 'Post request failed. Please try again.',
    });
  }
});

// Get all chats
router.get('/', (req, res) => {
  const { id } = req.head;
  const { body } = req.body;
  knex('chats')
    .select('*')
    .where(id === chat_id && body === chat_name)
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again',
      }),
    );
});

// Get a specific chat by Id
router.get('/:id', (req, res) => {
  knex('chats')
    .select('*')
    .where({ chat_id: req.params.id })
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again',
      }),
    );
});

//router.delete(id) delete a comment from a specific message
router.delete('/:id', (req, res) => {
  knex('chats')
    .where({ chat_id: req.params.id })
    .del()
    .then((deletedCount) => {
      if (deletedCount === 0) {
        return res.status(404).json({
          message:
            'The data you are looking for could not be found. Please try again',
        });
      }
      res.status(200).json({
        message: 'Chat successfully deleted',
      });
    })
    .catch((error) => {
      console.error('Error deleting chat:', error);
      res.status(500).json({
        message: 'Internal server error',
      });
    });
});

module.exports = router;
