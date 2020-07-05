let mysql = require('mysql');
let db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'cararena_be'
});

db.connect(function(err) {
    if (err) throw err;
});

module.exports = db ;