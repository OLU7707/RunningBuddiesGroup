// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Use the Pug templating engine
app.set( 'view engine', 'pug');
app.set( 'views', './app/views');


//1. Displaying All Runners 
// This route handles requests for displaying all runners
app.get("/all-runners", function (req, res) {

    // SQL query to select all runners from the 'users' table
    var sql = 'select * from users';

    // Call the 'query' method of the database connection object to execute the SQL query
    db.query(sql).then(results => {
        console.log(results);
        // Send the results as a JSON response to the client
        res.json(results);
    });

});



//2.  Display a formatted list of Runners
// Define an Express route that responds to GET requests to the path '/runners-formatted'
app.get("/runners-formatted", function (req, res) {
    
    // Define an SQL query to retrieve all records from the 'users' table
    var sql = 'select * from users';
    
    // Define an output variable to store the HTML for the formatted list of runners
    var output = '<table border="1px">';
    
    // Execute the SQL query using the db.query method, and use a promise to handle the results
    db.query(sql).then(results => {
        
        // If the query succeeds, render the 'all-runners' view with the query results
        res.render('all-runners', {data:results});
    });
});


//3.  Display single Runner page with asynchronous function that waits for response
// Define a route that accepts a GET request for a single user with a specified ID
app.get("/single-user/:id", async function (req, res) {
  
    // Extract the user ID from the request parameters
    var userId = req.params.id;
    console.log(userId);
  
    // Define a SQL query to retrieve the details of the user with the specified ID
    var userSql = "SELECT user_ID, user_name, user_city, user_street, user_age, user_gender, user_FitnessLevel FROM users WHERE userID = ?";
  
    // Execute the query with the userID parameter using the database connection object (db)
    var userResult = await db.query(userSql, [userId]); 
    console.log(userResult);
  
    // Send the results of the query as a JSON response to the client
    res.send(JSON.stringify(userResult));
});

  


// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});