const dbConn = require('../database/mysqlConn');

// 로그인
const login = async (id, pw) => {
    const conn = await dbConn.pool.getConnection();

    try {
        await conn.beginTransaction(); // Start Transaction
        const [row, fileds] = await conn.query(
            `select (
                select count(*) cnt
                from LOGIN_ID
                where id = ?
            ) id_cnt,
            (
                select count(*) cnt from LOGIN_ID where id = ? and pw = ?
            ) pw_cnt;`,
            [id, id, pw]
        );

        let id_cnt = row[0].id_cnt; // ID 유무
        let pw_cnt = row[0].pw_cnt; // PW 유무

        if (row[0].id_cnt === 1 && row[0].pw_cnt === 1) { // 계정이 존재한다면
            const [row2, fields2] = await conn.query(
                `select * from LOGIN_ID where id = ? and pw = ?;`,
                [id, pw]
            );
            return { "success": 1 }; // 로그인 성공
        } else {
            if (id_cnt == 0) {
                return { "success": 0, "error_code": 1 }; // id가 없음
            } else if (pw_cnt == 0) {
                return { "success": 0, "error_code": 2 }; // 비밀번호가 틀림
            }
        }

        await conn.commit(); // Terminate Transaction
        conn.release();
    } catch (err) {
        await conn.rollback(); // Rollback
        conn.release();
        return err;
    }
}

module.exports = {
    login: login
}