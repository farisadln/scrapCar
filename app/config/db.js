let mysql = require('mysql');
let db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'cararena_be'
});

db.connect(function(err) {
    if (err) throw err;
});

module.exports = db ;