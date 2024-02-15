document.getElementById('recuperarSenhaForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var token = document.getElementById('cf-turnstile-response').value; 
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === '' || !re.test(String(email).toLowerCase()) || token === '') { 
        alert('Por favor, insira um email válido e complete o captcha.');
        return;
    }

    fetch('/requestPasswordReset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, 'cf-turnstile-response': token }), 
    })
        .then(response => response.json())
        .then(data => {
            alert('Email enviado!');
            window.location.href = '/login';
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
});


window.javascriptCallback = function () {
    turnstile.render('.cf-turnstile', {
        sitekey: '0x4AAAAAAARzTbUy-vCJHVFA',
        callback: function (token) {
            document.getElementById('cf-turnstile-response').value = token;
        },
    });
};
