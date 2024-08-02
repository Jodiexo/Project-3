const { v4: uuidv4 } = require('uuid');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('messages').del();

  const users = await knex('users').select('id');
  const chats = await knex('chats').select('chat_id');

  await knex('messages').insert([
    {
      message_id: uuidv4(),
      message_body: "Docker isn't real",
      receiving_id: users[0].id,
      sending_id: users[1].id,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      message_id: uuidv4(),
      message_body: "Where's dad?",
      receiving_id: users[1].id,
      sending_id: users[2].id,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      message_id: uuidv4(),
      message_body: 'Hello World!',
      chat_id: chats[0].chat_id,
      sending_id: users[0].id,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      message_id: uuidv4(),
      message_body: "There ain't no m**f**n snakes on this m**f**n plane",
      chat_id: chats[0].chat_id,
      sending_id: users[1].id,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};