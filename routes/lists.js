const express = require('express');
const router = express.Router();
const List = require('../store/List');
var passport = require('passport');
const mongoose = require('mongoose')

// /* GET home page. */
// router.get('/lists', function(_, res) {
// //   Products.get()
// //     .then(function(products) {      
//        res.render('lists');
// //     })
// });

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        // req.user is available for use here
        return next();
    }
    // denied. redirect to login
    res.redirect('/')
  }


router.post('/:id/remove', ensureAuthenticated, function (req, res) {
    var chave = req.params.id;
    List.findOneAndRemove({_id : new mongoose.mongo.ObjectID(req.params.id)}, function (err,offer){

      }).then(() => {
        res.redirect('/lists')
    });
});

router.post('/:id/edit', ensureAuthenticated, function (req, res) {
    List.update({_id: new mongoose.mongo.ObjectID(req.params.id)}, {
        listName: req.body.list
    }, function(err, affected, resp) {
       console.log(resp);
    }).then(() => {
        res.redirect('/lists')
    });
});

router.post('/', ensureAuthenticated,function (req, res) {
    List.create({
        userID: req.body.user,
        listName: req.body.task
    }).then(() => {
        res.redirect('/lists')
    });
});

module.exports = router;
