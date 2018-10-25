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
         loginDurationInHours: 0,
         newLogin: true
      }
   }, function(e, response, body) {
      if(e) {
         console.log('error in request ' + url);
         console.log(e);
         cb(e);
      } else {
         console.log(body);
         console.log('--------------------------');
         console.log(request);
         console.log('--------------------------');
         console.log(request.cookie);
         //var redirectUrl = data.redirectUrl;
         //var loginToken = data.loginToken;
         //var portalId = data.portalId;
         cb(null, response, body);
      }
   });
};


login(function(){
   
});