/**
 * Express JS starting point that loads
 * Express, Mongoose, Body - Parser.
 */
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    method_override = require('method-override'),
    bodyParser = require('body-parser');

//Config setup
mongoose.connect('mongodb://localhost/restful_blog_app');
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(method_override("_method"));

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
app.get("/blogs/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, blogItem) {
        if (err)
            console.log("Error occurred : " + err);
        else
            res.render("show", {blog: blogItem});
    });
});

/**
 * Show Edit route
 */
app.get("/blogs/:id/edit", function (req, res) {
    Blog.findById(req.params.id, function (err, blogItem) {
        if (err)
            console.log("Couldn't find element bearing ID :" + req.params.id);
        else
            res.render("edit", {blog: blogItem});
    });
});

/**
 * Handle Update route
 * findByIdAndUpdate(id to delete, new object that has to be updated, callback)
 */
app.put("/blogs/:id", function (req,res) {
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function (err,blog){
       if (err)
           console.log("Error during update: "+ err);
       else{
           console.log("Added :"+blog);
           res.redirect("/");
       }

    });
});

/**
 * Delete route
 * findByIdAndRemove(id to delete, new object that has to be updated, callback)
 */
app.delete("/blogs/:id", function (req,res) {
    Blog.findByIdAndRemove(req.params.id,function (err,blog) {
      if (err)
          console.log("Error during delete: "+ err);
      else{
          console.log("Deleted :"+blog);
          res.redirect("/");
      }

   });

});

/**
 * Server setup
 */
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
