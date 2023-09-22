import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Crie a tabela transactionTypes
  await knex.schema.createTable('transactionTypes', (table) => {
    table.increments('ID').primary();
    table.string('Descricao').notNullable();
  });

  // Insira os valores na tabela transactionTypes
  await knex('transactionTypes').insert([
    { Descricao: 'Débito' },
    { Descricao: 'Crédito' },
    { Descricao: 'Pix' },
    { Descricao: 'Financiamento' },
  ]);

  // Crie a tabela transactions
  await knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary();
    table.string('Tipo');
    table.date('Data');
    table.decimal('Valor', 10, 2);
    table.string('CPF');
    table.string('Cartao');
    table.string('Dono_da_loja');
    table.string('Nome_da_loja');
  });

  // Crie a tabela transactionErrors
  await knex.schema.createTable('transactionErrors', (table) => {
    table.increments('id').primary();
    table.string('Tipo');
    table.date('Data');
    table.decimal('Valor', 10, 2);
    table.string('CPF');
    table.string('Cartao');
    table.string('Dono_da_loja');
    table.string('Nome_da_loja');
  });
}

export async function down(knex: Knex): Promise<void> {
  
}
