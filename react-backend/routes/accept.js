var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;
const https = require('https');

var sendSms = require('../modules/sendToSmsGateway');

var url = "mongodb://localhost:27017/usersService";

/* GET users listing. */
router.post('/', (req, result) => {

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
                  database.close();
                  
                  //send smss
                  if(userIsFind){
                    var strPhones = "";
                    var phones = req.body.subscribers;

                    for(let i = 0; i<phones.length; i++ ){
                      if(i!= 0)strPhones += ';';
                      strPhones += phones[i][2];
                    }

                    //var password = "9o8w2ts";
                    // var login = "380953346403";
                    var alphaName = req.body.alphaname;
                    var abonents = strPhones;
                    var text = req.body.text;


                    var xmlBody = "<?xml version='1.0' encoding='utf-8'?>" +
                                  "<request_sendsms>" +
                                        "<username><![CDATA["+ login +"]]></username>" +
                                        "<password><![CDATA["+ pass +"]]></password>" +
                                        "<from><![CDATA[" + alphaName +"]]></from>" +
                                        "<to><![CDATA[" + abonents + "]]></to>" +
                                        "<text><![CDATA[" + text +"]]></text>" +
                                  "</request_sendsms>";
                    console.log(text);
                    
                    sendSms.sendMsg(xmlBody);

                    var token = req.body.token;
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
                                balance: balance
                            };
                            console.log("Result for client: " + obj.res);
                            result.json(obj);
                       });

                    });
                  }
              });
        });
});

module.exports = router;