const https = require('https');

module.exports.getBalance =  (login, token) => {
	new Promise((resolve, rej) => {
			var url = 'https://gate.smsclub.mobi/token/getbalance.php?username=' + login + '&token=' + token; 
			var balance = "balance";
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
				 
				 console.log('balance:' + ' '+ balance);			    	
			    	return balance;
	    	});
		});
	});
}