import pool from "../database/connections";
import { PoolConnection } from 'mysql2'

export const inserirDadosValidosNoMySQL = (data: any[]) => {
    pool.getConnection((err, connection: PoolConnection) => {
      if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
      }
      console.log('Conexão ao MySQL bem-sucedida.');
  
      // Inserir os dados no banco de dados
      const sql = 'INSERT INTO transactions (Tipo, Data, Valor, CPF, Cartao, Dono_da_loja, Nome_da_loja) VALUES ?';
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
          console.log('Transações válidas inseridas com sucesso.');
        }
  
        connection.release(); // Liberar a conexão de volta ao pool
      });
    });
  };