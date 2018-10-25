const config = require(__dirname + '/config.js');
var request = require('request');





var login = function(cb) {
   request({
      url: config.portal.loginUrl,
      method: 'POST',
      form: {
         username: config.user.name,
         portalId: config.portal.id,
         password: config.user.password,
         loginToken: '',
         successUrl: config.portal.successUrl,
         loginDurationInHours: 1,
         newLogin: true
      },
      json: true
   }, function(e, response, body) {
      if(e) {
         console.log('error in request ' + url);
         console.log(e);
         cb(e);
      } else {
         //var data = JSON.parse(body);
         console.log(body);
         console.log('--------------------------');
         //var redirectUrl = data.redirectUrl;
         //var loginToken = data.loginToken;
         //var portalId = data.portalId;
         cb(null, body);
      }
   });
};


login(function(err,body){
   
});