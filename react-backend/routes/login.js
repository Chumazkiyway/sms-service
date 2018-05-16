var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var getBal = require('../modules/getBalance');

var url = "mongodb://localhost:27017/usersService";

router.post('/', (req, res) => {
     mongoClient.connect(url, function(err, database){
     	var userIsFind = false;
     	const db = database.db("usersService");
        db.collection("users").find({login: req.body.login, pass: req.body.pass}).toArray(function(err, users){                 
            console.log(users);
	        console.log(users.length);
	        if(users.length > 0)
	        	userIsFind = true;
	        database.close();

            var token = '4O2UxRIcqcuZ84B';
            var balnce = getBal.getBalance(req.body.login, token);
            
            
            
            res.json(userIsFind);
        });
    });
        
});

module.exports = router;

