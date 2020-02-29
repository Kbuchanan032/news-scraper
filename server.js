var mongoose = require("mongoose");
var axios = require("axios");
var logger = require("morgan");
var cheerio = require("cheerio");

var express = require("express");
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defualtLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/news-scraper", {
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected to mongoose");
});

var PORT = 3000;
app.listen(PORT, function() {
  console.log("app listening on port: " + PORT);
});
