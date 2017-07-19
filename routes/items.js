var express = require("express")
var router = express.Router();

var itemModel = require('../models/item');

router.get('/', function(req, res) {
  itemModel.find({}, function(err, items) {
    if (err) res.send(err);
    res.json(items);
  })
})

router.get('/:id', function(req, res) {
  var itemId = req.params.id;
  itemModel.findOne({"_id": itemId}, function(err, item) {
    if (err) res.send(err)
      res.json(item)
  })
})

router.post('/', function(req, res) {
  
  var newItem = new itemModel({
    "title": req.body.title,
    'categories': req.body.categories,
    "author": req.body.author,
    "quantity": req.body.quantity
  })

  newItem.save(function(err, item){
    if (err) res.send(err)
    res.json(item)
  })

})

router.put('/:id', function(req, res) {

  var itemId = req.params.id;

  itemModel
    .where({
      _id: itemId
    })
    .update({
      "title": req.body.title,
      'categories': req.body.categories,
      "author": req.body.author,
      "quantity": req.body.quantity
    })
    .exec(function(err, item) {
      if (err) res.send(err)
      res.json(item)
    })

})

router.delete('/:id', function(req, res) {
  itemModel.deleteOne({ _id: req.params.id }, function(err, item){
    if (err) res.send(err)
    res.json(item)
  })
})

module.exports = router;