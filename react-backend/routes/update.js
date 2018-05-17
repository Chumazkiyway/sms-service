var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/usersService";

router.post('/', (req, res) => {

  var login = req.body.login;
  var password = req.body.pass;
  var userIsFind = false; 

  mongoClient.connect(url, function (err, database ){
              
              const db = database.db("usersService");
                      
              db.collection("users").find({login: login, pass: pass}).toArray(function(err, users){

                  console.log(users);
                  console.log(users.length);
                  
                  if(users.length > 0){
                      userIsFind = true;
                  }

                  if(userIsFind){
	          		  	//update user data
    	              var token = req.body.token;
        	          var pattern = req.body.pattern;
            	      var alphaname = req.body.alphaname;

                   //  var token = '4O2UxRIcqcuZ84B';
                   //  var pattern = 'Bogdan Chumak';
                   //  var alphaname = 'club_bulk';
            	      db.collection("users")
            	      	.updateOne(
            	      		{login: login},		//критерий выборки
            	      		{ $set : {
            	      				token: token,
            	      				pattern: pattern,
            	      				alphaname: alphaname
            	      		}},
            	      		function(err,result){

            	      		}
            	      	);
                  }

                  database.close();
                  res.json({res:userIsFind});
              });
      });
}