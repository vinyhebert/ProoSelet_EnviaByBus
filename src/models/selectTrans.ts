import poolSQL from '../database/connections';
import { Transacao } from '../interfaces'; 

// Exporte uma função para consultar dados no MySQL
export const consultarTransValidasNoMySQL = (): Promise<Transacao[]> => {
    return new Promise((resolve, reject) => {
        poolSQL.getConnection((err, connection) => {
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
                const transacoes: Transacao[] = results as Transacao[];
                resolve(transacoes);
            });
        });
    });
};
