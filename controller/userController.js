const dbConn = require('../database/mysqlConn');

// 유저 정보
const GetUserInfo = async (userNumber) => {
    const conn = await dbConn.pool.getConnection();
    try {
        const [row, fields] = await conn.query(
            "select * from LOGIN_ID_PROFILE where NO = ?",
            [userNumber]
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