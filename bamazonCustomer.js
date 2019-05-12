const mysql = require('mysql');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
    // Host Name
    host: 'localhost',
    // username
    user: 'root',

    // Password
    password: '',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

