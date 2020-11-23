require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const router = require('express').Router();

// Send the text via Twilio
router.post('/', (req,res) => {
    client.messages.create({
        to: req.body.phone_number,
        body: req.body.recipe,
        from: '+13157549675' 
    })
    .then((message) => console.log(message.sid));
})

module.exports = router;