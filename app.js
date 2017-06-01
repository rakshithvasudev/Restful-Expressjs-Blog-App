/**
 * Express JS starting point that loads
 * Express, Mongoose, Body - Parser.
 */
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

//Config setup
mongoose.connect('mongodb://localhost/restful_blog_app');
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Setting up the DB model with the schema.
 */
var Blog = mongoose.model("Blog", {
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now()}
});


/**
 * RESTful Routes
 */
app.get("/blogs", function (req, res) {
    res.render("index")
});


app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});