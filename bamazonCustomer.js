// dotenv file to contain db configuration
require('dotenv').config();
// required dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const Table = require('cli-table3');
const colors = require('colors');

// connection script
const connection = mysql.createConnection({
    // Host Name
    host: process.env.DB_HOST,
    // Username
    user: process.env.DB_USER,
    // Password
    password: process.env.DB_PASS,
    // DB Name
    database: process.env.DB_NAME
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(colors.yellow("Welcome to Bamazon! You are now connected to the Store as id " + connection.threadId));

    bamazon();
});

function bamazon() {
    connection.query ("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Cli-Table display code with Color
        let table = new Table(
            {
                head: ["Product ID".cyan.bold, "Product Name".cyan.bold, "Department Name".cyan.bold, "Price".cyan.bold, "Quantity".cyan.bold],
                colWidths: [12, 75, 20, 12, 12],
            });

        // Set/Style table headings and Loop through entire inventory
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].prod_name, res[i].dept_name, parseFloat(res[i].price).toFixed(2), res[i].stock_qty]
            );
        }
        console.log(table.toString());
    });
}