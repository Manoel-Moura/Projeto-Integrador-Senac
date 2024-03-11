class CardRanking {
  constructor(chef, totalCurtidas, fotoChef, medalha, ranking, chefID) {
    this.chef = chef;
    this.totalCurtidas = totalCurtidas;
    this.fotoChef = fotoChef;
    this.medalha = medalha;
    this.ranking = ranking;
    this.chefID = chefID;
  }

  createCardRanking() {
    let card = document.createElement("div");
    card.classList.add("card-ranking");

    card.addEventListener("click", () => {
      const caminhoPagina = `/dashboard?id=${this.chefID}`;
      window.location.href = caminhoPagina;
    });

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
    imgChef.src = "/uploads/" + this.fotoChef;
    card.append(imgChef);

    let lbChef = document.createElement("label");
    lbChef.classList.add("lb-chef-ranking");
    lbChef.textContent = this.chef;
    card.append(lbChef);

    let lbLikes = document.createElement("label");
    lbLikes.classList.add("lb-likes-ranking");
    lbLikes.textContent = "❤ " + this.totalCurtidas;
    card.append(lbLikes);


    return card;
  }
}

//============================================================================================

// Códigos abaixo para fazer o trend topics (kkkk) do ranking de chefes
class CardTrending {
  constructor(chef, curtidasTrend, fotoChef, ranking, chefID) {
    this.chef = chef;
    this.curtidasTrend = curtidasTrend;
    this.fotoChef = fotoChef;
    this.ranking = ranking;
    this.chefID = chefID;
  }

  createCardTrending() {
    let card = document.createElement("div");
    card.classList.add("card-trending");

    card.addEventListener("click", () => {
      const caminhoPagina = `/dashboard?id=${this.chefID}`;
      window.location.href = caminhoPagina;
    });

    let lbRanking = document.createElement("label");
    lbRanking.classList.add("lb-ranking-trending");
    lbRanking.textContent = "#" + this.ranking;
    card.append(lbRanking);

    let imgChef = document.createElement("img");
    imgChef.classList.add("chef-avatar-trending");
    imgChef.src = "/uploads/" + this.fotoChef;
    card.append(imgChef);

    let lbChef = document.createElement("label");
    lbChef.classList.add("lb-chef-trending");
    lbChef.textContent = this.chef;
    card.append(lbChef);

    let lbPosicoesSubiu = document.createElement("label");
    lbPosicoesSubiu.classList.add("lb-posicoes-subiu");
    lbPosicoesSubiu.textContent = "+ " + this.curtidasTrend + " curtidas";
    card.append(lbPosicoesSubiu);

    return card;
  }
}

//============================================================================================
//Codigos abaixo para puxar todos os dados para os cards.
fetch('/rankingChefs')
  .then(response => response.json())
  .then(data => {
    let cardsRanking = data;

    // Ordena o array de cards do maior para o menor número de curtidas
    cardsRanking.sort((a, b) => b.totalCurtidas - a.totalCurtidas);

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
      const newCard = new CardRanking(cardChef.chef, cardChef.totalCurtidas, cardChef.fotoChef, cardChef.medalha, index + 1, cardChef.chefID);
      const card = newCard.createCardRanking();
      fragment_card.append(card);
      addCard.append(fragment_card);
    });

    // Cria uma cópia do array original
    let cardsRankingCopy = [...cardsRanking];

    // Ordena a cópia do array por curtidas
    let chefsOrdenados = cardsRankingCopy.sort((a, b) => b.curtidasTrend - a.curtidasTrend);

    // Pra pegar os 5 chefs com mais curtidas nas últimas x horas
    let curtidasTrend = chefsOrdenados.slice(0, 5);

    curtidasTrend.forEach((chef, index) => {
      let cardTrending = new CardTrending(chef.chef, chef.curtidasTrend, chef.fotoChef, index + 1, chef.chefID);
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

      const newCard = new CardRanking(cardChef.chef, cardChef.totalCurtidas, cardChef.fotoChef, null, index + 1, cardChef.chefID);
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


document.getElementById('barra-pesquisa').addEventListener('keyup', function (event) {
  let input = document.getElementById('barra-pesquisa');
  let filter = input.value.toUpperCase();
  let cards = document.getElementsByClassName('card-ranking');

  if (filter.trim() === '') {
    document.getElementById('top-3').style.display = '';
    document.getElementById('trending').style.display = '';
    document.getElementById('btnMostrarOpcoes').style.display = '';

    let linhas = document.getElementsByClassName('linha-divisoria-ranking');
    for (let i = 0; i < linhas.length; i++) {
      linhas[i].style.display = "";
    }

    for (let i = 0; i < cards.length; i++) {
      cards[i].style.display = "";
    }
  } else if (event.key === 'Enter') {
    for (let i = 0; i < cards.length; i++) {
      let lbChef = cards[i].getElementsByClassName('lb-chef-ranking')[0];
      let txtValue = lbChef.textContent || lbChef.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }

    let linhas = document.getElementsByClassName('linha-divisoria-ranking');
    for (let i = 0; i < linhas.length; i++) {
      linhas[i].style.display = "none";
    }

    document.getElementById('top-3').style.display = 'none';
    document.getElementById('trending').style.display = 'none';
    document.getElementById('btnMostrarOpcoes').style.display = 'none';
  }
});


// Abaixo está relacionado aos botões de filtragem de chefes
document.getElementById('btnMostrarOpcoes').addEventListener('click', function () {
  let filtros = document.getElementById('filtros');
  if (filtros.style.display === 'none') {
    filtros.style.display = '';
  } else {
    filtros.style.display = 'none';
  }
});

document.getElementById('btnTop10').addEventListener('click', function () {
  filtrarChefes(13);
});

document.getElementById('btnTop100').addEventListener('click', function () {
  filtrarChefes(100);
});

document.getElementById('btnTop1000').addEventListener('click', function () {
  filtrarChefes(1000);
});

function filtrarChefes(top) {
  let cards = document.getElementsByClassName('card-ranking');

  for (let i = 0; i < cards.length; i++) {
    cards[i].style.display = "";
  }

  for (let i = top; i < cards.length; i++) {
    cards[i].style.display = "none";
  }
}

