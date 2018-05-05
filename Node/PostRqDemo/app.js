"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/friends", (req, res) => {
    res.render("friends", {friends: friends});
});

app.post("/addFriend", (req, res) => {
    friends.push(req.body.newFriend);
    res.redirect("/friends");
});

app.listen(3000, process.env.IP, () => {
   console.log("Server has started.");
});