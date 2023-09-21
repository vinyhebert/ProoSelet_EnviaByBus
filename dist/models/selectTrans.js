"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consultarTransValidasNoMySQL = void 0;
const connections_1 = require("../database/connections");
// Exporte uma função para consultar dados no MySQL
const consultarTransValidasNoMySQL = () => {
    return new Promise((resolve, reject) => {
        connections_1.default.getConnection((err, connection) => {
            if (err) {
                console.error('Erro ao obter conexão do pool:', err);
                return reject(err);
            }
            const sql = 'SELECT * FROM transactions';
            connection.query(sql, (err, results) => {
                // Libera a conexão de volta para o pool
                connection.release();
                if (err) {
                    console.error('Erro ao consultar dados no MySQL:', err);
                    return reject(err);
                }
                console.log('Transações validas consultadas com sucesso.');
                const transacoes = results;
                resolve(transacoes);
            });
        });
    });
};
exports.consultarTransValidasNoMySQL = consultarTransValidasNoMySQL;
//# sourceMappingURL=selectTrans.js.map