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

<<<<<<< HEAD
//This will allow you to access the form data in the req.body object.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Create a route for root - /
app.get("/", function(req, res) {
    // Set up an array of data
    var test_data = ['one', 'two', 'three', 'four'];
    // Send the array through to the template as a variable called data
    res.render("index", {'title':'My index page', 'heading':'My heading', 'data':test_data});
=======
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'runningbuddiesgroup',
  password : 'password',
  database : 'sw2-runningbuddies'
>>>>>>> origin/main
});

// Running Buddies Homepage root
app.get("/homepage", function(req, res) {
    res.render("homepage")
});

<<<<<<< HEAD
// Runing Buddies Login page root
app.get("/Login", function(req, res) {
    res.render("login")
=======
// Create a route for root - / TEST
app.get("/", function(req, res) {
    res.send("Index");
>>>>>>> origin/main
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
        // Send the results as a JSON response to the client.
        res.json(results);
    });
});

//Display a formatted list - All Runners
//app.get("/all-runner-formatted", function(req, res) {
    //var sql = 'select user_ID, user_name from users';
    //var output = '<table border="1px">'
    //db.query(sql).then(results => {
        //for (var row of results) {
            //output += '<tr>';
            //output += '<td>' + row.user_ID + '</td>';
            //output += '<td>' + '<a href="./single-runner/' + row.user_ID + '">' + row.user_name +  '</a>' + '</td>';
            //output += '</tr>'
        //}
        //output+= '</table>';
        //res.send(output);
    //});
//});

//Display a formatted list - All Runners (REFACTORED).
app.get("/all-runners-formatted", function(req, res) {
    var sql = 'select user_ID, user_name from users';
    db.query(sql).then(results => {
        // Send the results rows to the all-Runner template
        // The rows will be in a variable called data
        res.render('all-runners-formatted', {data: results})
    });
});

app.get("/match-user", function(req, res) {
    var sql = 'SELECT DISTINCT user_city FROM users';
    db.query(sql).then(results => {
      // Pass the results to the Pug template
      res.render('match-user', { cities: results });
    });
  });
  
  // Route to handle the form submission
  app.post("/match-user", function(req, res) {
    var city = req.body.user_city;
    var sql = "SELECT * FROM users WHERE user_city = ?";
    db.query(sql, [city]).then(results => {
      // Pass the results to the Pug template
      res.render('matched-user', { users: results });
    });
  });



//Display single runner page with asynchronous fucntion
//that waits for the response.
<<<<<<< HEAD
//app.get("/single-runner/:user_ID", function(req, res) {
    //var ruID = req.params.user_ID;
    //var ruSql = "SELECT user_city, user_street, user_age, \
    //user_gender, user_FitnessLevel FROM users\
    //WHERE user_ID = ?"
    //db.query(ruSql, [ruID]).then(results => {
        //console.log(results);
        //res.send(ruID);
        //output = '';
        //output += '<div><b>City Location: </b>' + results[0].user_city + '</div>';
        //output += '<div><b>Street Location: </b>' + results[0].user_street + '</div>';
        //output += '<div><b>Age: </b>' +  results[0].user_age + '</div>';
        //output += '<div><b>Gender: </b>' + results[0].user_gender + '</div>';
        //output += '<div><b>Fitness Level: </b>' + results[0].user_FitnessLevel + '</div>';
        //res.send(output);
=======
app.get("/single-runner/:user_ID", function(req, res) {
    var UserID = req.params.user_ID;
    var sql = "SELECT user_city, user_street, user_age, \
    user_gender, user_FitnessLevel FROM users\
    WHERE user_ID = ?"
    db.query(sql, [UserID]).then(results => {
        console.log(results);
        // Pass the results object to the Pug template
        res.render('users', { users: results[0] });
>>>>>>> origin/main

    //});

//});

// Display single runner page with asynchronous fucntion that waits for the response (REFACTORED).
// Display single runner page for each user.
app.get("/single-runner/:user_ID", async function(req, res) {
      const ruID = req.params.user_ID;
      const ruSql = "SELECT * from users WHERE user_ID = ?";
      const [results] = await db.query(ruSql, [ruID]);

      res.render('single-runner', {users: results});
  });

  //Feature for drop down box to find runner using user_city
  app.get("/match-user", function(req, res) {
    var sql = 'SELECT DISTINCT user_city FROM users';
    db.query(sql).then(results => {
      //Pass the results to the Pug template
      res.render('match-user', { cities: results });
    });
  });

  // Route to handle the form submission
  app.post("/match-user", function(req, res) {
    var city = req.body.user_city;
    var sql = "SELECT * FROM users WHERE user_city = ?";
    db.query(sql, [city]).then(results => {
      // Pass the results to the Pug template
      res.render('matched-user', { users: results });
    });
  });
  




// Create a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from users';
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