const dbConn = require('../database/mariadbConn');

// 유저 정보
async function GetUserInfo() {
    let conn, rows;
    try {
        conn = await dbConn.pool.getConnection();
        rows = await conn.query('select * from LOGIN_ID_PROFILE where NO = 1;');
    } catch(err) {
        throw err;
    } finally {
        if(conn) conn.end();
        return rows;
    }
}

module.exports = {
    getUserInfo: GetUserInfo
}