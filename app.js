
const config = require(__dirname + '/config.js');
var request = require('request');



var login = function(cb) {
   var url = 'https://www.schule-lausen.ch/login.php';
   request({
      uri: config.portal.loginUrl,
      method: 'POST',
      formData: {
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
         cb(null, response, body);
      }
   });
};




localLogin(23,0,'https://www.schule-lausen.ch/login.php',config.user.name,config.user.password,0,'https://www.schule-lausen.ch/admin.php?page_request=5','');


function localLogin(projectId,portalId,loginUrl,username,password,loginDurationInHours,successUrl,statusDivName,errorMessageDivName,local,loginToken)
{

      var returnValue = false;

      jQuery.ajax({
              type: 'POST',
              url: loginUrl,
              async: true,
              cache: false,
              timeout: 3000,
              dataType: 'json',
              data:
              {
                username: username,
                portalId: portalId,
                password: password,
                loginToken:loginToken,
                successUrl: successUrl,
                loginDurationInHours: loginDurationInHours,
                newLogin: true
               },
      }).always(function (dataOrjqXHR, textStatus, jqXHRorErrorThrown) {
              jQuery('#'+statusDivName).html('bitte warten...');
      })
      .done(function (data, textStatus, jqXHR) {
              if(data.success )
              {
                    var redirectUrl = data.redirectUrl;
                    var loginToken = data.loginToken;
                    var portalId = data.portalId;

                    jQuery('#'+statusDivName).html('Login erfolgreich, bitte warten...');
                    if( redirectUrl != undefined )
                    {
                          window.location = redirectUrl;
                          returnValue = true;
                    }


              }
              else
              {
                  if( data.errorMessage != undefined )
                  {
                        jQuery('#'+errorMessageDivName).html(data.errorMessage);


                        if( errorMessageDivName == 'newErrorMessageDiv' )
                        {
                              jQuery('#alertBox').show(0);
                              jQuery('.form-signin').removeClass('sending');
                        }
                  }
                  else
                  {
                        jQuery('#'+errorMessageDivName).html('Ein unbekannter Fehler ist aufgetreten. Bitte kontaktieren Sie Schulwebsite.');

                        if( errorMessageDivName == 'newErrorMessageDiv' )
                        {
                              jQuery('#alertBox').show(0);
                              jQuery('.form-signin').removeClass('sending');
                        }
                  }
                  jQuery('#'+statusDivName).html('');
              }

      });

      return returnValue;

}