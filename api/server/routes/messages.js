const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const knex = require('knex')(
  require('../../knexfile.js')[process.env.NODE_ENV || 'development'],
);

router.get('/users/:userId', (req, res) => {
  knex('messages')
    .select('*')
    .where('recieving_id', user_id)
    .orWhere('sending_id', user_id)
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({
        message: 'We could not find your messages. Please try again',
      }),
    );
});

router.post('/', async (req, res) => {
  const { message_body, recieving_id, sending_id, chat_id } = req.body;
  console.log('Received request to make account:', req.body);

  try {
    const existingMessage = await knex('messages')
      .where({ recieving_id })
      .first();

    if (existingMessage) {
      console.log(`Message: Chat with ${existingMessage} already exist`);
      return;
    }
    const id = uuidv4();

    await knex('users').insert({
      message_id: id,
      message_body: message_body,
      recieving_id: recieving_id,
      sending_id: sending_id,
      chat_id: chat_id,
    });
    console.log(`Message: ${recieving_id} has recieved the message`);
    res.status(201).json({ data });
  } catch (err) {
    res.status(503).json({
      message: 'Post request failed. Please try again.',
    });
  }
});

//router.get(id) (get a singular message specific to a single message channel via its ID)
router.get('/:id', (req, res) => {
  knex('messages')
    .select('*')
    .where({ message_id: req.params.id })
    .first()
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          message:
            'The data you are looking for could not be found. Please try again',
        });
      }
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error('Error fetching messages:', error);
      res.status(500).json({
        msa: 'Internal server error',
      });
    });
});

router.put('/:id', (req, res) => {
  const { message_body } = req.body;
  knex('messages')
    .where({ message_id: req.params.id })
    .update({ message_body: message_body })
    .then((data) => res.status(201).json(data))
    .catch((err) =>
      res.status(503).json({
        message: 'Message update failed. Please try again.',
      }),
    );
});

//router.delete(id) delete a comment from a specific message
router.delete('/:id', (req, res) => {
  knex('messages')
    .where({ message_id: req.params.id })
    .del()
    .then((deletedCount) => {
      if (deletedCount === 0) {
        return res.status(404).json({
          message:
            'The data you are looking for could not be found. Please try again',
        });
      }
      res.status(200).json({
        message: 'Message successfully deleted',
      });
    })
    .catch((error) => {
      console.error('Error deleting message:', error);
      res.status(500).json({
        message: 'Internal server error',
      });
    });
});
module.exports = router;
