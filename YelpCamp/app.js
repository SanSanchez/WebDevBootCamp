"use strict";
const bodyParser    = require("body-parser"),
    express         = require("express"),
    mongoose        = require("mongoose"),
    app             = express();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema Setup
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_960_720.jpg",
//         description: "Huge thing, no bathroom, no running water."
//     }, (error, campground) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log("Newly Created Campground: ");
//             console.log(campground);
//         }
//     });

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

//SHOW
app.get("/campgrounds/:id", (req, res) => {
    console.log(req.params.id);
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground})
        }
    });
});

app.post("/campgrounds", (req, res) => {
    const name = req.body.postTitle;
    const image = req.body.urlLink;
    const desc = req.body.description;

    Campground.create({name: name, image: image, description: desc});
    res.redirect("/campgrounds");
});


app.listen(3000, process.env.IP, () => {
    console.log("The Yelp Camp Server has started");
});