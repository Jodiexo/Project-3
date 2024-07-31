/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('messages', function (table) {
    table.uuid('message_id').primary();
    table.text('message_body').notNullable();
    table
      .uuid('receiving_uid')
      .references('users')
      .onDelete('CASCADE')
      .nullable();
    table
      .uuid('sending_uid')
      .references('users')
      .onDelete('CASCADE')
      .notNullable();
    table.uuid('group_id').references('groups').onDelete('CASCADE').nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('messages');
};
