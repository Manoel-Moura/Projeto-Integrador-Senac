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
function verificarConfirmacao(confirmacaoSenha) {
    var senha = document.getElementById('senhaCadastro').value;
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
    var campos = ['username', 'email', 'senhaCadastro', 'confirmarSenhaCadastro', 'cpf', 'data'];
    var mensagens = ['Por favor, preencha todos os campos obrigatórios.', 'Por favor, insira um email válido.', 'A senha deve ter pelo menos 8 caracteres.', 'As senhas não coincidem.', 'Por favor, insira um CPF válido.', 'Por favor, insira uma data válida.'];
    var validacoes = [verificarPreenchido, verificarEmail, verificarSenha, verificarConfirmacao, verificarCPF, verificarData];

    for (var i = 0; i < campos.length; i++) {
        var campo = document.getElementById(campos[i]).value;
        if (!validacoes[i](campo)) {
            alert(mensagens[i]);
            return false;
        }
    }

    enviarDadosFormulario();
    return true;
}

// Função para enviar os dados do formulário para o servidor usando fetch
function enviarDadosFormulario() {
    var url = '/cadastroUser';
    var formulario = document.getElementById('cardCadastro');

    var data = {
        username: formulario.elements.username.value,
        email: formulario.elements.email.value,
        senhaCadastro: formulario.elements.senhaCadastro.value,
        confirmarSenhaCadastro: formulario.elements.confirmarSenhaCadastro.value,
        cpf: formulario.elements.cpf.value,
        data: formulario.elements.data.value
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
        alert('Conta cadastrada com sucesso!');
        window.location.href = '/login'; 
    })
    .catch(error => {
        console.error('Erro ao enviar requisição:', error);
        alert('Ocorreu um erro ao tentar criar a conta');
    });
}

document.getElementById('cardCadastro').addEventListener('submit', function (event) {
    event.preventDefault(); 
    validarFormulario();
});
