// Relacionado aos campos de ingredientes
document.getElementById('adicionar_ingrediente').addEventListener('click', function (e) {
  e.preventDefault();

  var firstInput = document.querySelector('.ingredientes #unir_iconI input:first-of-type');
  if (firstInput) {
    firstInput.style.borderBottomLeftRadius = '0';
    firstInput.style.borderBottomRightRadius = '0';
    firstInput.style.borderTopLeftRadius = '10px';
    firstInput.style.borderTopRightRadius = '10px';
  }

  var lastInput = document.querySelector('.ingredientes #unir_iconI .novoInput');
  if (lastInput) {
    lastInput.classList.remove('novoInput');
    lastInput.style.borderBottomLeftRadius = '0';
    lastInput.style.borderBottomRightRadius = '0';
  }

  var newContainer = document.createElement('div');
  newContainer.id = 'unir_iconI';

  var input = document.createElement('input');
  input.type = 'text';
  input.name = 'ingredientes[]';
  input.className = 'ingredientesInput novoInput';
  var numIngredientes = document.querySelectorAll('.ingredientesInput').length + 1;
  input.placeholder = numIngredientes + '. Introduzir o ingrediente';
  input.style.borderTopLeftRadius = '0';
  input.style.borderTopRightRadius = '0';
  input.style.borderBottomLeftRadius = '10px';
  input.style.borderBottomRightRadius = '10px';

  newContainer.appendChild(input);

  newContainer.appendChild(this);

  document.querySelector('.ingredientes').appendChild(newContainer);
});


// Relacionado aos campos de modo de preparo

document.getElementById('adicionar_etapa').addEventListener('click', function (e) {
  e.preventDefault();

  var firstInput = document.querySelector('.modo_preparo #unir_iconP input:first-of-type');
  if (firstInput) {
    firstInput.style.borderBottomLeftRadius = '0';
    firstInput.style.borderBottomRightRadius = '0';
    firstInput.style.borderTopLeftRadius = '10px';
    firstInput.style.borderTopRightRadius = '10px';
  }

  var lastInput = document.querySelector('.modo_preparo #unir_iconP .novoInput');
  if (lastInput) {
    lastInput.classList.remove('novoInput');
    lastInput.style.borderBottomLeftRadius = '0';
    lastInput.style.borderBottomRightRadius = '0';
  }

  var newContainer = document.createElement('div');
  newContainer.id = 'unir_iconP';

  var input = document.createElement('input');
  input.type = 'text';
  input.name = 'modoPreparo[]';
  input.className = 'modo_preparosInput novoInput';
  var numEtapas = document.querySelectorAll('.modo_preparosInput').length + 1;
  input.placeholder = numEtapas + '. Introduzir a etapa de preparação';
  input.style.borderTopLeftRadius = '0';
  input.style.borderTopRightRadius = '0';
  input.style.borderBottomLeftRadius = '10px';
  input.style.borderBottomRightRadius = '10px';

  newContainer.appendChild(input);
  newContainer.appendChild(this);
  document.querySelector('.modo_preparo').appendChild(newContainer);
});


//Relacionado aos campos de ingredientes no caso do usuario dar enter para criar um novo campo
document.querySelectorAll('.ingredientes input').forEach(function (input) {
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('adicionar_ingrediente').click();
    }
  });
});


//Relacionado aos campos de modo de preparo no caso do usuario dar enter para criar um novo campo
document.querySelectorAll('.modo_preparo input').forEach(function (input) {
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('adicionar_etapa').click();
    }
  });
});

function isValidYouTubeURL(url) {
  var pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return pattern.test(url);
}

function validarFormulario() {
  var campos = {
    "titulo": "Título",
    "descricao": "Descrição",
    "porcoes": "Porções",
    "preparacao": "Preparação",
  };

  for (var id in campos) {
    var campo = document.getElementById(id);
    if (!campo.value) {
      alert('Por favor, preencha o campo ' + campos[id] + ' antes de enviar.');
      return false;
    }
  }

  var ingredientes = document.querySelectorAll('.ingredientesInput');
  var ingredientePreenchido = Array.prototype.slice.call(ingredientes).some(function (input) {
    return input.value;
  });
  if (!ingredientePreenchido) {
    alert('Por favor, adicione pelo menos um ingrediente antes de enviar.');
    return false;
  }

  var etapas = document.querySelectorAll('.modo_preparosInput');
  var etapaPreenchida = Array.prototype.slice.call(etapas).some(function (input) {
    return input.value;
  });
  if (!etapaPreenchida) {
    alert('Por favor, adicione pelo menos uma etapa de preparo antes de enviar.');
    return false;
  }

  var ingredientes = document.querySelectorAll('.ingredientesInput');
  ingredientes.forEach(function(input) {
    if (!input.value) {
      input.parentNode.remove();
    }
  });

  var etapas = document.querySelectorAll('.modo_preparosInput');
  etapas.forEach(function(input) {
    if (!input.value) {
      input.parentNode.remove();
    }
  });

  var imagem = document.querySelector('.media-upload-area img:not(.media-icon img)');
  if (imagem && !imagem.src) {
    alert('Por favor, carregue uma imagem antes de enviar.');
    return false;
  }

  var linkVideo = document.getElementById('linkVideo');
  if (linkVideo.value && !isValidYouTubeURL(linkVideo.value)) {
    alert('Por favor, insira uma URL de vídeo do YouTube válida ou deixe o campo em branco.');
    return false;
  }

  var categorias = document.querySelectorAll('.fileira input[type="checkbox"]');
  var categoriaSelecionada = Array.prototype.slice.call(categorias).some(function (checkbox) {
    return checkbox.checked;
  });
  if (!categoriaSelecionada) {
    alert('Por favor, selecione pelo menos uma categoria antes de enviar.');
    return false;
  }

  return true;
}


