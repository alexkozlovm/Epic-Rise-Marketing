document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default submission to show custom message

    fetch(event.target.action, {
        method: 'POST',
        body: new FormData(event.target),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            document.getElementById('formStatus').textContent = 'Thank you for your message!';
            document.getElementById('formStatus').style.color = 'green';
            event.target.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    document.getElementById('formStatus').textContent = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    document.getElementById('formStatus').textContent = 'Oops! There was a problem submitting your form.';
                }
                document.getElementById('formStatus').style.color = 'red';
            })
        }
    }).catch(error => {
        document.getElementById('formStatus').textContent = 'Oops! There was a problem submitting your form.';
        document.getElementById('formStatus').style.color = 'red';
    });
});