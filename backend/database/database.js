const mariadb = require('mariadb');
const pool = mariadb.createPool({host: process.env.DB_HOST, user: process.env.DB_USER, connectionLimit: 5});

async function query(sql, props) {
    let conn;
    let res;
    try {
        conn = await pool.getConnection();
        res = await conn.query(sql, props);
    } catch (err) {
        throw err;
    } finally {
        if(conn) conn.release(); //release to pool
        if (res.meta) delete res.meta;
        return res;
    }
}

async function getOne(sql, props) {
    const answer = await query(sql, props);
    return answer[0];
}

modules.export = {
    query,
    getOne
};