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

document.getElementById('cpf').addEventListener('input', function (event) {
    formatarCPF(event.target);
});

function formatarCPF(input) {
    var cpf = input.value;
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = cpf;
}

// Verificar se o CPF é válido
function verificarCPF(cpf) {
    if (typeof cpf !== 'string') return false
    cpf = cpf.replace(/[\s.-]*/gim, '')
    if (
        !cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999"
    ) {
        return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(9, 10))) return false
    soma = 0
    for (var i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(10, 11))) return false
    return true
}


function verificarData(data) {
    var re = /^\d{4}-\d{2}-\d{2}$/;
    if (!re.test(data) || isNaN(Date.parse(data))) {
        return false;
    }

    var dataNascimento = new Date(data);
    var dataAtual = new Date();
    var idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
    var m = dataAtual.getMonth() - dataNascimento.getMonth();

    if (m < 0 || (m === 0 && dataAtual.getDate() < dataNascimento.getDate())) {
        idade--;
    }

    return idade >= 13;
}

// Função para validar o formulário
function validarFormulario() {
    var campos = ['username', 'email', 'senhaCadastro', 'confirmarSenhaCadastro', 'cpf', 'data'];
    var mensagens = ['Por favor, preencha todos os campos obrigatórios.', 'Por favor, insira um email válido.', 'A senha deve ter pelo menos 8 caracteres.', 'As senhas não coincidem.', 'Por favor, insira um CPF válido.', 'Por favor, insira uma data válida. Apenas maiores de 13 anos podem se cadastrar! '];
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
    var formulario = document.getElementById('cardCadastro');

    var data = new FormData(formulario);

    fetch('/cadastroUser', {
        method: 'POST',
        body: data,
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error('Erro ao fazer cadastro: ' + data.error);
                });
            }
            return response.json();
        })
        .then(data => {
            alert('Conta cadastrada com sucesso!');
            window.location.href = '/login';
        })
        .catch(error => {
            console.error('Erro ao enviar requisição:', error);
            alert(error.message);
            formulario.reset();
            window.javascriptCallback();
        });
}

document.getElementById('cardCadastro').addEventListener('submit', function (event) {
    event.preventDefault();
    validarFormulario();
});

window.javascriptCallback = function () {
    turnstile.render('.cf-turnstile', {
      sitekey: '0x4AAAAAAARzTbUy-vCJHVFA',
      callback: function (token) {
        document.getElementById('cf-turnstile-response').value = token;
      },
    });
  };