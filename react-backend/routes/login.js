var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res) {
    db.findUser(req.body);
});

module.exports = router;

 
