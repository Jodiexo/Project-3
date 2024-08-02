const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const knex = require('knex')(
  require('../../knexfile.js')[process.env.NODE_ENV || 'development'],
);

// POST request to create a new group chat
router.post('/', async (req, res) => {
  const { groupchat_name } = req.body;
  console.log('Received request to create a group chat:', req.body);

  try {
    const existingChat = await knex('group_chats')
      .where({ groupchat_name })
      .first();

    if (existingChat) {
      console.log(`Group chat ${groupchat_name} already exists`);
      return res
        .status(400)
        .json({ message: `Group chat ${groupchat_name} already exists` });
    }

    const id = uuidv4();

    await knex('group_chats').insert({
      groupchat_id: id,
      groupchat_name: groupchat_name,
    });
    console.log(`Group chat ${groupchat_name} has been created`);
    res
      .status(201)
      .json({ message: `Group chat ${groupchat_name} created successfully` });
  } catch (err) {
    console.error('Error creating group chat:', err);
    res.status(503).json({ message: 'Post request failed. Please try again.' });
  }
});

// GET all group chats
router.get('/', async (req, res) => {
  try {
    const groupChats = await knex('group_chats').select('*');
    res.status(200).json(groupChats);
  } catch (err) {
    console.error('Error fetching group chats:', err);
    res.status(404).json({
      message:
        'The data you are looking for could not be found. Please try again',
    });
  }
});

// GET a specific group chat by ID
router.get('/:id', async (req, res) => {
  try {
    const groupChat = await knex('group_chats')
      .select('*')
      .where({ groupchat_id: req.params.id })
      .first();
    if (groupChat) {
      res.status(200).json(groupChat);
    } else {
      res.status(404).json({ message: 'Group chat not found' });
    }
  } catch (err) {
    console.error('Error fetching group chat:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE a specific group chat by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCount = await knex('group_chats')
      .where({ groupchat_id: req.params.id })
      .del();
    if (deletedCount === 0) {
      return res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again',
      });
    }
    res.status(200).json({ message: 'Group chat successfully deleted' });
  } catch (err) {
    console.error('Error deleting group chat:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET group chat by name
router.get('/name/:groupChatName', async (req, res) => {
  try {
    const groupChat = await knex('group_chats')
      .where('groupchat_name', req.params.groupChatName)
      .first();
    if (groupChat) {
      const response = {
        id: groupChat.groupchat_id,
        groupchat_name: groupChat.groupchat_name,
        created_at: groupChat.created_at,
        updated_at: groupChat.updated_at,
      };
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: 'Group chat not found' });
    }
  } catch (err) {
    console.error('Error fetching group chat:', err);
    res.status(500).json({ message: 'Error fetching group chat', error: err });
  }
});

module.exports = router;
