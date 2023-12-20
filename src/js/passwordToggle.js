// Função para mostrar a senha
function mostrarSenha(inputId, imgElement) {
  var inputPass = document.getElementById(inputId);
  var siblingImgElement =
    imgElement.nextElementSibling || imgElement.previousElementSibling;

  if (inputPass.type === "password") {
    inputPass.setAttribute("type", "text");
    imgElement.style.display = "none";
    siblingImgElement.style.display = "block";
  } else {
    inputPass.setAttribute("type", "password");
    imgElement.style.display = "none";
    siblingImgElement.style.display = "block";
  }
}

// Função para validar a senha
function validarSenha(senha) {
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(senha);
}

// Função para validar se o usuário digitou a senha corretamente antes do envio
document.querySelector('.row-item').addEventListener('submit', function(event) {
  var newPassword = document.getElementById('newPassword');
  var confirmPassword = document.getElementById('confirmPassword');

  if (!newPassword.value || !confirmPassword.value) {
    alert('Por favor, preencha todos os campos antes de salvar.');
    event.preventDefault();
  } else if (!validarSenha(newPassword.value)) {
    alert('A senha deve ter no mínimo 8 caracteres, 1 símbolo, 1 número e 1 letra maiúscula.');
    event.preventDefault();
  } else if (newPassword.value !== confirmPassword.value) {
    alert('As duas senhas não correspondem.');
    event.preventDefault();
  }
});

// Função para mostrar os requisitos da senha
document.getElementById('newPassword').addEventListener('focus', function() {
  var infoBalloon = document.createElement('div');
  infoBalloon.innerHTML = '<ul id="password-requirements" style="list-style-type: none;">' +
    '<li id="length">Pelo menos 8 caracteres</li>' +
    '<li id="lowercase">Pelo menos 1 letra minúscula</li>' +
    '<li id="uppercase">Pelo menos 1 letra maiúscula</li>' +
    '<li id="number">Pelo menos 1 número</li>' +
    '<li id="symbol">Pelo menos 1 símbolo</li>' +
    '</ul>';
  infoBalloon.style.position = 'absolute';
  infoBalloon.style.backgroundColor = '#333';
  infoBalloon.style.color = 'white';
  infoBalloon.style.padding = '10px';
  infoBalloon.style.borderRadius = '5px';
  infoBalloon.style.bottom = '70px';
  infoBalloon.style.right = '20px';
  this.parentNode.appendChild(infoBalloon);
});

//Para validar indicando se tal requisito foi cumprido ou não no balão de requisitos
document.getElementById('newPassword').addEventListener('input', function() {
  var requirements = document.getElementById('password-requirements');
  if (this.value.length >= 8) {
    requirements.querySelector('#length').style.color = 'green';
  } else {
    requirements.querySelector('#length').style.color = 'red';
  }
  if (/[a-z]/.test(this.value)) {
    requirements.querySelector('#lowercase').style.color = 'green';
  } else {
    requirements.querySelector('#lowercase').style.color = 'red';
  }
  if (/[A-Z]/.test(this.value)) {
    requirements.querySelector('#uppercase').style.color = 'green';
  } else {
    requirements.querySelector('#uppercase').style.color = 'red';
  }
  if (/\d/.test(this.value)) {
    requirements.querySelector('#number').style.color = 'green';
  } else {
    requirements.querySelector('#number').style.color = 'red';
  }
  if (/[@$!%*?&]/.test(this.value)) {
    requirements.querySelector('#symbol').style.color = 'green';
  } else {
    requirements.querySelector('#symbol').style.color = 'red';
  }
});

document.getElementById('newPassword').addEventListener('blur', function() {
  var infoBalloon = this.parentNode.querySelector('div');
  if (infoBalloon) {
    this.parentNode.removeChild(infoBalloon);
  }
});
