var express = require('express');
var router = express.Router();
var db = require('../db/dbRequests.js');

router.post('/', (req,res) => {
	db.createUser(req.body)

});


module.exports = router;