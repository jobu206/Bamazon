DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;
CREATE TABLE products (
	item_id INT NOT NULL auto_increment PRIMARY KEY,
    product_name VARCHAR(200) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(13,2) NOT NULL,
    stock_quantity INT NOT NULL
);

INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES 
('Beats Headphones','Electronics',224.95,15),
('Testimony','Books',10.91,5),
('Cracking The Coding Interview','Books',29.47,10),
('Big Green Egg','Garden & Outdoor',225,3),
('Nest Thermostat','Home Improvement',220,75),
('TaylorMade Driver','Sports & Fitness',199.99,15),
('Gumby Dog Toy','Pet Supplies',3.99,20),
('Magic Mouse','Electronics',99.99,33),
('Echo','Surveillance',64.99,27),
('Alpine Car Stereo','Electronics',110.95,1);

SELECT * FROM products;