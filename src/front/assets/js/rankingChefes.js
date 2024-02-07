class CardRanking {
  constructor(chef, curtidas, fotoChef, medalha, ranking) {
    this.chef = chef;
    this.curtidas = curtidas;
    this.fotoChef = fotoChef;
    this.medalha = medalha;
    this.ranking = ranking;
  }

  createCardRanking() {
    let card = document.createElement("div");
    card.classList.add("card-ranking");

    if (this.medalha) {
      let imgMedalha = document.createElement("img");
      imgMedalha.classList.add("medalha");
      imgMedalha.src = this.medalha;
      card.append(imgMedalha);
    }

    let lbRanking = document.createElement("label");
    lbRanking.classList.add("lb-ranking");
    if (this.ranking === 1) {
      lbRanking.classList.add("primeiro-ranking");
    } else if (this.ranking === 2) {
      lbRanking.classList.add("segundo-ranking");
    } else if (this.ranking === 3) {
      lbRanking.classList.add("terceiro-ranking");
    }
    lbRanking.textContent = this.ranking;
    card.append(lbRanking);


    let imgChef = document.createElement("img");
    imgChef.classList.add("chef-avatar-ranking");
    imgChef.src = this.fotoChef;
    card.append(imgChef);

    let lbChef = document.createElement("label");
    lbChef.classList.add("lb-chef-ranking");
    lbChef.textContent = this.chef;
    card.append(lbChef);

    let lbLikes = document.createElement("label");
    lbLikes.classList.add("lb-likes-ranking");
    lbLikes.textContent = "❤ " + this.curtidas;
    card.append(lbLikes);

    return card;
  }
}

//============================================================================================

// Códigos abaixo para fazer o trend topics (kkkk) do ranking de chefes
class CardTrending {
  constructor(chef, posicoesSubiu, fotoChef, ranking) {
    this.chef = chef;
    this.posicoesSubiu = posicoesSubiu;
    this.fotoChef = fotoChef;
    this.ranking = ranking;
  }

  createCardTrending() {
    let card = document.createElement("div");
    card.classList.add("card-trending");

    let lbRanking = document.createElement("label");
    lbRanking.classList.add("lb-ranking-trending");
    lbRanking.textContent = "#" + this.ranking;
    card.append(lbRanking);

    let imgChef = document.createElement("img");
    imgChef.classList.add("chef-avatar-trending");
    imgChef.src = this.fotoChef;
    card.append(imgChef);

    let lbChef = document.createElement("label");
    lbChef.classList.add("lb-chef-trending");
    lbChef.textContent = this.chef;
    card.append(lbChef);

    let lbPosicoesSubiu = document.createElement("label");
    lbPosicoesSubiu.classList.add("lb-posicoes-subiu");
    lbPosicoesSubiu.textContent = "+ " + this.posicoesSubiu + " posições";
    card.append(lbPosicoesSubiu);

    return card;
  }
}

//============================================================================================

//                 ALERTA: TEMPORARIO!!!!!!!
// Vai ficar assim até que a página de ver receitas esteja completo
// Após isso criarei uma rota propria com lógicas diferentes para a ocasião de trend e ranking.

//Codigos abaixo para puxar todos os dados para os cards.
fetch('/createCard')
  .then(response => response.json())
  .then(data => {
    let cardsRanking = data;

    // Ordena o array de cards do maior para o menor número de curtidas
    cardsRanking.sort((a, b) => b.curtidas - a.curtidas);

    // Atribui as medalhas com base na classificação
    for (let i = 0; i < cardsRanking.length; i++) {
      if (i === 0) {
        cardsRanking[i].medalha = "../assets/media/images/medalha-de-ouro.png"; //Créditos pela imagem: FreePik
      } else if (i === 1) {
        cardsRanking[i].medalha = "../assets/media/images/medalha-de-prata.png"; //Créditos pela imagem: FreePik
      } else if (i === 2) {
        cardsRanking[i].medalha = "../assets/media/images/medalha-de-bronze.png"; //Créditos pela imagem: FreePik
      }
    }

    // Pega os três cards pro top-3
    let topCards = cardsRanking.slice(0, 3);

    topCards.forEach((cardChef, index) => {
      const addCard = document.getElementById("top-3-container");
      const fragment_card = document.createDocumentFragment();
      const newCard = new CardRanking(cardChef.chef, cardChef.curtidas, cardChef.fotoChef, cardChef.medalha, index + 1);
      const card = newCard.createCardRanking();
      fragment_card.append(card);
      addCard.append(fragment_card);
    });

    // Ordenar o array de chefs por curtidas
    let chefsOrdenados = cardsRanking.sort((a, b) => b.curtidas - a.curtidas);

    // Pra pegar os 5 chefs com mais curtidas
    let topChefs = chefsOrdenados.slice(0, 5);

    topChefs.forEach((chef, index) => {
      let cardTrending = new CardTrending(chef.chef, chef.curtidas, chef.fotoChef, index + 1); // Adicione 'index + 1' aqui
      let cardElement = cardTrending.createCardTrending();
      document.getElementById("trending-container").append(cardElement);
    });

    
    // Relacionado ao ranking completo com todos os chefes
    let allCards = cardsRanking;
    let linhaAtual = null;
    let contador = 0;

    allCards.forEach((cardChef, index) => {
      if (contador % 3 === 0) {
        linhaAtual = document.createElement("div");
        linhaAtual.classList.add("linha-ranking");
        document.getElementById("ranking-completo-container").append(linhaAtual);
      }

      const newCard = new CardRanking(cardChef.chef, cardChef.curtidas, cardChef.fotoChef, null, index + 1); // Adicione 'index + 1' aqui
      const card = newCard.createCardRanking();
      linhaAtual.append(card);

      contador++;

      if (contador % 3 === 0 && contador !== 0) {
        let linhaDivisoria = document.createElement("div");
        linhaDivisoria.classList.add("linha-divisoria-ranking");
        document.getElementById("ranking-completo-container").append(linhaDivisoria);
      }
    });
  })
  .catch(error => console.error('Erro:', error));


