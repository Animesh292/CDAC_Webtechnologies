const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Anim123catas',
    database: 'librarydb'
})

db.connect((err) => {
    if(err) {
        console.log(`Unable to connect to database ${err}`)
        return;
    }
    console.log('Connected with the database Successfully.')
    return;
})

module.exports = db;