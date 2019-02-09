var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var passport = require('passport');

/* GET ALL UserS */
router.get('/', function(req, res, next) {
  User.find(function(err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

// /* GET SINGLE User BY ID */
// router.get('/:email', function(req, res, next) {
//   User.find({ email : req.params.email }, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

/* SAVE User */
router.post('/signup', (req, res, next) => {
  User.create(req.body,  (err, post) => {
    if (err) return next(err);
    console.log(req.body);
    res.json(post);
  });
});

// login user
router.post('/login', passport.authenticate('local', (err, user, info) => {
  console.log(info.message);
}), (req, res) => {
  res.redirect('/');
});

// /* UPDATE User */
// router.put('/:email', function(req, res, next) {
//   User.findByIdAndUpdate(req.params.email, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

// /* DELETE User */
// router.delete('/:email', function(req, res, next) {
//   User.findByIdAndRemove(req.params.email, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

module.exports = router;