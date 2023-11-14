// Código experimental da funcionalidade de exibir senha a partir do icone. Terá de ser refeita. Altos bugs =)
var toggleButtons = document.getElementsByClassName('toggle-password-visibility');
for (var i = 0; i < toggleButtons.length; i++) {
  toggleButtons[i].addEventListener('click', function (e) {
    var passwordInput = this.previousElementSibling;
    var otherEyeIcon = this.nextElementSibling || this.previousElementSibling;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      this.style.display = 'none';
      otherEyeIcon.style.display = 'inline';
    } else {
      passwordInput.type = 'password';
      this.style.display = 'none';
      otherEyeIcon.style.display = 'inline';
    }
  });
}
