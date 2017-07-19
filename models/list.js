var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var listSchema = new Schema({
  "title": String,
  "items": [Schema.Types.ObjectId]
})

module.exports = mongoose.model("List", listSchema);