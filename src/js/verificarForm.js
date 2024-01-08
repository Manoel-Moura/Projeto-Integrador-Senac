//Para o formulário de recuperar senha
document.getElementById('botao-enviar').addEventListener('click', function(event) {
    var email = document.getElementById('email').value;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === '' || !re.test(String(email).toLowerCase())) {
        alert('Por favor, insira um email válido.');
        event.preventDefault();
    }
});
