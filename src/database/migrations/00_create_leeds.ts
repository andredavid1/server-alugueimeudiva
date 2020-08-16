import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('leeds', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('leeds');
}