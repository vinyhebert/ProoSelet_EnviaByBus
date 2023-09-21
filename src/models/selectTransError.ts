
import pool from '../database/connections';

// Exporte uma função para consultar dados no MySQL
export const consultarTransInvalidasNoMySQL = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Erro ao obter conexão do pool:', err);
                return reject(err);
            }

            const sql = 'SELECT * FROM transactionErrors';

            connection.query(sql, (err, results) => {
                // Libera a conexão de volta para o pool
                connection.release();

                if (err) {
                    console.error('Erro ao consultar dados no MySQL:', err);
                    return reject(err);
                }

                console.log('Transações invalidas consultadas com sucesso.');
                resolve(results);
            });
        });
    });
};
