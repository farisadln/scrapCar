let mysql = require('mysql');
let db = mysql.createConnection({
    host     : 'localhost',
    user     : 'rose',
    password : '',
    database : 'cararena_be'
});

db.connect(function(err) {
    if (err) throw err;
});

module.exports = db ;