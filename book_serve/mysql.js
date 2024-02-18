const mysql = require('mysql')


const client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'book_serve',
    post: 3306
})

function sqlFn(sql, arr, callback) {
    client.query(sql, arr, function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        callback(res);
    })
}


module.exports = sqlFn;