document.addEventListener('DOMContentLoaded', function() {
  let idDaReceita = new URLSearchParams(window.location.search).get('id');

  fetch(`/cadastroReceita/${idDaReceita}`)
    .then(response => response.json())
    .then(receita => {
      document.querySelector('#titulo').value = receita.titulo;
      document.querySelector('#descricao').value = receita.descricao;
      document.querySelector('#porcoes').value = receita.porcoes;
      document.querySelector('#preparacao').value = receita.preparacao;
      document.querySelector('#linkVideo').value = receita.linkVideo;
      let img = document.createElement('img');
      img.src = `/uploads/${receita.foto}`;
      document.querySelector('.media-upload-area').appendChild(img);

      document.querySelector('.media-icon').remove();

      // Inicializar o cropper na imagem existente
      window.cropper = inicializarCropper(img);

      receita.ingredientes.forEach((ingrediente, index) => {
        if (index > 0) {
          document.getElementById('adicionar_ingrediente').click();
        }
        document.querySelectorAll('.ingredientesInput')[index].value = ingrediente;
      });

      receita.modoPreparo.forEach((etapa, index) => {
        if (index > 0) {
          document.getElementById('adicionar_etapa').click();
        }
        document.querySelectorAll('.modo_preparosInput')[index].value = etapa;
      });

      receita.categorias.forEach(categoria => {
        let checkbox = document.getElementById(categoria.toLowerCase().replace(/ /g, ""));
        if (checkbox) {
          checkbox.checked = true;
        }
      });
    });
});


function isValidYouTubeURL(url) {
  var pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return pattern.test(url);
}

// Função tempóraria, espero eu.... (Pode ser que não kkkk)
function removerCamposVazios() {
  var ingredientes = document.querySelectorAll('.ingredientesInput');
  ingredientes.forEach(function(input) {
    if (!input.value.trim()) { 
      input.parentNode.remove();
    }
  });

  var etapas = document.querySelectorAll('.modo_preparosInput');
  etapas.forEach(function(input) {
    if (!input.value.trim()) {
      input.parentNode.remove();
    }
  });
}

document.querySelector('#salvar').addEventListener('click', function (e) {
  e.preventDefault();

  let formulario = document.getElementById('formulario_add_receita');
  let idDaReceita = new URLSearchParams(window.location.search).get('id');

  var foto = arquivoImagem;

  if (!foto) {
    var imagemExistente = document.querySelector('.media-upload-area img:not(.media-icon img)');
    if (imagemExistente) {
      foto = imagemExistente.src;
    }
  }

  var linkVideo = document.getElementById('linkVideo');
  if (linkVideo.value && !isValidYouTubeURL(linkVideo.value)) {
    alert('Por favor, insira uma URL de vídeo do YouTube válida ou deixe o campo em branco.');
    return;
  }

  removerCamposVazios();

  if (foto) {
    var receitaData = new FormData(formulario);

    receitaData.set('foto', foto);
    receitaData.set('id', idDaReceita); 
    fetch(`/editarReceitas/${idDaReceita}`, {
      method: 'PUT',
      body: receitaData, 
    })
      .then(response => response.json())
      .then(data => {
        window.location.href = `/verReceitas?id=${idDaReceita}`;
      })
      .catch((error) => {
        console.error('Erro:', error);
        window.location.href = '/home';

      });
  } else {
    console.error('Nenhuma imagem selecionada');
  }
});



document.getElementById('deleteButton').addEventListener('click', function() {
  let confirmacao = confirm("Tem certeza que deseja deletar esta receita?");
  if (confirmacao) {
    let idDaReceita = new URLSearchParams(window.location.search).get('id');
    fetch(`/deletarReceita`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: idDaReceita }),
    })
    .then(response => response.json())
    .then(data => {
      window.location.href = '/home';
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
  }
});


var animation = bodymovin.loadAnimation({
  container: document.getElementById('deleteButton'), 
  renderer: 'svg',
  loop: true,
  autoplay: false,
  path: '../assets/media/images/icon_lixeira.json' 
});

document.getElementById('deleteButton').addEventListener("mouseover", function() {
  animation.play();
});

document.getElementById('deleteButton').addEventListener("mouseout", function() {
  animation.stop();
});
