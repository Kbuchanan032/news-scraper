var mongoose = require("mongoose");

var schema = mongoose.schema;
var CommentSchema = new schema({
  name: {
    type: String,
    required: true
  },
  body: {
    type: String,
    require: true
  }
});

var Comment = mongoose.model("CommentSchema");
module.exports = Comment;
