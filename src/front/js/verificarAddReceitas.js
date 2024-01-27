// Função para validar os campos do formulário
function validarFormulario() {
  var campos = {
    "titulo": "Título",
    "descricao": "Descrição",
    "porcoes": "Porções",
    "preparacao": "Preparação",
    "cozimento": "Cozimento",
    "ingredientesInput": "Ingredientes",
    "modoPreparoInput": "Modo de Preparo"
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


function salvarReceita() {
  if (validarFormulario()) {

    var dadosDoFormulario = new FormData(document.getElementById('formulario_add_receita'));

    var imagem = document.querySelector('.media-upload-area img:not(.media-icon img)');
    if (imagem) {
      dadosDoFormulario.append('imagem', imagem.files[0]);
    }

    var linkDoYouTube = document.getElementById('recipeVideo').value;
    if (linkDoYouTube) {
      dadosDoFormulario.append('linkDoYouTube', linkDoYouTube);
    }

    fetch('/cadastroReceita', {
      method: 'POST',
      body: dadosDoFormulario
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Erro:', error);
    });
  }
}


// Adicionar o evento de clique ao botão "Salvar"
document.getElementById('salvar').addEventListener('click', function (e) {
  e.preventDefault();
  salvarReceita();
});
