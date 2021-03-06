"use strict";
const bodyParser    = require("body-parser"),
    express         = require("express"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require(__dirname + "/models/campground.js"),
    Comment         = require(__dirname + "/models/comment.js"),
    User            = require(__dirname + "/models/user.js"),
    seedDB          = require(__dirname + "/seeds.js"),
    app             = express(),
    seed            = false;

const commentRoutes     = require(__dirname + "/routes/comments"),
    campgroundRoutes    = require(__dirname + "/routes/campgrounds"),
    indexRoutes         = require(__dirname + "/routes/index");


// Config
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
// Passport Config
app.use(require("express-session")({
    secret: "Today is a good day",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.signedUser = req.user;
    next();
});

//Seed Database
if (seed) {
    seedDB();
}

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", indexRoutes);

app.listen(3000, process.env.IP, () => {
    console.log("The Yelp Camp Server has started");
});