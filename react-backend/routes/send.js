var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  
});

router.post('/', (req, res) => {

    let isSucces = false;
    let sub = req.body.subscribers;
    let newTable = [];
    
    for(let i=0; i<sub.length; i++ )
    {
      newTable.push({
        lastname: sub[i].lastname,
        firstname: sub[i].firstname,
        phone: sub[i].phone,
        smsType: 'sms'
      }) 
    }

    isSucces = true;
    let obj = {
      subscribersTypeSMS : newTable,
      smsCost: global.smsPrice,
      result: isSucces
    };


    res.json(obj);
});

module.exports = router;