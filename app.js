/**
 * Created by Rakshith on 5/31/2017.
 */
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/restful_blog_app');
app.set("view engine","ejs");
app.use(express.static("public"));