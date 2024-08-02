// const { v4: uuidv4 } = require('uuid');

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.seed = async function (knex) {
//   // Deletes ALL existing entries
//   await knex('groupchats_join').del();

//   const users = await knex('users').select('id');
//   const chats = await knex('group_chats').select('chat_id');

//   await knex('chats_join').insert([
//     {
//       chat_id: group_chats[0].groupchat_id,
//       user_id: users[0].id,
//       created_at: new Date(),
//       updated_at: new Date(),
//     },
//     {
//       chat_id: group_chats[0].groupchat_id,
//       user_id: users[1].id,
//       created_at: new Date(),
//       updated_at: new Date(),
//     },
//     {
//       chat_id: group_chats[1].groupchat_id,
//       user_id: users[2].id,
//       created_at: new Date(),
//       updated_at: new Date(),
//     },
//   ]);
// };