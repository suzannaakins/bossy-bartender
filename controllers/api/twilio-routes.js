require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const router = require('express').Router();

router.post("/", (req,res) => {
    client.messages.create({
        body: 'Hello - test from Node',
        to: '+13105692944',  // Text this number
        from: '+13157549675' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
})

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+15017122661',
//      to: '+15558675310'
//    })
//   .then(message => console.log(message.sid));

module.exports = router;