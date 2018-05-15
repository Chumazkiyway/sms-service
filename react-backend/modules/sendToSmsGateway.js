
module.exports.sendMsg = function (xmlBody){

  var http = require("http");


  var postRequest = {
    host: "gate.smsclub.mobi",
    path: "/xml/",
    port: 80,
    method: "POST",
    headers: {
      'Accept': 'text/xml',
      'Content-Type': 'text/xml',
    }
  };
  var req = http.request( postRequest, function( res ){

     console.log( 'STATUS:' + res.statusCode);
     var buffer = "";

     res.on( "data", function( data ) {
      buffer = buffer + data; 
     } );

     res.on( "end", function( data ) {
      console.log( 'ResponseData:'+ buffer );
     } );

  });

  var buffer = "";

  req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
  });

  req.write(xmlBody);

  req.end();
}