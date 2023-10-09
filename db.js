const mysql = require('mysql2');

const config = {
    host: 'localhost',
    port: 3306,
    database: 'backend',
    user: 'root',
    password:'12345'
    
};

const conn = mysql.createConnection(config);

conn.connect((err) =>{
    if (err) {
        console.log("ERROR OCURRED WHILE CONNECTING TO MYSQL DATABASSE.", err);
    } else {
        console.log("CONNECTION WITH MYSQL DATABASE CREATED SUCCESSFULLY.");
    }
});

module.exports = conn;