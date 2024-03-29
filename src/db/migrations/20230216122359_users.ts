import { Knex } from 'knex';

async function createUsersTable(knex: Knex, table: Knex.CreateTableBuilder) {
  table.increments('id').primary();
  table.string('name').notNullable();
  table.string('email').unique().notNullable();
  table.string('password').notNullable();
  table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
  table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
}

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => createUsersTable(knex, table));
  console.log('Tables created!');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}