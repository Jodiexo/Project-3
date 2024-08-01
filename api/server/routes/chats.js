const router = express.Router();
const express = require('express');
const knex = require('knex')(
  require('../../knexfile.js')[process.env.NODE_ENV || 'development'],
);


// Get all chats
router.get('/', (req, res) => {
  knex('chats')
    .select('*')
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
    .where({ id: req.params.id })
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again',
      }),
    );
});

router.post('/messages', (req, res) => {
    const { content, user_id, chat_id } = req.body;
    knex('messages')
      .insert({ content: content, user_id: user_id, chat_id: chat_id })
      .then((data) => res.status(201).json(data))
      .catch((err) =>
        res.status(503).json({
          message: 'Post request failed. Please try again.',
        }),
      );
  });

  module.exports = router;