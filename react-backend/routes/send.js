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

    let price = 0.26;
    isSucces = true;
    let obj = {
      subscribersTypeSMS : newTable,
      smsCost: price,
      result: isSucces
    };

    console.log(newTable);
    console.log(obj);
    res.json(obj);
});

module.exports = router;