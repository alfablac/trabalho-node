const express = require('express');
var passport = require('passport');
const router = express.Router();

router.get('/', (_, res) => {
    res.render('login');
});


module.exports = router;
