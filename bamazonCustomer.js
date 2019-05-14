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
    console.log(colors.green('Welcome to the Bamazon Store Database. You are connected to Bamazon as ID: ' + connection.threadId));

    // bamazon main function call
    bamazon();
});

function bamazon() {
    // connection query
    connection.query('SELECT * FROM products', function(err,res){
        if (err) throw err;

        // cli-table display code w/ color
        let table = new Table(
            {
                head: ['Product ID'.cyan.bold,'Product Name'.cyan.bold,'Department Name'.cyan.bold,'Price'.cyan.bold,'Quantity'.cyan.bold],
                colWidths: [12,75,20,12,12]
            }
        );

        // set & style table headings and loop through inventory
        for (let i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, parseFloat(res[i].price).toFixed(2), res[i].stock_quantity]
            );
        }
        console.log(table.toString());

        // Prompt User Input
        inquirer.prompt([
            {
                name: 'id',
                type: 'number',
                message: 'Please enter the Product ID of the item that you would like to buy?'.yellow
            },
            {
                name: 'quantity',
                type: 'number',
                message: 'How many units would you like to buy?'
            }
        ])
        .then(function(cart) {
            let qty = cart.qty;
            let itemId = cart.id;

            // connection query to verify inventory.
            connection.query('SELECT * FROM PRODUCTS WHERE id = ' + itemId)
        })
    })
}