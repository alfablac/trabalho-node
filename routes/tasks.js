const express = require('express');
var passport = require('passport');
const router = express.Router();
const Task = require('../store/Task');
const List = require('../store/List');
const mongoose = require('mongoose')

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        // req.user is available for use here
        return next();
    }
    // denied. redirect to login
    res.redirect('/')
  }

router.get('/:id', ensureAuthenticated, function (req, res) {
    var listChave = req.params.id;
    var tasks = [];
    Task.find({ listChave: listChave }, function (err, docs) {
        if (docs.length == 0) {
            res.render('tasks', { listChave });
        }
        tasks = docs;

    }).then(function (tasks) {
        res.render('tasks', { listChave, tasks });
    });
});



router.get('/', ensureAuthenticated, (_, res) => {
    res.render('tasks');
});

router.post('/:id/remove', ensureAuthenticated, function (req, res) {
    Task.findOneAndRemove({_id : new mongoose.mongo.ObjectID(req.params.id)}, function (err,offer){

      }).then(() => {
        res.redirect('/tasks/' +req.body.listChave )
    });
});

router.post('/:id/done', ensureAuthenticated,  function (req, res) {
    Task.update({_id: new mongoose.mongo.ObjectID(req.params.id)}, {
        status: true
    }, function(err, affected, resp) {
       console.log(resp);
    }).then(() => {
        res.redirect('/tasks/' +req.body.listChave )
    });
});


router.post('/:id/undone', ensureAuthenticated,  function (req, res) {
    Task.update({_id: new mongoose.mongo.ObjectID(req.params.id)}, {
        status: false
    }, function(err, affected, resp) {
       console.log(resp);
    }).then(() => {
        res.redirect('/tasks/' +req.body.listChave )
    });
});

router.post('/:id/edit', ensureAuthenticated, function (req, res) {
    Task.update({_id: new mongoose.mongo.ObjectID(req.params.id)}, {
        taskName: req.body.task
    }, function(err, affected, resp) {
       console.log(resp);
    }).then(() => {
        res.redirect('/tasks/' +req.body.listChave )
    });
});


router.post('/', ensureAuthenticated, function (req, res) {
    Task.create({
        listChave: req.body.list,
        taskName: req.body.task,
        status: false
    }).then(() => {
        res.redirect('/tasks/' +req.body.list )
    });
});


module.exports = router;
