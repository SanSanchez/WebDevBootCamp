"use strict";

const express = require("express");
const app = express();

app.get("/", (req, res) => {
   res.send("Hi there, welcome to my assignment");
});

app.get("/speak/:animal", (req,res) => {
    const sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!",
        cat: "I hate you human",
        goldfish: "..."
    };
    let animal = req.params.animal.toLowerCase();
    res.send(
        "The " + animal +
        " says " + sounds[animal]
    );
});

app.get("/repeat/:phrase/:number", (req, res) => {
    let myPhrase = "";

    for (let i = 0; i < req.params.number; ++i) {
        myPhrase += req.params.phrase + " ";
    }
    res.send(myPhrase);
});

app.get("/*", (req, res) => {
   res.send("Sorry, page not found... What are you doing with your life?")
});


app.listen(3000, process.env.IP, () => {
    console.log("Server has started");
});
