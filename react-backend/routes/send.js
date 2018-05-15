var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([
    ['Alexandr', 'Volik','0930685396'],
    ['Alexandr', 'Volik','0930685396'],
    ['Alexandr', 'Volik','0930685396'],
    ['Alexandr', 'Volik','0930685396']
  ]);
  
});

router.post('/', (req, res) => {
	console.log('subscribers');
    console.log(req.body.subscribers);
});

module.exports = router;