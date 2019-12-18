const express = require('express');
const router = express.Router();
var passport = require('passport');
const List = require('../store/List');

// /* GET home page. */
// router.get('/', function (_, res) {
//   Products.get()
//     .then(function (products) {
//       res.render('index', { products });
//     })
// });




function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      // req.user is available for use here
      return next();
  }
  // denied. redirect to login
  res.redirect('/')
}

router.get('/lists', ensureAuthenticated, function (req, res) {
  var lists = [];
    List.find({ userID: req.session.passport.user.id }, function (err, docs) {
      lists = docs;

    }).then(function (lists) {
      res.render('lists', { user: req.session.passport.user, lists })
  })

});




/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/auth/google',
  passport.authenticate('google', {
    scope:
      ['https://www.googleapis.com/auth/plus.login',
        , 'https://www.googleapis.com/auth/plus.profile.emails.read']
  }
  ));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/lists');
  });



// router.get('/auth/github/callback',
//   passport.authenticate('github', {
//     failureRedirect: '/'
//   }
//   ),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/admin');
//   });


module.exports = router;
