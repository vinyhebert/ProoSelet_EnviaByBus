"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inserirDadosInvalidosNoMySQL = void 0;
const connections_1 = require("../database/connections");
const inserirDadosInvalidosNoMySQL = (data) => {
    connections_1.default.getConnection((err, connection) => {
        if (err) {
            console.error('Erro ao conectar ao MySQL:', err);
            return;
        }
        console.log('Conexão ao MySQL bem-sucedida.');
        // Inserir os dados no banco de dados
        const sql = 'INSERT INTO transactionErrors (Tipo, Data, Valor, CPF, Cartao, Dono_da_loja, Nome_da_loja) VALUES ?';
        const values = data.map((item) => [
            item.Tipo,
            item.Data,
            item.Valor,
            item.CPF,
            item.Cartao,
            item['Dono da loja'],
            item['Nome da loja'],
        ]);
        console.log(sql, values);
        connection.query(sql, [values], (err, result) => {
            if (err) {
                console.error('Erro ao inserir dados no MySQL:', err);
            }
            else {
                console.log('Transações que não deram certo, inseridas com sucesso.');
            }
            connection.release(); // Liberar a conexão após a inserção
        });
    });
};
exports.inserirDadosInvalidosNoMySQL = inserirDadosInvalidosNoMySQL;
//# sourceMappingURL=insertTransErrors.js.map