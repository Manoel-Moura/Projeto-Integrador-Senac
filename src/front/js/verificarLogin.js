document.getElementById('bt-login').addEventListener('click', function(event) {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === '' || password === '') {
        alert('Por favor, preencha todos os campos antes de entrar.');
        event.preventDefault();
    }
});

