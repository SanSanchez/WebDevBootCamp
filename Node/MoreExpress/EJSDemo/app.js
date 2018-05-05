const express = require("express");
const app = express();

app.use(express.static("public"));


app.get("/",(req, res) => {
    thing = "Me";
    res.render("home.ejs", {thingVar: thing});
});

app.listen(3000, process.env.IP, () => {
    console.log("Server is listening.");
});
