// dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

// use port designated by host, or port 3000
var PORT = process.env.PORT || 3000;

// initiate express
var app = express();

// express router
var router = express.Router();

// designates public folder as the static directory
app.use(express.static(__dirname + "/public"));

// connect handlebars to express
app.engine("handlebars", expressHandlebars( {
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// use bodyparser to parse out information
app.use(bodyParser.urlencoded( {
    extended: false
}));

// send request through router middleware
app.use(router);

// use the deployed database if deployed to Heroku
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// connect mongoose to the database
mongoose.connect(db, function(error) {
    // state what the error is if there is one
    if (error) {
        console.log(error);
    }
    // otherwise confirm if successful
    else {
        console.log("Mongoose successfully connected");
    }
});

// listen on port and show confirmation of port
app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});