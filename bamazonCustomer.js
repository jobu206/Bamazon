// dotenv file to contain db configuration
require('dotenv').config();
// required dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const Table = require('cli-table3');
const colors = require('colors');

// connection script
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// connection.connect(function (err) {
//     if (err) throw err;
//     console.log(colors.yellow("Welcome to Bamazon! You are now connected to the Store as id " + connection.threadId));
// });

function displayProducts() {
    console.log("\nWelcome to Bamazon!".yellow.underline);
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Cli-Table display code with Color
        let table = new Table(
            {
                head: ["ID".cyan.bold, "Product Name".cyan.bold, "Department Name".cyan.bold, "Price".cyan.bold, "Qty".cyan.bold],
                colWidths: [5, 45, 20, 12, 12],
            });

        // Set/Style table headings and Loop through entire inventory
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].prod_name, res[i].dept_name, parseFloat(res[i].price).toFixed(2), res[i].stock_qty]
            );
        }
        console.log(table.toString());
        placeOrder();
    });
}

function placeOrder() {
    inquirer.prompt([
        {
            name: "prodId",
            type: "number",
            message:"Please enter Item ID you like to purchase."
        },
        {
            name:"qty",
            type:"number",
            message:"How many items do you wish to purchase?"
        },
    ]).then(function(answer) {
        checkInvetory(answer);
    });
};

function checkInvetory(answer) {
    connection.query("SELECT * FROM products WHERE ?",
        {
            item_id: answer.prodId
        },
        function(err, res) {
            if (err) throw err;
            if (res[0].stock_qty < answer.qty) {
                console.log("We're sorry, but we are unable to fulfill your order.".red);
                connection.end();
            } else {
                updateDB(answer, res);
                // connection.end();
            }
        }
    );
}

function updateDB(answer, res) {
    connection.query("UPDATE products SET ? WHERE ?", [
        {
            stock_qty: res[0].stock_qty - answer.qty
        },
        {
            item_id: answer.prodId
        }
    ], 
    function (err) {
        if (err) throw err;
        let num = res[0].price * answer.qty;
        let n = num.toFixed(2);
        console.log("Your total price is: " + '$'.yellow + n.yellow);
    })
    displayProducts();
}

displayProducts();