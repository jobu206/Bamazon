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
    console.log(chalk.yellow.bgRed('Welcome to the Bamazon Store Database. You are connected via as ID: '+connection.threadId));

    // bamazon main function call
    bamazon();
});

function bamazon() {
    connection.query("SELECT * FROM products",function(err,res) {
        if(err) throw err;

        table = new Table(
            {
                head: ["Product ID".red.bold, "Product Name".red.bold, "Department Name".cyan.bold, "Price".red.bold, "Quantity".red.bold],
                colWidths: [12, 75, 20, 12, 12],
            });
            // 
            for (let i = 0; i < res.length; i++) {
                table.push(
                    [res[i].item_id,res[i].product_name,res[i].department_name,parseFloat(res[i].price).toFixed(2),res[i].stock_quantity]
                )
            }
            console.log(table.toString);

            // prompt shopper for input
            inquirer.prompt([
                {
                    type: "number",
                    message: "Please enter the Product ID of the item that you would like to buy.".green,
                    name: "id"
                },
                {
                    type: "number",
                    message: "How many would you like to buy?",
                    name: "quantity"
                },
            ])
            // Ordering function
            .then(function (cart) {
                
            })
    });
}