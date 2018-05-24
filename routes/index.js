var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello from skeleton node app with react included');
});

module.exports = router;
