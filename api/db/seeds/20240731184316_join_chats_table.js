/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('table_name').del();
  await knex('table_name').insert([
    {
      user_id: chats[0].chat_id,
      chat_id: users[0].user_id,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: chats[0].chat_id,
      chat_id: users[1].user_id,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: chats[1].chat_id,
      chat_id: users[2].user_id,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
