"use strict";
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/catApp");

let catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});
//
let Cat = mongoose.model("Cat", catSchema);
//
// let newCat = new Cat({
//    name: "Mrs. Norris",
//    age: 7,
//    temperament: "Evil"
// });
//
// newCat.save((error, item) => {
//     if (error) {
//         console.log("Something Went Wrong");
//     }
//     else {
//         console.log("We just saved a cat to the DB.");
//         console.log(item);
//     }
// });
Cat.create({
    name: "Snowball",
    age: 15,
    temperament: "Bland"
}, (error, cat) => {
    if (error) {
        console.log(error);
    } else {
        console.log(cat);
    }
});
//
// Cat.find({}, (err, cats) => {
//     if (err) {
//         console.log("Error, boy.");
//         console.log(err);
//     }
//     else {
//         console.log("It's all good");
//         console.log(cats);
//     }
// });