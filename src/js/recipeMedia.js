//Função para carregar a imagem
function loadImage(inputId, imageId) {
  var input = document.getElementById(inputId);
  var image = document.getElementById(imageId);
  var icon = document.querySelector('.media-icon');
  var mediaUploadArea = document.querySelector('.media-upload-area');

  if (input.files && input.files[0]) {
    var size = input.files[0].size / 1024 / 1024; // size in MB
    if (size > 5) {
      alert('O arquivo excede o limite de 5MB. Por favor, carregue uma imagem menor.');
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      var existingImage = mediaUploadArea.querySelector('img:not(.media-icon img)');
      if (existingImage) {
        mediaUploadArea.removeChild(existingImage);
      }

      var newImage = document.createElement('img');
      newImage.src = e.target.result;
      newImage.style.width = '100%';
      newImage.style.height = '100%';
      mediaUploadArea.appendChild(newImage);
      icon.style.display = 'none';
    }
    reader.readAsDataURL(input.files[0]);
  } else if (input.value) {
    var existingImage = mediaUploadArea.querySelector('img:not(.media-icon img)');
    if (existingImage) {
      mediaUploadArea.removeChild(existingImage);
    }

    var newImage = document.createElement('img');
    newImage.src = input.value;
    newImage.style.width = '100%';
    newImage.style.height = '100%';
    mediaUploadArea.appendChild(newImage);
    icon.style.display = 'none';
  }
}


//Mensagem de erro caso o campo de url esteja vazio.
document.addEventListener('DOMContentLoaded', function () {
  var loadButton = document.getElementById('recipeVideoButton');
  var videoContainer = document.getElementById('videoContainer');
  var input = document.getElementById('recipeVideo'); // Obter o campo de URL

  videoContainer.style.display = 'none';

  loadButton.addEventListener('click', function () {
    // Verifica se o campo de URL está vazio
    if (!input.value) {
      alert('Por favor, insira uma URL de vídeo antes de tentar carregar.');
      return;
    }

    videoContainer.style.display = 'block';
  });
});


// Função para carregar o vídeo
function loadVideo() {
  var input = document.getElementById('recipeVideo');
  var videoContainer = document.getElementById('videoContainer');
  var videoImage = document.getElementById('recipeVideoImage');
  var cancelButton = document.getElementById('cancelVideoButton');

  //Apenas vídeos do youtube por enquanto
  var newIframe = document.createElement('iframe');
  newIframe.src = 'https://www.youtube.com/embed/' + getYouTubeID(input.value);
  newIframe.style.width = '100%';
  newIframe.style.height = '100%';
  videoContainer.innerHTML = '';
  videoContainer.appendChild(newIframe);

  videoImage.style.display = 'none';
  input.style.display = 'none';
  cancelButton.style.display = 'block';

  videoContainer.style.display = 'block';
  document.querySelector('.form-item:nth-child(2) > .media-upload-area').classList.add('no-border');

}


//Por enquanto apenas aceitando vídeos do youtube, mas tarde vejo se adiciono outras plataformas
function getYouTubeID(url) {
  var video_id = url.split('v=')[1];
  var ampersandPosition = video_id.indexOf('&');
  if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }
  return video_id;
}

// Função para cancelar o vídeo e por outro no lugar
function cancelVideo() {
  var input = document.getElementById('recipeVideo');
  var videoContainer = document.getElementById('videoContainer');
  var videoImage = document.getElementById('recipeVideoImage');
  var cancelButton = document.getElementById('cancelVideoButton');

  var existingIframe = videoContainer.querySelector('iframe');
  if (existingIframe) {
    videoContainer.removeChild(existingIframe);
  }

  input.value = '';
  videoImage.style.display = 'block';
  videoContainer.style.display = 'none';
  input.style.display = 'block';
  cancelButton.style.display = 'none';
  document.querySelector('.form-item:nth-child(2) > .media-upload-area').classList.remove('no-border');

}

