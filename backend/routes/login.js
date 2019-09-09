var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
const https = require('https');

var url = "mongodb://localhost:27017/usersService";


router.post('/', (req, result) => {
    var token = 'token';
    var pattern = 'pattern';
    var alphaname = 'alphaname';
    var balance = 'balance';

    //validation
    var userIsFind = false; 
    var login = req.body.login;
    var pass = req.body.pass;

    mongoClient.connect(url, function (err, database ){
            
        const db = database.db("usersService");
                
        db.collection("users").find({login: login, pass: pass}).toArray(function(err, users){
            
            if(users.length > 0){
                userIsFind = true;
                token = users[0].token;
                pattern = users[0].pattern ;
                alphaname = users[0].alphaname;
            }
            
            database.close();

            var url = 'https://gate.smsclub.mobi/token/getbalance.php?username=' + login + '&token=' + token; 
            https.get(url, (res) =>{
                
                console.log( 'status:' + res.statusCode);
                var buffer = "";

                res.on( "data", function( data ) {
                    buffer = buffer + data; 
                });

                res.on( "end", function( data ) {

                    balance = '';
                    for (var i = 0; i < buffer.length; i++) {
                        if(buffer[i] == '<')
                            break;
                        balance += buffer[i];    
                    }
                    
                    var obj = {
                        res: userIsFind,
                        token: token,
                        pattern: pattern,
                        alphaname: alphaname,
                        balance: balance
                    };
                    console.log("Result for client: " + obj);
                    result.json(obj);
                });
            });
        });
    }); 
});

module.exports = router;

