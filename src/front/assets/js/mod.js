document.addEventListener("DOMContentLoaded", function () {
  fetch("/showDenuncias")
    .then((response) => response.json())
    .then((cards) => {
      console.log(cards);
      cards.forEach((cardReceita) => {
        const cardInfo = document.createElement('div');
        cardInfo.className = 'card_info';

        const cardRecipe = document.createElement('div');
        cardRecipe.className = 'card_recipe';
        const newCard = new CardReport(
          cardReceita.chef,
          cardReceita.receita,
          cardReceita.curtidas,
          cardReceita.fotoChef,
          cardReceita.fotoReceita,
          cardReceita.id,
          cardReceita.categorias,
          cardReceita.chefID,
          cardReceita.denunciada ? cardReceita.denunciada[0] : undefined // Adicione esta linha

        );
        const { card, infoReport, btnConfirm } = newCard.createCardReport();
        cardRecipe.append(card);
        cardInfo.append(cardRecipe);
        cardInfo.append(infoReport);
        cardInfo.append(btnConfirm);

        document.getElementById('moderation-content').append(cardInfo);
      });
    })
    .catch((error) => console.error("Erro:", error));
});



class CardReport {
  constructor(
    chef,
    receita,
    curtidas = [],
    fotoChef,
    fotoReceita,
    id,
    categorias,
    chefID,
    denuncia
  ) {
    this.chef = chef;
    this.receita = receita;
    this.curtidas = curtidas || [];
    this.fotoChef = fotoChef;
    this.fotoReceita = fotoReceita;
    this.id = id;
    this.categorias = categorias;
    this.chefID = chefID;
    this.denuncia = denuncia;
  }

  createCardReport() {
    let card = document.createElement("div");
    card.classList.add("card");

    card.dataset.categorias = this.categorias.join(",");

    let imgReceita = document.createElement("img");
    imgReceita.classList.add("div_img");
    imgReceita.src = this.fotoReceita;
    imgReceita.addEventListener("click", () => {
      const caminhoPagina = `/verReceitas?id=${this.id}`;
      window.location.href = caminhoPagina;
    });
    card.append(imgReceita);

    let imgChef = document.createElement("img");
    imgChef.classList.add("chef-avatar");
    imgChef.src = this.fotoChef;
    imgChef.addEventListener("click", () => {
      const caminhoPagina = `/dashboard?id=${this.chefID}`;
      window.location.href = caminhoPagina;
    });
    card.append(imgChef);

    let btnReceita = document.createElement("button");
    btnReceita.classList.add("btn-receita");

    let lbBtnReceita = document.createElement("label");
    lbBtnReceita.classList.add("lb-receita");
    lbBtnReceita.textContent = this.receita;

    if (this.receita && this.receita.length > 15) {
      lbBtnReceita.classList.add("long-text");

      let animationDuration = this.receita.length * 0.1;
      lbBtnReceita.style.transition = animationDuration + "s linear";
    }

    btnReceita.appendChild(lbBtnReceita);
    card.append(btnReceita);

    imgReceita.addEventListener("click", () => {
      const caminhoPagina = `/verReceitas?id=${this.id}`;
      window.location.href = caminhoPagina;
    });
    card.append(btnReceita);

    let lbChef = document.createElement("label");
    lbChef.classList.add("lb-chef");
    lbChef.textContent = this.chef;
    lbChef.addEventListener("click", () => {
      const caminhoPagina = `/dashboard?id=${this.chefID}`;
      window.location.href = caminhoPagina;
    });
    card.append(lbChef);


    let lbAvaliacao = document.createElement("label");
    lbAvaliacao.classList.add("lb-avaliacao");
    lbAvaliacao.textContent = "❤ " + (this.curtidas ? this.curtidas.length : 0);
    card.append(lbAvaliacao);

    let infoReport = document.createElement('div');
    infoReport.className = 'info_report';

    let idReceitaLabel = document.createElement('label');
    idReceitaLabel.className = 'label_controller';
    idReceitaLabel.setAttribute('for', 'id_receita');
    idReceitaLabel.textContent = 'ID da receita: ';
    infoReport.append(idReceitaLabel);

    let idReceitaInput = document.createElement('input');
    idReceitaInput.className = 'info';
    idReceitaInput.type = 'text';
    idReceitaInput.name = 'id_receita';
    idReceitaInput.value = this.id;
    infoReport.append(idReceitaInput);

    let idUsuarioLabel = document.createElement('label');
    idUsuarioLabel.className = 'label_controller';
    idUsuarioLabel.setAttribute('for', 'id_usuario');
    idUsuarioLabel.textContent = 'ID do usuário: ';
    infoReport.append(idUsuarioLabel);

    let idUsuarioInput = document.createElement('input');
    idUsuarioInput.className = 'info';
    idUsuarioInput.type = 'text';
    idUsuarioInput.name = 'id_usuario';
    idUsuarioInput.value = this.denuncia.userId;
    infoReport.append(idUsuarioInput);

    let mensagemLabel = document.createElement('label');
    mensagemLabel.className = 'label_controller';
    mensagemLabel.setAttribute('for', 'mensagem');
    mensagemLabel.textContent = 'Mensagem: ';
    infoReport.append(mensagemLabel);

    let mensagemTextarea = document.createElement('textarea');
    mensagemTextarea.className = 'info-mensagem';
    mensagemTextarea.name = 'mensagem';
    mensagemTextarea.value = this.denuncia.comentario;
    infoReport.append(mensagemTextarea);

    let btnConfirm = document.createElement('button');
    btnConfirm.className = 'botao_confirmar';
    btnConfirm.textContent = 'Caso resolvido';
    btnConfirm.dataset.receitaId = this.id; 

    btnConfirm.addEventListener('click', function () {
      let confirmation = window.confirm("O caso da denúncia desta receita já foi resolvido?");
      if (confirmation) {
        fetch('/limparDenuncias/' + this.dataset.receitaId, { method: 'PUT' }) 
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              alert('Denúncias limpas com sucesso!');
            } else {
              alert('Houve um erro ao limpar as denúncias.');
            }
          });
      }
    });



    return { card, infoReport, btnConfirm };

  }
}

document.querySelector('button[name="confirm_delete-user"]').addEventListener('click', function () {
  let userId = document.querySelector('input[name="id_delete-user"]').value;
  let confirmation = window.confirm("Você tem certeza de que deseja deletar o usuário com ID " + userId + "?");
  if (confirmation) {
    fetch('/cadastroUser', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Usuário deletado com sucesso!');
          window.location.href = '/home';
        } else {
          alert('Deletado');
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  }
});

document.querySelector('button[name="confirm_delete-recipe"]').addEventListener('click', function () {
  let recipeId = document.querySelector('input[name="id_delete-recipe"]').value;
  let confirmation = window.confirm("Você tem certeza de que deseja deletar a receita com ID " + recipeId + "?");
  if (confirmation) {
    fetch('/deletarReceita', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: recipeId })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Receita deletada com sucesso!');
          window.location.href = '/home';
        } else {
          alert('Deletada.');
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  }
});
