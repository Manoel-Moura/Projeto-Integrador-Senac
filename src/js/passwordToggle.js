// Função para mostrar a senha
function mostrarSenha(inputId, imgElement) {
  var inputPass1 = document.getElementById('novaSenha');
  var inputPass2 = document.getElementById('confirmarSenha');
  var imgElement1 = document.querySelector('#novaSenha ~ .toggle-password-visibility');
  var imgElement2 = document.querySelector('#confirmarSenha ~ .toggle-password-visibility');
  var siblingImgElement1 = imgElement1.nextElementSibling || imgElement1.previousElementSibling;
  var siblingImgElement2 = imgElement2.nextElementSibling || imgElement2.previousElementSibling;

  if (inputPass1.type === "password") {
    inputPass1.setAttribute("type", "text");
    inputPass2.setAttribute("type", "text");
    imgElement1.style.display = "none";
    imgElement2.style.display = "none";
    siblingImgElement1.style.display = "block";
    siblingImgElement2.style.display = "block";
  } else {
    inputPass1.setAttribute("type", "password");
    inputPass2.setAttribute("type", "password");
    imgElement1.style.display = "none";
    imgElement2.style.display = "none";
    siblingImgElement1.style.display = "block";
    siblingImgElement2.style.display = "block";
  }
}

// Função para validar a senha
function validarSenha(senha) {
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(senha);
}

// Função para mostrar os requisitos da senha
function mostrarRequisitos(inputId) {
  var infoBalloon = document.getElementById('infoBalloon');
  if (!infoBalloon) {
    infoBalloon = document.createElement('div');
    infoBalloon.id = 'infoBalloon';
    document.body.appendChild(infoBalloon);
  }

  while (infoBalloon.firstChild) {
    infoBalloon.removeChild(infoBalloon.firstChild);
  }

  var ul = document.createElement('ul');
  ul.id = 'password-requisitos';
  ul.style.listStyleType = 'none';

  // Adiciona os itens da lista
  ul.appendChild(criarRequisitoElemento('length', 'Pelo menos 8 caracteres', 'red'));
  ul.appendChild(criarRequisitoElemento('lowercase', 'Pelo menos 1 letra minúscula', 'red'));
  ul.appendChild(criarRequisitoElemento('uppercase', 'Pelo menos 1 letra maiúscula', 'red'));
  ul.appendChild(criarRequisitoElemento('number', 'Pelo menos 1 número', 'red'));
  ul.appendChild(criarRequisitoElemento('symbol', 'Pelo menos 1 símbolo', 'red'));
  ul.appendChild(criarRequisitoElemento('match', 'As senhas correspondem', 'red'));

  infoBalloon.appendChild(ul);

  var rowItem = document.querySelector('.row-item');
  var rect = rowItem.getBoundingClientRect();
  infoBalloon.style.position = 'absolute';
  infoBalloon.style.backgroundColor = '#333';
  infoBalloon.style.color = 'white';
  infoBalloon.style.padding = '10px';
  infoBalloon.style.borderRadius = '5px';
  infoBalloon.style.bottom = (window.innerHeight - rect.top) + 'px';

  var infoBalloonRect = infoBalloon.getBoundingClientRect();
  infoBalloon.style.left = (rect.left + rect.width / 2 - infoBalloonRect.width / 2) + 'px';

  validarRequisitos();
}

// Função auxiliar para criar os elementos dos requisitos
function criarRequisitoElemento(id, texto, cor) {
  var li = document.createElement('li');
  li.id = id;
  li.textContent = texto;
  li.style.color = cor;
  return li;
}

window.addEventListener('load', function() {
  mostrarRequisitos();
});

// Adicionar event listeners para validar requisitos quando a senha é digitada
document.getElementById('novaSenha').addEventListener('keyup', validarRequisitos);
document.getElementById('confirmarSenha').addEventListener('keyup', validarRequisitos);

function validarRequisitos() {
  setTimeout(function() {
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