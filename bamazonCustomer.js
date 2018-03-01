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
    whichProductWouldYouLike();

    connection.end();
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
    .prompt({
        name: "whichId",
        type: "input",
        message: "Which product would you like to buy? Please provide the id number."
    })
    .then(function(answer) {

        // console.log(answer.whichId);
        switch (answer.whichId) {
            case '1':
                console.log(`great choice`);
                break;

            case '2':
                console.log(`great choice 2`);
                break;

            case '3':
                console.log(`great choice 2`);
                break;

            case '4':
                console.log(`great choice 4`);
                break;

            case '5':
                console.log(`great choice`);
                break;

            case '6':
                console.log(`great choice 2`);
                break;

            case '7':
                console.log(`great choice 2`);
                break;

            case '8':
                console.log(`great choice 4`);
                break;

            case '9':
                console.log(`great choice 2`);
                break;

            case '10':
                console.log(`great choice 4`);
                break;
        }
    });
};
