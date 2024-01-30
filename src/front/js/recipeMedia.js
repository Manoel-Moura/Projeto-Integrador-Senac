function criarFormulario(titulo) {
  var formExistente = document.querySelector(".form_inicial");

  var form = document.createElement("div");
  form.className = "form_inicial";
  form.onsubmit = function (e) {
    e.preventDefault();
    var inputs = form.querySelectorAll('input, textarea');
    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        alert('Por favor, preencha todos os campos antes de enviar.');
        return false;
      }
    }
    alert('Formulário enviado com sucesso!');
    return true;
  };

  // Define os campos do formulário
  var campos = ["titulo", "descricao", "porcoes", "preparacao", "cozimento"];
  var labels = ["Título:", "Descrição:", "Número de Porções:", "Tempo de Preparação:", "Tempo de Cozimento:"];

  for (var i = 0; i < campos.length; i++) {
    var div = document.createElement("div");
    div.className = "itemForm";

    var label = document.createElement("label");
    label.htmlFor = campos[i];
    label.textContent = labels[i];

    var input;
    if (campos[i] === "descricao") {
      input = document.createElement("textarea");
    } else if (campos[i] === "porcoes") {
      input = document.createElement("input");
      input.type = "number";
    } else {
      input = document.createElement("input");
      input.type = "text";
    }

    input.id = campos[i];
    input.name = campos[i];

    if (campos[i] === "preparacao" || campos[i] === "cozimento") {
      input.placeholder = "Especifique em minutos";
    }

    div.appendChild(label);
    div.appendChild(input);
    form.appendChild(div);
  }

  formExistente.parentNode.replaceChild(form, formExistente);
}


criarFormulario();

var categorias = ["Aperitivos", "Sopas", "Acompanhamentos", "Pratos principais", "Pães e produtos de panificação", "Salada e molhos para saladas", "Molhos e condimentos", "Sobremesas", "Lanches", "Bebidas", "Café da manhã", "Lanches noturnos", "Almoço", "Jantar", "Outros"];

var fileira = document.querySelector(".fileira");

for (var i = 0; i < categorias.length; i++) {

  var item = document.createElement("div");
  var input = document.createElement("input");
  var label = document.createElement("label");
  var p = document.createElement("p");

  item.className = "item";
  input.type = "checkbox";
  input.id = categorias[i].toLowerCase().replace(/ /g, "");
  input.name = "categorias[]"; 
  input.value = categorias[i]; 
  label.htmlFor = input.id;
  p.textContent = categorias[i];

  item.appendChild(input);
  item.appendChild(label);
  item.appendChild(p);

  fileira.appendChild(item);
}



// Função para verificar o tamanho do arquivo
function checarTamanhoArquivo(file) {
  var size = file.size / 1024 / 1024; // tamanho em MB
  if (size > 5) {
    alert('O arquivo excede o limite de 5MB. Por favor, carregue uma imagem menor.');
    return false;
  }
  return true;
}

// Função para criar uma nova imagem
function criarNovaImagem(src) {
  var newImage = document.createElement('img');
  newImage.src = src;
  newImage.style.width = '100%';
  newImage.style.height = '100%';
  return newImage;
}

// Função para inicializar o cropper
function inicializarCropper(image) {
  return new Cropper(image, {
    viewMode: 1,
    dragMode: 'move',
    autoCropArea: 1,
    restore: false,
    modal: false,
    guides: false,
    highlight: false,
    cropBoxMovable: true,
    cropBoxResizable: true,
    toggleDragModeOnDblclick: false,
    zoomOnTouch: true,
    zoomOnWheel: true,
    crop: function (event) {
      console.log(event.detail.x);
      console.log(event.detail.y);
      console.log(event.detail.width);
      console.log(event.detail.height);
      console.log(event.detail.rotate);
      console.log(event.detail.scaleX);
      console.log(event.detail.scaleY);
    }
  });
}


