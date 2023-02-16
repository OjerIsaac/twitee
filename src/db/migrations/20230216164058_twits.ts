import { Knex } from 'knex';

async function createTwitsTable(knex: Knex, table: Knex.CreateTableBuilder) {
    table.increments('id').primary();
    table.text('twit').notNullable();
    table.string('attachment').nullable();
    table.integer('likes').nullable();
    table.integer('user_id').unsigned().notNullable(); // add a foreign key column
    table.foreign('user_id').references('users.id'); // define the foreign key constraint
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
  }
  
  export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('twits', table => createTwitsTable(knex, table));
    console.log('Tables created!');
  }
  
  export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('twits');
  }