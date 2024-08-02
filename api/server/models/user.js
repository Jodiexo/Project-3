
const knex = require('knex')(require('../../knexfile').development);

const findUserByUsername = async (user_name) => {
  return await knex('users').where({ user_name }).first();
};

module.exports = {
  findUserByUsername,
};
