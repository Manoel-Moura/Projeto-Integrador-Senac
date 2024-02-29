document.getElementById('bt-login').addEventListener('click', function (event) {
  event.preventDefault();

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var token = document.getElementById('cf-turnstile-response').value;

  var emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    alert('Por favor, insira um email válido.');
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    return;
  }

  if (email === '' || password === '') {
    alert('Por favor, preencha todos os campos antes de entrar.');
    return;
  }

  if (token === '') {
    alert('Por favor, não se esqueça de completar o campo do captcha.');
    return;
  }
  var data = {
    email: email,
    password: password,
    'cf-turnstile-response': token
  };

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error('Erro ao fazer login: ' + data.error);
        });
      }
      return response.json();
    })
    .then(data => {
      window.location.href = '/home';
    })
    .catch(error => {
      console.error('Erro ao enviar requisição:', error);
      alert(error.message);

      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      document.getElementById('cf-turnstile-response').value = '';
      window.javascriptCallback();
    });

});

window.javascriptCallback = function () {
  turnstile.render('.cf-turnstile', {
    sitekey: '0x4AAAAAAARzTbUy-vCJHVFA',
    callback: function (token) {
      document.getElementById('cf-turnstile-response').value = token;
    },
  });
};

