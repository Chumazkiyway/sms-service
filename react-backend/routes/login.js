var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/usersService";

router.post('/', (req, res) => {
     mongoClient.connect(url, function(err, database){
     	let userIsFind = false;
     	const db = database.db("usersService");
        db.collection("users").find({login: req.body.login, pass: req.body.pass}).toArray(function(err, users){                 
            console.log(users);
	        console.log(users.length);
	        if(users.length > 0)
	        	userIsFind = true;
	        database.close();
	        console.log("userIsFind: "+ userIsFind);
	        res.json(userIsFind);
        });
    });
});

module.exports = router;

