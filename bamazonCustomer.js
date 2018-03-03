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
        //loop through and display all products
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
        }])
        .then(function(answer) {
            //
            var query = "SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?";
            connection.query(query, {
                item_id: answer.whichId
            }, function(err, res) {
                if (err) throw err;
                //
                // console.log(answer.howMany);
                // res.forEach(function(elem) {
                //     console.log(`Id Number: ${elem.item_id} | ${elem.product_name} | Department: ${elem.department_name} | Price: $${elem.price} | In Stock: ${elem.stock_quantity}`);
                //     console.log(`--------------------------------------------------------------------------------------`);
                // });
                // console.log(`${res[0].stock_quantity} available in stock!`);
                if (res[0].stock_quantity < answer.howMany) {
                    console.log(`Insufficient quantity!`);
                    console.log(`there are ${res[0].stock_quantity} available in stock`);
                    whichProductWouldYouLike();
                    return;

                } else {
                    var totalCost = answer.howMany * res[0].price;
                    console.log(`---------------------------------------------`);
                    console.log(`Your Order: ${answer.howMany} ${res[0].product_name} at $${res[0].price}`);
                    console.log(`                                       `);
                    console.log(`Total Cost: $${totalCost.toFixed(2)}`);
                    // console.log(`${answer.howMany} at ${res[0].price} = ${totalCost}`);
                    var newStockQuant = res[0].stock_quantity - answer.howMany;
                    "UPDATE products SET ? WHERE ?", [{
                            stock_quantity: newStockQuant
                        },
                        {
                            item_id: answer.whichId
                        }
                    ],
                    console.log(`                                       `);
                    console.log(`only ${newStockQuant} ${res[0].product_name} remaining `);
                    console.log(`------------------------------------------`);
                    console.log(`                                       `);
                    whichProductWouldYouLike();
                }
            });
        });
};

whichProductWouldYouLike();
