const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Anim123catas",
    database: "Expensedb"
})

db.connect((err) => {
    if(err) {
        console.log(`Error connecting to database connection could not be established ${err}`)
        return;
    }
    console.log('Connected to the database successfully.')
})


module.exports = db;
