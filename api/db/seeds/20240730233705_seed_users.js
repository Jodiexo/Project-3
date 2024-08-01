const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // Hash the password
  const hashedPassword = await bcrypt.hash('password123', 10);

  await knex('users').insert([
    {
      id: uuidv4(),
      first_name: 'John',
      last_name: 'Doe',
      user_name: 'johndoe',
      password: hashedPassword,
      email: 'johndoe@example.com',
      role: ['user'],
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      first_name: 'Jane',
      last_name: 'Doe',
      user_name: 'janedoe',
      password: hashedPassword,
      email: 'janedoe@example.com',
      role: ['user'],
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      first_name: 'Admin',
      last_name: 'User',
      user_name: 'admin',
      password: hashedPassword,
      email: 'admin@example.com',
      role: ['admin'],
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      first_name: 'a',
      last_name: 'a',
      user_name: 'a',
      password: a,
      email: 'a@a.com',
      role: ['admin'],
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
