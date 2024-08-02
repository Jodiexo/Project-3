exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('user_name').notNullable().unique();
    table.string('password').notNullable();
    table.string('email').notNullable().unique();
    table.specificType('role', 'text[]').notNullable();
    table.timestamps(true, true); // Adds created_at and updated_at
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};