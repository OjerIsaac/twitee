import { Knex } from 'knex';

async function createCommentsTable(knex: Knex, table: Knex.CreateTableBuilder) {
  table.increments('id').primary();
  table.text('comment').notNullable();
  table.integer('user_id').unsigned().notNullable();
  table.foreign('user_id').references('users.id');
  table.integer('twit_id').unsigned().notNullable(); // add a foreign key column
  table.foreign('twit_id').references('twits.id'); // define the foreign key constraint
  table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
  table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
}
  
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('comments', table => createCommentsTable(knex, table));
  console.log('Tables created!');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('comments');
}