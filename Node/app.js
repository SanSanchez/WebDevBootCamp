
"use strict";
const express = require("express");
const app = express();

app.get("/", (req,res) => {
    res.send("Hello");
});

app.get("/bye", (req, res) => {
   res.send("Goodbye");
});

app.get("/dog", (req, res) => {
    res.send("Woof");
});

app.get("*", (req, res) => {
   res.send("You are a star!");
});


app.listen(3000, process.env.IP, ()=> {
   console.log("Server has started");
});
