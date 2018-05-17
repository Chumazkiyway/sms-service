var express = require('express');
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/usersService";

/* GET users listing. */
router.get('/', function(req, res, next) {
  
});

router.post('/', (req, res) => {

  //validation
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
                  
                  //process table
                  let sub = req.body.subscribers;
                  let newTable = [];
                  
                  if(userIsFind){
                     for(let i=0; i<sub.length; i++ ){
                      newTable.push({
                        lastname: sub[i].lastname,
                        firstname: sub[i].firstname,
                        phone: sub[i].phone,
                        smsType: 'sms'
                      }); 
                    }
                  }


                  let obj = {
                    subscribersTypeSMS : newTable,
                    smsCost: global.smsPrice,
                    result: userIsFind
                  };

                  res.json(obj);
            });
      });  
});

module.exports = router;