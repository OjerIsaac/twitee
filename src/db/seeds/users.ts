import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { name: 'user1', email: 'user1@example.com', password: '$2b$10$JFCihzzFX5dnBcC0gYgExOjQRokVca33PtBYOSSaR0u7QZ3N/tISy' }, // password
        { name: 'user2', email: 'user2@example.com', password: '$2b$10$JFCihzzFX5dnBcC0gYgExOjQRokVca33PtBYOSSaR0u7QZ3N/tISy' }, // password
        { name: 'user3', email: 'user3@example.com', password: '$2b$10$JFCihzzFX5dnBcC0gYgExOjQRokVca33PtBYOSSaR0u7QZ3N/tISy' } // password
    ]);
};
