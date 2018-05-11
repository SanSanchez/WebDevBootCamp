const express   = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground");

// Index Route
router.get("/", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log("Error in loading /campgrounds");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//  Create New Campground Route
router.post("/", (req, res) => {
    Campground.create({
        name: req.body.PostTitle,
        image: req.body.urlLink,
        description: req.body.description
    });

    res.redirect("campgrounds/campgrounds");
});

// New Campground Route
router.get("/new", (req, res) => {
    res.render("campgrounds/new");
});

// Show Route
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            console.log("Error in loading /campgrounds/id");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

module.exports = router;