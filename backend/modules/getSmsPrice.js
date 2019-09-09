var needle = require('needle');
var osmosis = require('osmosis');

var URL = 'https://smsclub.mobi/uk/pricing#tab-ua';

needle.get(URL, function(err, res){
    if (err) throw err;
    osmosis.get(URL)
    	   .find('#uah_1')
    	   .set('res')
    	   .data(function(data){
    	   	var str = data.res;

    	   	var reg = /\d,\d\d\d/i;
		    var result = reg.exec(str);
		    
			global.smsPrice = parseFloat(result[0].replace(',','.'));	
            
			    
    	   });

});