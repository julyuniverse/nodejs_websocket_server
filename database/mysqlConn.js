const mysql = require('mysql2/promise');
const dbInfo = require('./mysqlInfo'); // 데이터베이스 정보

// 데이터베이스 연결
const pool = mysql.createPool({
    host: dbInfo.host,
    port: dbInfo.port,
    user: dbInfo.user,
    password: dbInfo.password,
    database: dbInfo.database,
    waitForConnections: true,
    connectionLimit: dbInfo.connectionLimit,
    queueLimit: 0
});

module.exports = {
    pool: pool
}