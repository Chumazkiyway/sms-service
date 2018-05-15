var express = require('express');
var router = express.Router();
var sendSms = require('../modules/sendToSmsGateway');
/* GET users listing. */
router.post('/', (req, res) => {
  var strPhones = "";
  var phones = req.body.subscribers;

  for(let i = 0; i<phones.length; i++ ){
    if(i!= 0)strPhones += ';';
    strPhones += phones[i][2];
  }

//var password = "9o8w2ts"
//"380631001769;380930285396";
var login = req.body.login;
var password = req.body.pass;
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

console.log(login);
console.log(password);
console.log(alphaName);
console.log(abonents);
console.log(text);
console.log(xmlBody);
sendSms.sendMsg(xmlBody);
res.json({res:true});
});

module.exports = router;