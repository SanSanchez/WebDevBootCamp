"use strict";

// Dependencies Inclusion
const express           = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    methodOverride      = require("method-override"),
    mongoose            = require("mongoose"),
    expressSanitizer    = require("express-sanitizer");

// App Config
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/restful_blog_app");

// Mongoose Config
let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type:Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

// Restful Routes

app.get("/", (req, res) => {
    res.redirect("/blogs");
});

// Index Route
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
       if (err) {
           console.log("Error occurred");
       } else {
           res.render("index", {blogs: blogs});
       }
    });
});

// New Route
app.get("/blogs/new", (req, res) => {
    res.render('new');
});

// Create Route
app.post("/blogs", (req, res) => {
        //Sanitize.
        req.body.blog.body = req.sanitize(req.body.blog.body);

        Blog.create(req.body.blog, (err, newBlog) => {
            if (err) {
                res.render("new");
            } else {
                res.redirect("/blogs");
            }
        });
});

// Show Route
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});


// Edit Route
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, fBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: fBlog});
        }
    });
});

// Update Route
app.put("/blogs/:id", (req, res) => {
    //Sanitize.
    req.body.blog.body = req.sanitize(req.body.blog.body);

    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, newBlog) => {
        if (err) {
            res.redirect("/blogs");
        } else {
            console.log(req);
            console.log(req.params);
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// Delete Route
app.delete("/blogs/:id", (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
       if (err) {
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
    });
});

app.listen(3000, process.env.IP, () => {
    console.log("Server is running");
});
