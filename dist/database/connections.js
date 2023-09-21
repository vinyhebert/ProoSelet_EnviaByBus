"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql2");
// Configurações de conexão do banco de dados
const dbConfig = {
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
exports.default = pool;
//# sourceMappingURL=connections.js.map