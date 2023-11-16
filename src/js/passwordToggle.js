//Função de alternar o texto entre visivel e não visivel

function mostrarSenha(inputId, imgElement){
  var inputPass = document.getElementById(inputId);
  var siblingImgElement = imgElement.nextElementSibling || imgElement.previousElementSibling;

  if (inputPass.type === 'password'){
    inputPass.setAttribute('type', 'text');
    imgElement.style.display = 'none';
    siblingImgElement.style.display = 'block';
  } else {
    inputPass.setAttribute('type', 'password');
    imgElement.style.display = 'none';
    siblingImgElement.style.display = 'block';
  }
}
