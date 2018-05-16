var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/usersService";


router.post('/', (req,res) => {
	if(!req.body) return res.sendStatus(400);

	mongoClient.connect(url, function(err, database){
     	var userIsFind = false;
     	var userIsCreate = false;
     	var userLogin = req.body.login;
		var userPass = req.body.pass;
		var user = {
			login: userLogin, 
			pass: userPass
		};
		const db = database.db("usersService");
        db.collection("users").find({login: userLogin, pass: userPass}).toArray(function(err, users){                 
            console.log(users);
	        console.log(users.length);
	        if(users.length > 0){
	        	userIsFind = true;	
	        	database.close();
	       		console.log("userIsCreate: "+ userIsCreate);
	        	res.json(userIsCreate);	
	        }    		      	    
	        console.log("userIsFind: "+ userIsFind);
	        
	        
        });
        if(!userIsFind){
        	db.collection("users").insertOne(user, function(err, result){
			        
		        if(err) return res.status(400).send();
		        database.close();
		        userIsCreate = true;
		        console.log("userIsCreate: "+ userIsCreate);
		        res.json(userIsCreate);	       	        
		    });
        }              
    });
});

module.exports = router;
