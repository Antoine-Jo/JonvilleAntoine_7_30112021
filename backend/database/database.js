const mariadb = require('mariadb');
const pool = 
    mariadb.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 10,
        allowPublicKeyRetrieval: true
    });

exports.query = async (sql, props) => {
    let conn;
    let res;
    try {
        conn = await pool.getConnection();
        res = await conn.query(sql, props);
        return res;
    } catch(err) {
        throw err
    }
    finally {
        if(conn) conn.release(); //release to pool
        // if (res.meta) delete res.meta; //delete meta
        console.log('Je suis connecté !');
        // return res;
    }
}

// modules.export = {
//     // query,
//     getOne
// };