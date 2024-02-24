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



function salvarReceita(event) {
  if (validarFormulario()) {
    var formulario = document.getElementById('formulario_add_receita');

    var foto = arquivoImagem;

    var linkVideo = document.getElementById('linkVideo');
    if (linkVideo.value && !isValidYouTubeURL(linkVideo.value)) {
      alert('Por favor, insira uma URL de vídeo do YouTube válida ou deixe o campo em branco.');
      return;
    }

    if (foto) {
      var receitaData = new FormData(formulario);

      receitaData.set('foto', foto);

      fetch('/cadastroReceita', {
        method: 'POST',
        body: receitaData
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro na requisição');
          }
          return response.json();
        })
        .then(data => {
          alert('Receita salva com sucesso!');
          window.location.href = '/dashboard?id=' + data.userId;
        })
        .catch(error => {
          alert('Falha ao salvar a receita.');
          console.error('Erro:', error);
        });
    } else {
      console.error('Nenhuma imagem selecionada');
    }
  }
}

document.getElementById('salvar').addEventListener('click', function (e) {
  e.preventDefault();
  salvarReceita();
});