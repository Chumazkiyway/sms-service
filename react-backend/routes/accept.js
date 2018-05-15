var express = require('express');
var router = express.Router();
var sendSms = require('../modules/sendToSmsGateway');
/* GET users listing. */
router.get('/', function(req, res, next) {
  

var login = "380953346403"; //req.body.login
var password = "9o8w2ts"; //req.body.password
var alphaName = "club_bulk"; //req.body.alphaName
var abonent ="380631001769;380930285396";
var text = "Добрый час"; //req.body.text



var xmlBody = "<?xml version='1.0' encoding='utf-8'?>" +
              "<request_sendsms>" +
                    "<username><![CDATA["+ login +"]]></username>" +
                    "<password><![CDATA["+ password +"]]></password>" +
                    "<from><![CDATA[" + alphaName +"]]></from>" +
                    "<to><![CDATA[" + abonent + "]]></to>" +
                    "<text><![CDATA[" + text +"]]></text>" +
              "</request_sendsms>";

sendSms.sendMsg(xmlBody);

  // res.json([
  //   ['Alexandr', 'Volik','0930685396','SMS'],
  //   ['Alexandr', 'Volik','0930685396','SMS'],
  //   ['Alexandr', 'Volik','0930685396','SMS'],
  //   ['Alexandr', 'Volik','0930685396','SMS']
  // ]);
  
});

module.exports = router;