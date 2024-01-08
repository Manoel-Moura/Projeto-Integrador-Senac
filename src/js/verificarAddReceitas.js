// Função para validar os campos do formulário
function validarFormulario() {
    var campos = ["titulo", "descricao", "porcoes", "preparacao", "cozimento", "ingredientesInput", "modoPreparoInput"];
    for (var i = 0; i < campos.length; i++) {
      var campo = document.getElementById(campos[i]);
      if (!campo.value) {
        alert('Por favor, preencha o campo ' + campo.id + ' antes de enviar.');
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
    var categorias = document.querySelectorAll('.fileira input[type="radio"]');
    var categoriaSelecionada = Array.prototype.slice.call(categorias).some(function(radio) {
      return radio.checked;
    });
    if (!categoriaSelecionada) {
      alert('Por favor, selecione pelo menos uma categoria antes de enviar.');
      return false;
    }
  
    return true;
  }
  
  // Função para quando eu for fazer o código para salvar as informações no banco de dados
  function salvarReceita() {
    if (validarFormulario()) {
      
      alert('Receita Salva!');
    }
  }
  
  // Adicionar o evento de clique ao botão "Salvar"
  document.getElementById('salvar').addEventListener('click', function(e) {
    e.preventDefault();
    salvarReceita();
  });
  