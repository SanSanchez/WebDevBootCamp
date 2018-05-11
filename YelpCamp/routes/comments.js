const express   = require("express"),
    router      = express.Router({mergeParams: true}),
    Campground  = require("../models/campground"),
    Comment     = require("..//models/comment");

/*
* ================================
* COMMENTS ROUTES
* ================================
*/

// New Comments Form Route
router.get("/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground)=> {
        if (err) {
            console.log("Error in loading /campgrounds/id/comments/new");
            res.redirect("/campgrounds");
        }  else {
            res.render("comments/new", {campground: campground});
        }
    });
});

router.post("/", isLoggedIn, (req, res) => {
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

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login");
}

module.exports = router;