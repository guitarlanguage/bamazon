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

    whichProductWouldYouLike();
    itemsForSale();
    connection.end();
});

function itemsForSale() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(`
            `);
        res.forEach(function(elem) {
            console.log(`Id Number: ${elem.item_id}: ${elem.product_name} | Department: ${elem.department_name} | Price: $${elem.price} | In Stock: ${elem.stock_quantity}`);
            console.log(`--------------------------------------------------------------------------------------`);
        });
        // console.log(res);

    });
}


var whichProductWouldYouLike = function () {
  inquirer
    .prompt({
      name: "whichId",
      type: "input",
      message: "Please provide the id number of the product that you would like to buy?"
    })
    .then(function(answer) {

        console.log(answer.whichId);
    //   switch (answer.action) {
    //     case "1":
    //       artistSearch();
    //       break;
    //
    //     case "Find all artists who appear more than once":
    //       multiSearch();
    //       break;
    //
    //     case "Find data within a specific range":
    //       rangeSearch();
    //       break;
    //
    //     case "Search for a specific song":
    //       songSearch();
    //       break;
    //   }
    // });
});
};
