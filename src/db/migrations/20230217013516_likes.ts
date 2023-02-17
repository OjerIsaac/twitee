import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('likes', table => {
    table.increments('id').primary();
    table.integer('twit_id').unsigned().notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('twit_id').references('twits.id');
    table.foreign('user_id').references('users.id');
    table.unique(['twit_id', 'user_id']);
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('likes');
}