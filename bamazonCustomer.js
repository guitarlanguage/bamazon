var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    itemsForSale();
    // connection.end();
});

function itemsForSale() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log space for better terminal viewing experience
        console.log(`
            `);
        //log each element in the products table
        res.forEach(function(elem) {
            console.log(`Id Number: ${elem.item_id} | ${elem.product_name} | Department: ${elem.department_name} | Price: $${elem.price} | In Stock: ${elem.stock_quantity}`);
            console.log(`--------------------------------------------------------------------------------------`);
        });
    });
}

//ask the user which product they would like to purchase
var whichProductWouldYouLike = function() {
        inquirer
            .prompt([{
                    name: "whichId",
                    type: "input",
                    message: "Which product would you like to buy? Please provide the id number.",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }, {
                    name: "howMany",
                    type: "input",
                    message: "How many do you need?",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
                ])
                .then(function(answer) {
                    //
                    var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?";
                        connection.query(query, { item_id: answer.whichId }, function (err, res) {
                            if (err) throw err;
                            //
                            res.forEach(function(elem) {
                                console.log(`Id Number: ${elem.item_id} | ${elem.product_name} | Department: ${elem.department_name} | Price: $${elem.price} | In Stock: ${elem.stock_quantity}`);
                                console.log(`--------------------------------------------------------------------------------------`);
                            });
                        });
                });
            };

        whichProductWouldYouLike();