function carregarImagem(inputId, imageId) {
  var input = document.getElementById(inputId);
  var image = document.getElementById(imageId);
  var icon = document.querySelector('.media-icon');
  var mediaUploadArea = document.querySelector('.media-upload-area');

  if (window.cropper) {
    window.cropper.destroy();
  }

  if (input.files && input.files[0]) {
    if (!checarTamanhoArquivo(input.files[0])) {
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      var existingImage = mediaUploadArea.querySelector('img:not(.media-icon img)');
      if (existingImage) {
        mediaUploadArea.removeChild(existingImage);
      }

      var newImage = criarNovaImagem(e.target.result);
      mediaUploadArea.appendChild(newImage);
      icon.style.display = 'none';

      window.cropper = inicializarCropper(newImage);

      // Mostrar o botão "Salvar" quando a imagem é carregada
      document.getElementById('botaoSalvarEdicao').style.display = 'block';
    }
    reader.readAsDataURL(input.files[0]);

    // Armazenar a imagem em uma variável global
    window.foto = input.files[0];

    input.value = null;
  } else if (input.value) {
    var existingImage = mediaUploadArea.querySelector('img:not(.media-icon img)');
    if (existingImage) {
      mediaUploadArea.removeChild(existingImage);
    }

    var newImage = criarNovaImagem(input.value);
    mediaUploadArea.appendChild(newImage);
    icon.style.display = 'none';

    window.cropper = initializeCropper(newImage);

    document.getElementById('botaoSalvarEdicao').style.display = 'block';
  }
}



// Função para salvar a edição
function salvarEdicao() {
  if (window.cropper) {

    window.cropper.getCroppedCanvas().toBlob(function (blob) {

      var url = URL.createObjectURL(blob);

      var newImage = criarNovaImagem(url);

      var mediaUploadArea = document.querySelector('.media-upload-area');
      var existingImage = mediaUploadArea.querySelector('img:not(.media-icon img)');
      if (existingImage) {
        mediaUploadArea.removeChild(existingImage);
      }

      // Adicionar a nova imagem à área de upload de mídia
      mediaUploadArea.appendChild(newImage);

      if (window.cropper) {
        window.cropper.destroy();
        window.cropper = null;
      }
    });
  }
}

//Pro botão de carregar imagem
document.addEventListener('DOMContentLoaded', function () {
  var loadButton = document.getElementById('botaoCarregarImagem');
  loadButton.addEventListener('click', function () {
    event.preventDefault();
  });
});


//Pro botão de salvar imagem
document.addEventListener('DOMContentLoaded', function () {
  var loadButton = document.getElementById('botaoSalvarEdicao');
  loadButton.addEventListener('click', function () {
    event.preventDefault();
  });
});

//Mensagem de erro caso o campo de url esteja vazio.
document.addEventListener('DOMContentLoaded', function () {
  var loadButton = document.getElementById('botaoCarregarVideo');
  var videoContainer = document.getElementById('videoContainer');
  var input = document.getElementById('linkVideo');

  videoContainer.style.display = 'none';

  loadButton.addEventListener('click', function () {
    // Verifica se o campo de URL está vazio
    if (!input.value) {
      alert('Por favor, insira uma URL de vídeo antes de tentar carregar.');
      return;
    }
    event.preventDefault();
    videoContainer.style.display = 'block';
  });
});


// Função para carregar o vídeo
function carregarVideo() {
  var input = document.getElementById('linkVideo');
  var videoContainer = document.getElementById('videoContainer');
  var videoImage = document.getElementById('linkVideoImage');
  var cancelButton = document.getElementById('botaoCancelarVideo');

  //Apenas vídeos do youtube por enquanto
  var newIframe = document.createElement('iframe');
  newIframe.src = 'https://www.youtube.com/embed/' + getYouTubeID(input.value);
  newIframe.style.width = '100%';
  newIframe.style.height = '100%';

  // Limpar o container de vídeo
  while (videoContainer.firstChild) {
    videoContainer.removeChild(videoContainer.firstChild);
  }

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
function cancelarVideo() {
  var input = document.getElementById('linkVideo');
  var videoContainer = document.getElementById('videoContainer');
  var videoImage = document.getElementById('linkVideoImage');
  var cancelButton = document.getElementById('botaoCancelarVideo');

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

