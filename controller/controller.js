var express = require("express");
var router = express.router();
var path = require("path");

var request = require("request");
var cheerio = require("cheerio");

var article = require("../models/article");
var comment = require("../models/comment");

router.get("/", function(req, res) {
  res.redirect("/article");
});

router.get("/scrape", function(req, res) {
  request("https://www.theonion.com/", function(error, response, html) {
    var $ = cheerio.load(html);
    var titlesArray = [];

    $(".c-entry-box--compact__title").each(function(i, element) {
      var result;

      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      if (result.title !== "" && result.link !== "") {
        if (title.titlesArray.indexOf(result.title) == -1) {
          titlesArray.push(result.title);

          article.count({ title: result.title }, function(err, test) {
            if (test === 0) {
              var entry = new article(result);

              entry.save(function(err, doc) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(doc);
                }
              });
            }
          });
        } else {
          console.log("Article already exists.");
        }
      } else {
        console.log("Not saved to DB, missing data");
      }
    });
  });
});

router.get("./articles", function(req, res) {
  article
    .find()
    .sort({ _id: -1 })
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        var artcl = { article: doc };
        res.render("index", artcl);
      }
    });
});

router.get("/article-json", function(req, res) {
  article.find({}, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  });
});

module.exports = router;
