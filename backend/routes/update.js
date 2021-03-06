var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/usersService";

router.post('/', (req, res) => {

    var login = req.body.login;
    var pass = req.body.pass;
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
                console.log(req.body.token);
                console.log(req.body.alphaname);
               
                db.collection("users")
                .updateOne(
                    {login: login},	
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
});
module.exports = router;