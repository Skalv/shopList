var express = require("express")
var router = express.Router();

var List = require('../models/list');

router.get('/', function(req, res) {
  List.find({}, function(err, result) {
    if (err) res.send(err);
    res.json(result);
  })
})

router.get('/:id', function(req, res) {
  List.findOne({"_id": req.params.id}, function(err, result) {
    if (err) res.send(err)
    res.json(result)
  })
})

router.post('/', function(req, res) {
  var newList = new List({
    "title": req.body.title,
    "items": req.body.items
  })

  newList.save(function(err, result){
    if (err) res.send(err)
    res.json(result)
  })
})

router.put('/:id', function(req, res) {
  List
    .where({
      _id: req.params.id
    })
    .update({
      "title": req.body.title,
      "items": req.body.items
    })
    .exec(function(err, result) {
      if (err) res.send(err)
      res.json(result)
    })
})

router.delete('/:id', function(req, res) {
  List.deleteOne({ _id: req.params.id }, function(err, result){
    if (err) res.send(err)
    res.json(result)
  })
})

module.exports = router;