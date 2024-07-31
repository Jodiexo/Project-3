const { v4: uuidv4 } = require('uuid');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('chats').del();
  await knex('chats').insert([
    {
      group_id: uuidv4(),
      group_name: 'Special Chat',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      group_id: uuidv4(),
      group_name: '3 dudes and a canoe',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      group_id: uuidv4(),
      group_name: 'Purrbox',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      group_id: uuidv4(),
      group_name: 'Super Secret Chats',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
