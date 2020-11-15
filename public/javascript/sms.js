var accountSid = 'ACe3f0014b3ad7547b2468b276138857c5'; // Your Account SID from www.twilio.com/console
var authToken = '3aa1f4883617f411dff7adefd338e7db';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);


$(document).on("click", "#smsText", function() {
    console.log("I'm clicked");
    client.messages.create({
        body: 'Hello - test from Node',
        to: '+13105692944',  // Text this number
        from: '+13157549675' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
});
