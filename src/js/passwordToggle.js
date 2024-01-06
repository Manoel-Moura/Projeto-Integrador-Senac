// Função para alternar a visibilidade da senha
function alternarVisibilidadeSenha(inputId, imgElementId) {
  var inputPass = document.getElementById(inputId);
  var imgElement = document.querySelector(imgElementId + ' ~ .alternar-visibilidade-senha');
  var siblingImgElement = imgElement.nextElementSibling || imgElement.previousElementSibling;

  if (inputPass.type === "password") {
    inputPass.setAttribute("type", "text");
    imgElement.classList.add('hidden');
    siblingImgElement.classList.remove('hidden');
  } else {
    inputPass.setAttribute("type", "password");
    imgElement.classList.add('hidden');
    siblingImgElement.classList.remove('hidden');
  }
}

// Função que mostra e esconde a senha
function mostrarSenha() {
  alternarVisibilidadeSenha('novaSenha', '#novaSenha');
  alternarVisibilidadeSenha('confirmarSenha', '#confirmarSenha');
}

// Função para validar a senha
function validarSenha(senha) {
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(senha);
}

// Função para mostrar os requisitos da senha
function mostrarRequisitos(inputId) {
  const infoBalloon = document.getElementById('infoBalloon') || criarInfoBalloon();
  const ul = criarListaRequisitos();
  infoBalloon.appendChild(ul);
  posicionarInfoBalloon(infoBalloon);
  esconderInfoBalloon(infoBalloon);
  adicionarEventosSenha(infoBalloon);
}

// Função para criar o balão de requisitos
function criarInfoBalloon() {
  const infoBalloon = document.createElement('div');
  infoBalloon.id = 'infoBalloon';
  document.body.appendChild(infoBalloon);
  return infoBalloon;
}

//Função para criar os requisitos que vão aparecer no balão
function criarListaRequisitos() {
  const ul = document.createElement('ul');
  ul.id = 'password-requisitos';
  ul.style.listStyleType = 'none';

  // Adiciona os itens da lista
  ul.appendChild(criarRequisitoElemento('length', 'Pelo menos 8 caracteres', 'red'));
  ul.appendChild(criarRequisitoElemento('lowercase', 'Pelo menos 1 letra minúscula', 'red'));
  ul.appendChild(criarRequisitoElemento('uppercase', 'Pelo menos 1 letra maiúscula', 'red'));
  ul.appendChild(criarRequisitoElemento('number', 'Pelo menos 1 número', 'red'));
  ul.appendChild(criarRequisitoElemento('symbol', 'Pelo menos 1 símbolo', 'red'));
  ul.appendChild(criarRequisitoElemento('match', 'As senhas correspondem', 'red'));

  return ul;
}


// Função para posicionar o balão acima da row-item
function posicionarInfoBalloon(infoBalloon) {
  const rowItem = document.querySelector('.row-item');
  const rect = rowItem.getBoundingClientRect();
  infoBalloon.style.position = 'absolute';
  infoBalloon.style.backgroundColor = '#333';
  infoBalloon.style.color = 'white';
  infoBalloon.style.padding = '10px';
  infoBalloon.style.borderRadius = '5px';
  infoBalloon.style.bottom = (window.innerHeight - rect.top) + 'px';

  const infoBalloonRect = infoBalloon.getBoundingClientRect();
  infoBalloon.style.left = (rect.left + rect.width / 2 - infoBalloonRect.width / 2) + 'px';
}


//Função para esconder o balão
function esconderInfoBalloon(infoBalloon) {
  infoBalloon.style.display = 'none';
}

// Função para adicionar evento onde o balão vai aparecer e sumir
function adicionarEventosSenha(infoBalloon) {
  const novaSenha = document.getElementById('novaSenha');
  const confirmarSenha = document.getElementById('confirmarSenha');
  if (novaSenha && confirmarSenha) {
    novaSenha.addEventListener('focus', function() {
      infoBalloon.style.display = 'block';
    });
    confirmarSenha.addEventListener('focus', function() {
      infoBalloon.style.display = 'block';
    });

    // Esconde o balão quando o usuário desfoca dos campos de senha
    novaSenha.addEventListener('blur', function() {
      infoBalloon.style.display = 'none';
    });
    confirmarSenha.addEventListener('blur', function() {
      infoBalloon.style.display = 'none';
    });

    // Atualiza os requisitos quando o valor dos campos de senha muda
    novaSenha.addEventListener('input', validarRequisitos);
    confirmarSenha.addEventListener('input', validarRequisitos);
  }
}


// Função auxiliar para criar os elementos dos requisitos
function criarRequisitoElemento(id, texto, cor) {
  var li = document.createElement('li');
  li.id = id;
  li.textContent = texto;
  li.style.color = cor;
  return li;
}

window.addEventListener('load', function () {
  mostrarRequisitos();
});


// Evento de verificações
document.getElementById('botaoSalvar').addEventListener('click', function (event) {
  const novaSenha = document.getElementById('novaSenha');
  const confirmarSenha = document.getElementById('confirmarSenha');

  // Verifique se ambos os campos de senha não estão vazios
  if (novaSenha.value === '' || confirmarSenha.value === '') {
    alert('Por favor, preencha ambos os campos de senha antes de salvar.');
    event.preventDefault();  // Impede a submissão do formulário
  }

  // Verifique se a senha atende a todos os requisitos
  const requisitos = document.getElementById('password-requisitos');
  const todosOsRequisitosAtendidos = Array.from(requisitos.children).every(function (requisito) {
    return requisito.classList.contains('green');
  });

  if (!todosOsRequisitosAtendidos) {
    alert('Sua senha não atende a todos os requisitos. Por favor, verifique os requisitos e tente novamente.');
    event.preventDefault();  // Impede a submissão do formulário
  }
});


// Função de validar os requisitos
function validarRequisitos() {
  setTimeout(function () {
    var requisitos = document.getElementById('password-requisitos');
    var novaSenha = document.getElementById('novaSenha');
    var confirmarSenha = document.getElementById('confirmarSenha');
    if (novaSenha.value.length >= 8) {
      requisitos.querySelector('#length').style.color = 'green';
    } else {
      requisitos.querySelector('#length').style.color = 'red';
    }
    if (/[a-z]/.test(novaSenha.value)) {
      requisitos.querySelector('#lowercase').style.color = 'green';
    } else {
      requisitos.querySelector('#lowercase').style.color = 'red';
    }
    if (/[A-Z]/.test(novaSenha.value)) {
      requisitos.querySelector('#uppercase').style.color = 'green';
    } else {
      requisitos.querySelector('#uppercase').style.color = 'red';
    }
    if (/\d/.test(novaSenha.value)) {
      requisitos.querySelector('#number').style.color = 'green';
    } else {
      requisitos.querySelector('#number').style.color = 'red';
    }
    if (/[\W]/.test(novaSenha.value)) {
      requisitos.querySelector('#symbol').style.color = 'green';
    } else {
      requisitos.querySelector('#symbol').style.color = 'red';
    }
    if (novaSenha.value === confirmarSenha.value) {
      requisitos.querySelector('#match').style.color = 'green';
    } else {
      requisitos.querySelector('#match').style.color = 'red';
    }
  }, 0);
}