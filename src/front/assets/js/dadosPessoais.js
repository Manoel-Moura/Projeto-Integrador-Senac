//Para exibir a imagem carregada temporariamente
function previewImage(event) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.onload = function () {
      var output = document.getElementById('foto-usuario');
      output.style.backgroundImage = 'url(' + reader.result + ')';
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}

//Funções relacionadas a mudança do icone de edição.
function changeIcon(input) {
  input.nextElementSibling.src = '../assets/media/images/writing.png';
}

function resetIcon(input) {
  input.nextElementSibling.src = '../assets/media/icons/pen.svg';
}

// Para exibir os dados dos usuarios
window.onload = function () {
  fetch('/getUserData')
    .then(response => response.json())
    .then(data => {

      let dateObj = new Date(data.data);

      let ano = dateObj.getUTCFullYear();
      let mes = dateObj.getUTCMonth() + 1;
      let dia = dateObj.getUTCDate();
      if (mes < 10) mes = '0' + mes;
      if (dia < 10) dia = '0' + dia;

      let dataFormatada = ano + '-' + mes + '-' + dia;
      document.querySelector('input[name="username"]').value = data.username;
      document.querySelector('input[name="email"]').value = data.email;
      document.querySelector('input[name="data"]').value = dataFormatada;
      document.querySelector('input[name="genero"]').value = data.genero;
      document.querySelector('input[name="cpf"]').value = data.cpf;
      document.querySelector('input[name="celular"]').value = data.celular;
      document.querySelector('input[name="telefone"]').value = data.telefone;

      if (data.fotoUsuario) {
        document.getElementById('foto-usuario').style.backgroundImage = 'url(/uploads/' + data.fotoUsuario + ')';
      }

    })
    .catch(error => console.error('Erro:', error));
};

document.getElementById('botao_enviarSenha').addEventListener('click', function() {
  var email = document.querySelector('input[name="email"]').value;

  fetch('/requestPasswordReset', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
  })
  .then(response => response.json())
  .then(data => {
      if (data.message) {
          alert(data.message);
      } else {
          console.error('Erro ao solicitar a redefinição de senha:', data.error);
      }
  })
  .catch((error) => {
      console.error('Erro:', error);
  });
});



function salvarDadosPessoais(event) {
  event.preventDefault();

  var formulario = document.getElementById('dados_pessoais');
  var formData = new FormData(formulario);

  formData.delete('cpf');

  fetch('/cadastroUserT', {
    method: 'PUT',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        if (response.status === 409) {
          throw new Error('O nome de usuário já está em uso');
        } else {
          throw new Error('Erro na requisição');
        }
      }
      return response.json();
    })
    .then(user => {
      if (user) {
        alert('Perfil atualizado com sucesso!');
        window.location.href = '/editarDadosPessoais'; 
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      alert(error.message); 
    });
}

document.getElementById('dados_pessoais').addEventListener('submit', salvarDadosPessoais);
