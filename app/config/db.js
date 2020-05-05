const mysql = require('mysql');
module.exports = ()=>{

    const db = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'Hello'
    });

};

