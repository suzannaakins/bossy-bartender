function sendText() {
    fetch('http://localhost:3002/api/twilio', {
        method: 'POST'
    })
};

// Query Selector & Fetch
document.querySelector('#smsText').addEventListener('click', sendText);





