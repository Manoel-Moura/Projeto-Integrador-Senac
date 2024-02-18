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
  var campos = ["titulo", "descricao", "porcoes", "preparacao"];
  var labels = ["Título:", "Descrição:", "Número de Porções:", "Tempo de Preparação:"];

  for (var i = 0; i < campos.length; i++) {
    var div = document.createElement("div");
    div.className = "itemForm";

    var label = document.createElement("label");
    label.htmlFor = campos[i];
    label.textContent = labels[i];

    var input;
    if (campos[i] === "descricao") {
      input = document.createElement("textarea");
    } else if (campos[i] === "porcoes" || campos[i] === "preparacao") {
      input = document.createElement("input");
      input.type = "number";
    } else {
      input = document.createElement("input");
      input.type = "text";
    }

    input.id = campos[i];
    input.name = campos[i];

    if (campos[i] === "preparacao") {
      input.placeholder = "Especifique em minutos";
    }

    div.appendChild(label);
    div.appendChild(input);
    form.appendChild(div);
  }

  formExistente.parentNode.replaceChild(form, formExistente);
}


criarFormulario();
var fileira = document.querySelector(".fileira");

function novaCategoria(nomeCategoria) {
  var item = document.createElement("div");
  var input = document.createElement("input");
  var label = document.createElement("label");
  var p = document.createElement("p");

  item.className = "item";
  input.type = "checkbox";
  input.id = nomeCategoria.toLowerCase().replace(/ /g, "");
  input.name = "categorias[]";
  input.value = nomeCategoria;
  label.htmlFor = input.id;
  p.textContent = nomeCategoria;

  item.appendChild(input);
  item.appendChild(label);
  item.appendChild(p);

  fileira.appendChild(item);
}

// Faz uma solicitação GET para a rota /categoria
fetch('/criarCategoria')
  .then(response => response.json())
  .then(categorias => {
    // Cria um item de categoria para cada categoria
    categorias.forEach(categoria => {
      novaCategoria(categoria.nome);
    });
  })
  .catch(error => console.error('Erro:', error));



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


var arquivoImagem; // Variável global para armazenar o arquivo de imagem
var formatoImagem; // Variável global para armazenar o formato da imagem
var nomeImagem; // Variável global para armazenar o nome da imagem

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

    var file = input.files[0];
    var fileType = file["type"];
    var validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/bmp", "image/webp", "image/svg+xml", "image/x-icon"];
    if (!validImageTypes.includes(fileType)) {
      alert('Por favor, carregue um arquivo de imagem.');
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

    // Armazenar o arquivo de imagem na variável global
    arquivoImagem = input.files[0];
    // Armazenar o formato da imagem na variável global
    formatoImagem = input.files[0].type;
    // Armazenar o nome da imagem na variável global
    nomeImagem = input.files[0].name;

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

function salvarEdicao() {
  var mediaUploadArea = document.querySelector('.media-upload-area');
  var existingImage = mediaUploadArea.querySelector('img:not(.media-icon img)');
  if (existingImage) {
    existingImage.remove();
  }

  if (window.cropper) {
    window.cropper.getCroppedCanvas().toBlob(function (blob) {
      var url = URL.createObjectURL(blob);
      var newImage = criarNovaImagem(url);

      // Adicionar a nova imagem à área de upload de mídia
      mediaUploadArea.appendChild(newImage);

      if (window.cropper) {
        window.cropper.destroy();
        window.cropper = null;
      }

      // Criar um novo File com o blob da imagem recortada e o nome original da imagem
      arquivoImagem = new File([blob], nomeImagem, { type: formatoImagem });
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

function isValidYouTubeURL(url) {
  var pattern = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
  return pattern.test(url);
}

//Mensagem de erro caso o campo de url esteja vazio.
document.addEventListener('DOMContentLoaded', function () {
  var loadButton = document.getElementById('botaoCarregarVideo');
  var videoContainer = document.getElementById('videoContainer');
  var input = document.getElementById('linkVideo');
  var cancelButton = document.getElementById('botaoCancelarVideo');

  videoContainer.style.display = 'none';

  loadButton.addEventListener('click', function () {
    // Verifica se o campo de URL está vazio ou se a URL é inválida
    if (!input.value || !isValidYouTubeURL(input.value)) {
      alert('Por favor, insira uma URL de vídeo válida antes de tentar carregar.');
      return;
    }
    event.preventDefault();
    carregarVideo(); 
    videoContainer.style.display = 'block';
  });

  cancelButton.addEventListener('click', function(event) {
    event.preventDefault();
    cancelarVideo();
  });
});

// Função para carregar o vídeo
function carregarVideo() {
  event.preventDefault();
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
  var video_id;
  if (url.includes('youtu.be')) {
    video_id = url.split('youtu.be/')[1];
  } else {
    video_id = url.split('v=')[1];
  }
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

