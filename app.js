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

app.get('/', function (req, res) {
    res.redirect("/blogs");
});

/**
 * Index route
 */

app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err)
            console.log("Error: " + err);
        else
            res.render("index", {blogs: blogs});
    });
});

/**
 * Add new blog route
 */
app.get("/blogs/new", function (req, res) {
    res.render("new")
});

/**
 * Post request from (new) route.
 */
app.post("/blogs", function (req, res) {
    Blog.create(req.body.blog, function (err, blogItem) {
        if (err)
            console.log("Error :" + err);
        else {
            console.log("Added : " + blogItem);
            res.redirect("/blogs")
        }

    });

});

/**
 * Show route
 */
app.get("/blogs/:id",function (req,res) {
   res.send("Welcome to id :" + req.params.id);
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
