var mysql = require('mysql');
//datebase config
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'ixnzh1cxch6rtdrx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'rtizubhrz5m1an0w',
    password: 'x7gxmcyadjijm84r',
    database: 'lkuckwgxzsncnhvw',
    waitForConnections: true,
    multipleStatements: true
});

module.exports = pool;