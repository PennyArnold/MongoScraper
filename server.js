//Require dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

//Set up our port to be either the host's designated port or 3000
var PORT = process.env.PORT || 3000;

//Initiate Express App
var app = express();

//Set up the Express Router
var router = express.Router();

//Designate public folder
app.use(express.static(router + "/public"));

//connect handlebars to express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");


//use bodyParser in app
app.use(bodyParser.urlencoded({
    extended: false
}));


//Have every reqeust go through router middleware
app.use(router);

//if deployed, use the deployed database, otherwise use the local mongoHeadLines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";

//connect mongoose to our database
mongoose.connect(db, function (error) {
    //log any errors connecting with mongoose
    if (error) {
        console.log(error);
    }
    //or log a success message
    else {
        console.log("mongoose connection is successful");
    }
});


//Listen on the port
app.listen(PORT, function () {
    console.log("Listening on port:" + PORT);
});