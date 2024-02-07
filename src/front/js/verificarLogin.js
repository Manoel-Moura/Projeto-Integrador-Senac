document.getElementById('bt-login').addEventListener('click', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === '' || password === '') {
        alert('Por favor, preencha todos os campos antes de entrar.');
        return;
    }

    var url = '/login'; 
    var data = {
        username: username,
        password: password
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta do servidor');
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            alert('Erro ao fazer login: ' + data.error);
        } else {
            window.location.href = './home.html'; 
        }
    })
    .catch(error => {
        console.error('Erro ao enviar requisição:', error);
        alert('Ocorreu um erro ao tentar fazer login. Usuário ou senha incorretos.');
    });
});
