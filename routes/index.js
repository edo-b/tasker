var express = require('express');
var router = express.Router();

var models = require('../models');
var { verifyToken } = require('../services/authService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello from skeleton node app with react included');
});

router.get('/test', function(req, res, next) {
  models.Project.findAll().then(function(projects){
    res.send(JSON.stringify(projects));
  })
  .error(function(){
    res.send("Error");
  })
});

router.post('/test2', verifyToken, function(req, res, next){
  res.send("User id " + res.locals.userId);
});

module.exports = router;
