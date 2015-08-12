var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var models = require('../models/');
var Page = models.Page;
var User = models.User;

router.use(bodyParser.json());

router.post('/', function(req, res, next) {
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  var page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save(function(err, page) {
    console.log(err);
    if (err) return next(err);
    console.log('this is page before redirect', page);
    res.redirect('/wiki/' + page.urlTitle);
  });
  // -> after save -> res.redirect('/');
});
router.get('/add', function(req, res, next) {
  res.render('addpage');
});


/* GET users listing. */
router.get('/:urlTitle', function(req, res, next) {
  Page.findOne({
    urlTitle: req.params.urlTitle
  }).exec().then(function(foundPage) {
    res.render('wikipage',foundPage);
  });
});


router.get('/', function(req, res, next) {
  res.send('got to GET /wiki/');
});

router.post('/', function(req, res, next) {
  res.json(req.body);
});




module.exports = router;
