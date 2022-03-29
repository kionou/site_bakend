const mysql = require('mysql')
require('dotenv').config()



let db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,


    // host:'localhost',
    // user:'root',
    // password:'',


    database:process.env.DB_NAME,
});

module.exports= db;

