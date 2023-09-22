"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Crie a tabela transactionTypes
        yield knex.schema.createTable('transactionTypes', (table) => {
            table.increments('ID').primary();
            table.string('Descricao').notNullable();
        });
        // Insira os valores na tabela transactionTypes
        yield knex('transactionTypes').insert([
            { Descricao: 'Débito' },
            { Descricao: 'Crédito' },
            { Descricao: 'Pix' },
            { Descricao: 'Financiamento' },
        ]);
        // Crie a tabela transactions
        yield knex.schema.createTable('transactions', (table) => {
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
        yield knex.schema.createTable('transactionErrors', (table) => {
            table.increments('id').primary();
            table.string('Tipo');
            table.date('Data');
            table.decimal('Valor', 10, 2);
            table.string('CPF');
            table.string('Cartao');
            table.string('Dono_da_loja');
            table.string('Nome_da_loja');
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.down = down;
//# sourceMappingURL=001_create_tables.js.map