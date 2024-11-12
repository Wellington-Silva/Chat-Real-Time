import mysql from "mysql2";

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Arvoredeip@1',
    database: 'chat',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;