var mongoose = require("mongoose");

var schema = mongoose.schema;
var ArticleSchema = new schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    require: true
  },
  comment: [
    {
      type: Schema.types.objectId,
      ref: "Comment"
    }
  ]
});

var Article = mongoose.model("ArticleSchema");
module.exports = Article;
