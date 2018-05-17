var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;

var sendSms = require('../modules/sendToSmsGateway');

var url = "mongodb://localhost:27017/usersService";

/* GET users listing. */
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
                  database.close();
                  
                  //send smss
                  if(userIsFind){
                    var strPhones = "";
                    var phones = req.body.subscribers;

                    for(let i = 0; i<phones.length; i++ ){
                      if(i!= 0)strPhones += ';';
                      strPhones += phones[i][2];
                    }

                    //var password = "9o8w2ts"

                    var alphaName = req.body.alphaname;
                    var abonents = strPhones;
                    var text = req.body.text;


                    var xmlBody = "<?xml version='1.0' encoding='utf-8'?>" +
                                  "<request_sendsms>" +
                                        "<username><![CDATA["+ login +"]]></username>" +
                                        "<password><![CDATA["+ password +"]]></password>" +
                                        "<from><![CDATA[" + alphaName +"]]></from>" +
                                        "<to><![CDATA[" + abonents + "]]></to>" +
                                        "<text><![CDATA[" + text +"]]></text>" +
                                  "</request_sendsms>";
                    //sendSms.sendMsg(xmlBody);
                  }
                  res.json({res:userIsFind});
              });
        });
});

module.exports = router;