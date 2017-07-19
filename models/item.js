var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  "title": {type: String},
  
  "author": {
    "firstname": {type: String},
    "lastname": {type: String}
  },
  "quantity": {type: Number}
});

module.exports = {
  "schema": itemSchema,
  "model": mongoose.model('Item', itemSchema),
  "registry": {
    "urlTemplates": {
      "self": "http://localhost:3000/api/items/{id}"
    }
  }
}