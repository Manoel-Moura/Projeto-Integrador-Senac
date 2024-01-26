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

// Nosso banco de dados de chefes
const cardsRanking = [
  {
    chef: "Manoel Moura",
    curtidas: 1511,
    fotoChef: "../assets/media/images/chef.jpg",
  },
  {
    chef: "Paula Martins",
    curtidas: 1234,
    fotoChef: "https://claudia.abril.com.br/wp-content/uploads/2022/12/receber-ABRE-da-materia.jpg?quality=85&strip=info",
  },
  {
    chef: "João Silva",
    curtidas: 987,
    fotoChef: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtRBoj24__MWojvhRoyWyRgGIlLi73ruLSvkMWOrbTt95rGQYCJok2_dX_rstYP758Z78&usqp=CAU",
  },
  {
    chef: "Mariana Souza",
    curtidas: 876,
    fotoChef: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjupo0yUuH2-4JV11_B8CZOs65II_FdcAHww&usqp=CAU",
  },
  {
    chef: "Pedro Santos",
    curtidas: 765,
    fotoChef: "https://www.rbsdirect.com.br/imagesrc/35582396.jpg?w=1024&h=768&a=c",
  },
  {
    chef: "Ana Paula",
    curtidas: 654,
    fotoChef: "https://ciadosfrios.com.br/wp-content/uploads/2022/07/leka2.jpg",
  },
  {
    chef: "José Carlos",
    curtidas: 543,
    fotoChef: "https://blog.zanottirefrigeracao.com.br/wp-content/uploads/2018/08/chef-cozinha-profissional.jpg",
  },
  {
    chef: "Clara Almeida",
    curtidas: 432,
    fotoChef: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPjqfDEeFNaumUEQqwhToEv4mdM5_ZHcA4g&usqp=CAU",
  },
  {
    chef: "Luís Oliveira",
    curtidas: 321,
    fotoChef: "https://viagemegastronomia.cnnbrasil.com.br/wp-content/uploads/sites/5/2018/07/pp.jpg",
  },
  {
    chef: "Pedro Gabriel",
    curtidas: 32133,
    fotoChef: "https://i.pinimg.com/1200x/14/e5/c9/14e5c9010706815a8c48465904b0c2c1.jpg",
  },
  {
    chef: "Cara de coruja",
    curtidas: 130,
    fotoChef: "https://oeco.org.br/wp-content/uploads/oeco-migration//images/stories/dez2012/fotodia-bubo-virginianus.jpg",
  },
  {
    chef: "Jackan",
    curtidas: 34,
    fotoChef: "https://jornaldaparaiba.com.br/wp-content/uploads/2022/07/erick.jpg",
  },
];

let cardObjects = cardsRanking.map(cardData => new CardRanking(cardData.chef, cardData.curtidas, cardData.fotoChef));


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

topCards.forEach((cardChef) => {
  const addCard = document.getElementById("top-3-container");
  const fragment_card = document.createDocumentFragment();
  const newCard = new CardRanking(cardChef.chef, cardChef.curtidas, cardChef.fotoChef, cardChef.medalha);
  const card = newCard.createCardRanking();
  fragment_card.append(card);
  addCard.append(fragment_card);
});


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


document.getElementById("btnTop10").addEventListener("click", function () {
  mostrarRanking(10);
});

document.getElementById("btnTop100").addEventListener("click", function () {
  mostrarRanking(100);
});

document.getElementById("btnTop1000").addEventListener("click", function () {
  mostrarRanking(1000);
});


document.getElementById("btnMostrarOpcoes").addEventListener("click", function () {
  let filtros = document.getElementById("filtros");
  if (filtros.style.display === "none") {
    filtros.style.display = "block";
  } else {
    filtros.style.display = "none";
  }
});



function mostrarRanking(tamanho) {
  let rankingContainer = document.getElementById("ranking-completo-container");
  while (rankingContainer.firstChild) {
    rankingContainer.removeChild(rankingContainer.firstChild);
  }

  // Pra ordenar os chefs por curtidas
  let chefsOrdenados = [...cardsRanking].sort((a, b) => b.curtidas - a.curtidas);

  // Pra mostrar os chefs dentro do intervalo 
  let chefsIntervalo = chefsOrdenados.slice(0, tamanho);

  // Crie um card de ranking para cada chef no intervalo
  let linhaAtual = null;
  let contador = 0;
  chefsIntervalo.forEach((chef, index) => {
    if (contador % 3 === 0) {
      linhaAtual = document.createElement("div");
      linhaAtual.classList.add("linha-ranking");
      rankingContainer.append(linhaAtual);
    }

    let cardRanking = new CardRanking(chef.chef, chef.curtidas, chef.fotoChef, null, index + 1);

    let cardElement = cardRanking.createCardRanking();
    linhaAtual.append(cardElement);

    contador++;

    if (contador % 3 === 0) {
      let linhaDivisoria = document.createElement("div");
      linhaDivisoria.classList.add("linha-divisoria-ranking");
      rankingContainer.append(linhaDivisoria);
    }
  });
}



