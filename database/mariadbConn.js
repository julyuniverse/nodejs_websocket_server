const mariadb = require('mariadb');
const dbInfo = require('./mariadbInfo'); // 데이터베이스 정보

module.exports = () => {
    // 데이터베이스 연결
    const pool = mariadb.createPool({
        host: dbInfo.host,
        port: dbInfo.port,
        user: dbInfo.user,
        password: dbInfo.password,
        database: dbInfo.database,
        connectionLimit: dbInfo.connectionLimit,
    });
}