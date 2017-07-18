var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  "title": String,
  "categories": [{
    "title": String
  }],
  "author": {
    "firstname": String,
    "lastname": String
  },
  "quantity": Number
});

module.exports = mongoose.model("Item", itemSchema);