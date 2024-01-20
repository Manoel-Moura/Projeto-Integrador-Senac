// Verificar se o campo foi preenchido
function verificarPreenchido(campo) {
    return !!campo;
}

// Verificar se o email é válido
function verificarEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Verificar se a senha tem pelo menos 8 caracteres
function verificarSenha(senha) {
    return senha.length >= 8;
}

// Verificar se a senha e a confirmação de senha são iguais
function verificarConfirmacaoSenha(confirmacaoSenha) {
    var senha = document.getElementById('password').value;
    return senha === confirmacaoSenha;
}

// Verificar se o CPF é válido
function verificarCPF(cpf) {
    var re = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
    return re.test(cpf);
}

// Verificar se a data é válida
function verificarData(data) {
    var re = /^\d{4}-\d{2}-\d{2}$/;
    return re.test(data) && !isNaN(Date.parse(data));
}

// Função para validar o formulário
function validarFormulario() {
    var campos = ['username', 'email', 'password', 'confirmPassword', 'cpf', 'data'];
    var mensagens = ['Por favor, preencha todos os campos obrigatórios.', 'Por favor, insira um email válido.', 'A senha deve ter pelo menos 8 caracteres.', 'As senhas não coincidem.', 'Por favor, insira um CPF válido.', 'Por favor, insira uma data válida.'];
    var validacoes = [verificarPreenchido, verificarEmail, verificarSenha, verificarConfirmacaoSenha, verificarCPF, verificarData];

    for (var i = 0; i < campos.length; i++) {
        var campo = document.getElementById(campos[i]).value;
        if (!validacoes[i](campo)) {
            alert(mensagens[i]);
            return false;
        }
    }

    return true;
}

// Para evitar que seja enviado sem concluir os requisitos
document.getElementById('bt-cadastro').addEventListener('click', function(event) {
    if (!validarFormulario()) {
        event.preventDefault();  
    }
});