async function sendText(event) {
    event.preventDefault();
  
    const phone_number = document.querySelector('.phone').value;
    console.log(phone_number)
    const recipe = "Recipe";
  
    if (phone_number) {
        const response = await fetch('/api/twilio', {
        method: 'POST',
        body: JSON.stringify({
            phone_number,
            recipe,
          }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

// Query Selector & Fetch
document.querySelector('#smsText').addEventListener('click', sendText);





