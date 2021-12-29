const dbConn = require('../database/mysqlConn');

// 유저 정보
const GetUserInfo = async () => {
    const conn = await dbConn.pool.getConnection();
    try {
        const [row, fields] = await conn.query(
            "select * from LOGIN_ID_PROFILE where NO = ?",
            [1]
        );
        return row;
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

module.exports = {
    getUserInfo: GetUserInfo
}