
window.onload = function () {

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
}

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
