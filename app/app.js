// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');

// creating a connection to your database: 
const mysql = require('mysql');

// Use the Pug templating engine
app.set( 'view engine', 'pug');
app.set( 'views', './app/views');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'runningbuddiesgroup',
  password : 'password',
  database : 'sw2-runningbuddies'
});


// Create a route for root - / TEST
app.get("/", function(req, res) {
    res.send("Index");
});

//1. Displaying All Runners 
// This route handles requests for displaying all runners
app.get("/all-runners", function (req, res) {
    //res.send("Users Page Test - Display All Runners ")
    // SQL query to select all runners from the 'users' table
    var sql = 'select user_ID, user_name from users';
    // Call the 'query' method of the database connection object to execute the SQL query
    db.query(sql).then(results => {
        console.log(results);
        // Send the results as a JSON response to the client
        res.json(results);
    });
});

//Display a formatted list - All Runners
app.get("/all-runner-formatted", function(req, res) {
    var sql = 'select user_ID, user_name from users';
    var output = '<table border="1px">'
    db.query(sql).then(results => {
        for (var row of results) {
            output += '<tr>';
            output += '<td>' + row.user_ID + '</td>';
            output += '<td>' + '<a href="./single-runner/' + row.user_ID + '">' + row.user_name +  '</a>' + '</td>';
            output += '</tr>'
        }
        output+= '</table>';
        res.send(output);
    });
});

//Display single runner page with asynchronous fucntion
//that waits for the response.
app.get("/single-runner/:user_ID", function(req, res) {
    var UserID = req.params.user_ID;
    var sql = "SELECT user_city, user_street, user_age, \
    user_gender, user_FitnessLevel FROM users\
    WHERE user_ID = ?"
    db.query(sql, [UserID]).then(results => {
        console.log(results);
        // Pass the results object to the Pug template
        res.render('users', { users: results[0] });

    });

});


// Create a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from test_table';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});