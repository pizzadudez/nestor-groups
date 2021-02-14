exports.up = function (knex) {
  return knex.schema
    .createTable('groups', (table) => {
      table.increments('id');
      table.string('name').notNullable().unique();

      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

      table.integer('belongs_to').references('groups.id').defaultTo(null);
    })
    .createTable('persons', (table) => {
      table.increments('id');
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('job_title').notNullable();

      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

      table.integer('belongs_to').references('groups.id').defaultTo(null);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('persons').dropTable('groups');
};
