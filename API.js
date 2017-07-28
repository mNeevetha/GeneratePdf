const express = require('express');
const router = express.Router();
const fetch=require('isomorphic-fetch');
var fs = require('fs');
var contentbody;
// Fetch List of APS query records for a single user
router.get('/', (req, res, next) => {
 
fs.readFile('CCD.sample.xml', {encoding: "utf-8"}, function(err, data){
  contentbody=data.replace("\r\n","");//.replace("&lt;","<").replace("&gt;",">").replace("&quot;",'"').replace("&amp;",'&');
  
  //res.json({contentbody});
   console.log("etstst");
  var result = fetch('http://ec2-34-224-54-192.compute-1.amazonaws.com:80/',{
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/play, text/html,text/xml, *.*',
        'Content-Type': 'text/xml'
      },
      body: contentbody,
    });
    

    result.then(function(response) {
      console.log('response', response)
      console.log('header', response.headers.get('Content-Type'))
      return response.text()
    }).then(function(text) {
      res.json({
          text: text,
          body:contentbody
        });
    }).catch(function(ex) {
    res.json({
      error: 'User not authenticated',
   
    });
    });

})

});

module.exports = router;