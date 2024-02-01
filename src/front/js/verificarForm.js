document.getElementById('recuperarSenhaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === '' || !re.test(String(email).toLowerCase())) {
        alert('Por favor, insira um email válido.');
        return;
    }

    fetch('/requestPasswordReset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Email enviado!');
        window.location.href = './login.html';
    })
    .catch((error) => {
        console.error('Erro:', error);
    });
});
