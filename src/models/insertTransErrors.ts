import poolSQL from '../database/connections';
import { LineData } from '../interfaces/index' 

// Função para criar a tabela "transactionErrors" se não existir
function createTransactionErrorsTable(connection, callback) {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS transactionErrors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      Tipo VARCHAR(255),
      Data DATE,
      Valor DECIMAL(10, 2),
      CPF VARCHAR(11),
      Cartao VARCHAR(16),
      Dono_da_loja VARCHAR(255),
      Nome_da_loja VARCHAR(255)
    )
  `;

  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error('Erro ao criar a tabela "transactionErrors":', err);
    } else {
      console.log('Tabela "transactionErrors" criada com sucesso ou já existe.');
    }
    callback();
  });
}

export const inserirDadosInvalidosNoMySQL = (data: LineData[]) => {
  poolSQL.getConnection((err, connection) => {
    if (err) {
      console.error('Erro ao conectar ao MySQL:', err);
      return;
    }
    console.log('Conexão ao MySQL bem-sucedida.');

    // Verificar e criar a tabela "transactionErrors" se necessário
    createTransactionErrorsTable(connection, () => {
      // Agora podemos inserir os dados na tabela
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
        } else {
          console.log('Transações que não deram certo, inseridas com sucesso.');
        }

        connection.release(); // Liberar a conexão após a inserção
      });
    });
  });
}
