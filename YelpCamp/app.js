"use strict";
const bodyParser    = require("body-parser"),
    express         = require("express"),
    app             = express(),
    mongoose        = require("mongoose"),
    Campground      = require(__dirname + "/models/campground.js"),
    Comment         = require(__dirname + "/models/comment.js"),
    User            = require(__dirname + "/models/user.js"),
    seedDB          = require(__dirname + "/seeds.js");

// Config
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//Seed Database
// seedDB();

app.get("/", (req, res) => {
    res.render("landing");
});

// Index Route
app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log("Error in loading /campgrounds");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// New Campground Route
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

// Show Route
app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            console.log("Error in loading /campgrounds/id");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/show", {campground: foundCampground})
        }
    });
});

//  Create New Campground Route
app.post("campgrounds", (req, res) => {
    Campground.create({
        name: req.body.PostTitle,
        image: req.body.urlLink,
        description: req.body.description
    });

    res.redirect("campgrounds/campgrounds");
});

/*
* ================================
* COMMENTS ROUTES
* ================================
*/

// New Comments Form Route
app.get("/campgrounds/:id/comments/new", (req, res) => {
    Campground.findById(req.params.id, (err, campground)=> {
      if (err) {
          console.log("Error in loading /campgrounds/id/comments/new");
          res.redirect("/campgrounds");
      }  else {
          res.render("comments/new", {campground: campground});
      }
    });
});

app.post("/campgrounds/:id/comments", (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
       if (err) {
           console.log("Error in loading /campgrounds/:id/comments");
            res.redirect("/campgrounds");
       } else {
            Comment.create(req.body.comment, (err, comment) => {
               if (err) {
                   console.log("Problem creating comment");
               } else {
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/" + campground._id);
               }
            });
       }
    });
});

app.listen(3000, process.env.IP, () => {
    console.log("The Yelp Camp Server has started");
});