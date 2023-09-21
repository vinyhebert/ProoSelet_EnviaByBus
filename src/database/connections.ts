import * as mysql from 'mysql2';

// Configurações de conexão do banco de dados
const dbConfig: mysql.PoolOptions = {
    host: 'enviabybus-db-1',
    user: 'enviaByBus',
    password: 'enviaByBuspwd',
    database: 'enviaByBus',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
  
  // Criação do pool MySQL
  const pool = mysql.createPool(dbConfig);
  
  export default pool;