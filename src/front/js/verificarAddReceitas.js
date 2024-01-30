
// Função para validar os campos do formulário
function validarFormulario() {
  var campos = {
    "titulo": "Título",
    "descricao": "Descrição",
    "porcoes": "Porções",
    "preparacao": "Preparação",
    "cozimento": "Cozimento",
    "ingredientes": "Ingredientes",
    "modoPreparo": "Modo de Preparo"
  };

  for (var id in campos) {
    var campo = document.getElementById(id);
    if (!campo.value) {
      alert('Por favor, preencha o campo ' + campos[id] + ' antes de enviar.');
      return false;
    }
  }

  // Verificar se uma imagem foi carregada
  var imagem = document.querySelector('.media-upload-area img:not(.media-icon img)');
  if (!imagem) {
    alert('Por favor, carregue uma imagem antes de enviar.');
    return false;
  }

  // Verificar se pelo menos uma categoria foi selecionada
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


// Função para validar os campos do formulário
function validarFormulario() {
  var campos = {
    "titulo": "Título",
    "descricao": "Descrição",
    "porcoes": "Porções",
    "preparacao": "Preparação",
    "cozimento": "Cozimento",
    "ingredientes": "Ingredientes",
    "modoPreparo": "Modo de Preparo"
  };

  for (var id in campos) {
    var campo = document.getElementById(id);
    if (!campo.value) {
      alert('Por favor, preencha o campo ' + campos[id] + ' antes de enviar.');
      return false;
    }
  }

  // Verificar se uma imagem foi carregada
  var imagem = document.querySelector('.media-upload-area img:not(.media-icon img)');
  if (!imagem) {
    alert('Por favor, carregue uma imagem antes de enviar.');
    return false;
  }

  // Verificar se pelo menos uma categoria foi selecionada
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

    var foto = window.foto;

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
        window.location.href = './dashboard.html';
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

// Adicionar o evento de clique ao botão "Salvar"
document.getElementById('salvar').addEventListener('click', function (e) {
  e.preventDefault();
  salvarReceita();
});
