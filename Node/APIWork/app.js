"use strict";
const express = require('express');
const app = express();
const request = require('request');
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search");
});

app.get("/results", (req, res) => {
    const queryUrl = "http://omdbapi.com/?s=" + req.query.search + "&apikey=thewdb";

    console.log(queryUrl);

    request(queryUrl, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const queryData = JSON.parse(body);
            res.render("results", {data: queryData});
        }
    });
});


app.listen(3000, process.env.IP, () => {
    console.log("Movie app has started");
});