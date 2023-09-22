

module.exports = {
    client: 'mysql',
    connection: {
        host: '"192.168.176.2"',
        user: 'enviaByBus',
        password: 'enviaByBuspwd',
        database: 'enviaByBus',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    },
    migrations: {
      directory: './src/database/migrations', // O diretório onde suas migrações estão localizadas
    },
  };
  