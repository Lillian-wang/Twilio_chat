const express = require('express');
const config = require('./config');
const twilio = require('twilio');
const path = require('path');

const AccessToken = twilio.jwt.AccessToken;
const IpMessagingGrant = AccessToken.IpMessagingGrant;
const twiliAccntInfoFromFile=config.getTwiliAccountSettingsfromFile ;

const TWILIO_ACCOUNT_SID = config.accountSid;
const TWILIO_IPM_SERVICE_SID = config.serviceSid ;
const TWILIO_IPM_API_KEY = config.apiKey;
const TWILIO_IPM_API_SECRET =  config.apiSecret;

const app = express();

// Mount Express middleware for serving static content from the "public"
// directory
app.use('/static', express.static(path.join(__dirname, 'static')))

app.get('/', function(request, response) {
	response.sendFile(__dirname + '/index.tpl');
});


/*
Generate an Access Token for a chat application user - it generates a random
username for the client requesting a token, and takes a device ID as a query
parameter.
*/
app.get('/token', function(request, response) {
    var identity = request.query.identity;
    var endpointId = request.query.endpointId;

    // Create a "grant" which enables a client to use IPM as a given user,
    // on a given device
    var ipmGrant = new IpMessagingGrant({
        serviceSid: TWILIO_IPM_SERVICE_SID,
        endpointId: endpointId
    });

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created

    var token = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_IPM_API_KEY, TWILIO_IPM_API_SECRET);
    token.addGrant(ipmGrant);
    token.identity = identity;

    // Serialize the token to a JWT string and include it in a JSON response
    response.send({
        identity: identity,
        token: token.toJwt()
    });
});

express.static.mime.define({
    'text/html': ['tpl']
});

app.listen(3000, function() {
	console.log('Twilio chat server working!');
});

