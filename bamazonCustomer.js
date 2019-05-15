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
    if (err) throw colors.red.err;
    console.log(colors.green('Connected as id ' + connection.threadId));
    // function to display database.
    displayInventory();
});
// function to display inventory
function displayInventory() {
    connection.query('SELECT `item_id`,`prod_name`,`dept_name`,`price` FROM products', function (err, res) {
        if (err) throw err;
        let table = new Table (
            {
                head: ['Product ID'.cyan.bold, 'Product Name'.cyan.bold, 'Department Name'.cyan.bold, 'Price'.cyan.bold], colWidths: [12,75,20,12]
            }
        );
        for (let i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].prod_name, res[i].dept_name, parseFloat(res[i].price).toFixed(2)]
            )
        }
        // log table in console.
        console.log(table.toString());
        // Prompt for user to enter choice
    });
}
userPrompt();

function userPrompt() {
    inquirer.prompt([
        {
            name: 'id',
            type: 'number',
            message: 'Please enter the product ID of the tiem you would like to buy'.yellow
        },
        {
            name: 'units',
            type: 'number',
            message: 'How many units would you like to buy?'
        }
    ])
    .then (function (answer) {
        console.log('answer',answer);
        checkInventory(answer);
    });
}
// function to check inventory after user chooses product to buy.
function checkInventory(answer) {
    connection.query('SELECT `stock_qty, `price` FROM products WHERE ?', 
    {
        item_id: answer.item
    },
    // function to show results
    function (err, res) {
        if (err) throw err;
        console.log(res);
        if (res[0].stock_qty < answer.units) {
            console.log(colors.red('We\'re sorry, but we are unable to fulfill this request. Please check back later.'));
            connection.end();
        } else {
            updateInventory(answer, res);
            connection.end();
        }
    });
}

// function updateInventory(answer, res) {
//     console.log(colors.green(res[0].));
//     connection.query('UPDATE produc')
// }