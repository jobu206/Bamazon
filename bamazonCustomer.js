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
    // Username
    user: process.env.DB_USER,
    // Password
    password: process.env.DB_PASS,
    // DB Name
    database: process.env.DB_NAME
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(chalk.green('Welcome to the Bamazon Store Database. You are connected to Bamazon as ID: ' + connection.threadId));

    // bamazon main function call
    showProduct();
});

function showProduct() {
    connection.query('SELECT `item_id`, `product_name`,`price` FROM products', function name(err, res) {
        if (err) throw err;
        console.log(res);
        buyProduct();
    });
}

function buyProduct() {
    inquirer
        .prompt([
            {
                name: 'item',
                type: 'number',
                message: 'Enter the ID of the product you wish to purchase.'
            },
            {
                name: 'units',
                type: 'number',
                message: 'How many units of the product would you like to purchase?'
            }
        ])
        .then(function (answer) {
            console.log('answer', answer);
            verifyInventory(answer);
        });
}
function verifyInventory(answer) {
    connection.query('SELECT `stock_quantity`,`price` FROM products WHERE ?',
        {
            item_id: answer.item,
        },
        function (err, res) {
            if (err) throw err;
            console.log(res);
            if (res[0].stock_quantity < answer.this) {
                console.log(chalk.red('I\'m sorry, but we do not have enough inventory to cover your order.'));
                connection.end();
            } else {
                // updateDB(answer,res);
                // connection.end();
                console.log('this is working!');
            }
        }
    );
}