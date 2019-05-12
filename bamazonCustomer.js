// dotenv file to contain db configuration
require('dotenv').config();
// required dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('cli-table3');
const chalk = require('chalk');

// connection script
const connection = mysql.createConnection({
    // Host Name
    host: process.env.DB_HOST,
    // username
    user: process.env.DB_USER,
    // Password
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(function (err) {
    if (err) throw err;
    // runSearch();
    console.log('I\'m connected!');
    
});

