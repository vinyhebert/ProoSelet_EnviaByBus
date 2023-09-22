"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inserirDadosValidosNoMySQL = void 0;
const connections_1 = require("../database/connections");
// Função para criar a tabela "transactions" se não existir
function createTransactionsTable(connection, callback) {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS transactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      Tipo INT NOT NULL,
      Data DATE,
      Valor DECIMAL(10, 2),
      CPF VARCHAR(11),
      Cartao VARCHAR(16),
      Dono_da_loja VARCHAR(255),
      Nome_da_loja VARCHAR(255),
      FOREIGN KEY (Tipo) REFERENCES transactionTypes(ID)
    )
  `;
    connection.query(createTableQuery, (err) => {
        if (err) {
            console.error('Erro ao criar a tabela "transactions":', err);
        }
        else {
            console.log('Tabela "transactions" criada com sucesso ou já existe.');
        }
        callback();
    });
}
const inserirDadosValidosNoMySQL = (data) => {
    connections_1.default.getConnection((err, connection) => {
        if (err) {
            console.error('Erro ao conectar ao MySQL:', err);
            return;
        }
        console.log('Conexão ao MySQL bem-sucedida.');
        // Verificar e criar a tabela "transactions" se necessário
        createTransactionsTable(connection, () => {
            // Agora podemos inserir os dados na tabela
            const sql = 'INSERT INTO transactions (Tipo, Data, Valor, CPF, Cartao, Dono_da_loja, Nome_da_loja) VALUES ?';
            const values = data.map((item) => [
                item.Tipo,
                item.Data,
                item.Valor,
                item.CPF,
                item.Cartao,
                item['Dono da loja'],
                item['Nome_da_loja'],
            ]);
            console.log(sql, values);
            connection.query(sql, [values], (err, result) => {
                if (err) {
                    console.error('Erro ao inserir dados no MySQL:', err);
                }
                else {
                    console.log('Transações válidas inseridas com sucesso.');
                }
                connection.release();
            });
        });
    });
};
exports.inserirDadosValidosNoMySQL = inserirDadosValidosNoMySQL;
//# sourceMappingURL=insertTrans.js.map