var mysql = require("mysql");

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
});

function itemsForSale() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        res.forEach(function(elem) {
            console.log(`Product ${elem.item_id}: ${elem.product_name} | Department: ${elem.department_name} | Price: $${elem.price} | In Stock: ${elem.stock_quantity}`);
        });
        // console.log(res);
        connection.end();
    });
}
