/**
 *
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 *
 *
 *
 */
exports.up = function (knex) {
  return knex.schema.createTable('groups', function (table) {
    table.uuid('group_id').primary();
    table.string('group_name').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('groups');
};
