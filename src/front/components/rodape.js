//========================================================================================================
// Configurando o Rodapé da página

// Obtendo a referência do elemento com o ID "bottom-bar" no HTML
let bottom_bar = document.getElementById("bottom-bar");

// Criando um fragmento de documento para otimizar a manipulação do HTML
let barra_bottom = document.createDocumentFragment();

// Criando um elemento <div> para centralizar o rodapé
let div_rodape_centralizado = document.createElement("div");
div_rodape_centralizado.setAttribute("class", "rodape-centralizado");

// Criando um elemento <div> para representar o rodapé
let rodape_div = document.createElement("div");
rodape_div.setAttribute("class", "rodape"); // Adicionando a classe 'rodape' ao elemento <div>

// Criando um elemento <div> para conter a imagem do logo
let div_img = document.createElement("div");
div_img.setAttribute("class", "div-img"); // Adicionando a classe 'div-img' ao elemento <div>

// Criando um elemento <img> para a imagem do logo branco
let logo_branca = document.createElement("img");
logo_branca.setAttribute("class", "logo-branca"); // Adicionando a classe 'logo-branca' à imagem
logo_branca.setAttribute("src", "../assets/media/images/senac_logo_branco.png"); // Configurando o atributo 'src' com o caminho da imagem

// Adicionando a imagem do logo à div de imagem
div_img.append(logo_branca);

// Adicionando a div de imagem e a div do rodapé ao fragmento de documento
div_rodape_centralizado.append(div_img);

// Criando um elemento <label> para receber o texto no meio do rodapé
let lab_rodape = document.createElement("label");
lab_rodape.textContent = "© Todos os Direitos Reservados - 2017."; // Adicionando o texto a label
lab_rodape.setAttribute("class", "lab-rodape"); // Adicionando a classe 'lab-rodape' ao elemento <rodape>

div_rodape_centralizado.append(lab_rodape);

//================================================================================================
// Criando uma div com todos os contatos do Senac configurados
let img_contato_rodape = [
  "../assets/media//icons/facebook-blue.svg",
  "../assets/media/icons/instagram-blue.svg",
  "../assets/media/icons/twitter-alt-blue.svg",
  "../assets/media/icons/linkedin-blue.svg",
  "../assets/media/icons/youtube-blue.svg",
];
let class_css_rodape = ["face", "instagram", "twitter", "linkedin", "youtube"];
let link_contato_rodape = [
  "https://www.facebook.com/SenacBrasil",
  "https://www.instagram.com/senacbrasil/",
  "https://twitter.com/SenacBrasil",
  "https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F2655383",
  "https://www.youtube.com/user/SenacNacional",
];

// Criando a div para os contatos do rodapé
let contatos_rodape = document.createElement("div");
contatos_rodape.setAttribute("id", "contatos");

// Obtendo o tamanho do array de imagens de contato do rodapé
let tam_contato_rodape = img_contato_rodape.length;

// Iterando sobre os contatos do rodapé
for (let i = 0; i < tam_contato_rodape; i++) {
  // Obtendo a classe CSS correspondente ao contato do rodapé atual
  let cla = `${class_css_rodape[i]}`;

  // Obtendo o link e a imagem do contato do rodapé atual
  let link_social = `${link_contato_rodape[i]}`;
  let img_rede = `${img_contato_rodape[i]}`;

  // Criando um elemento <a> para o link social do rodapé
  let rede = document.createElement(`a`);
  rede.setAttribute("href", link_social);
  rede.setAttribute("target", "_blank");

  // Criando um botão dentro do link social do rodapé
  let btn_rede = document.createElement(`button`);
  btn_rede.setAttribute("class", "btn-social-rodape");

  // Criando a imagem social do rodapé
  let img_social = document.createElement(`img`);
  img_social.setAttribute("class", cla);
  img_social.setAttribute("src", img_rede);

  // Adicionando a imagem ao botão do rodapé
  btn_rede.append(img_social);

  // Adicionando o botão ao link do rodapé
  rede.append(btn_rede);

  // Adicionando o link à div de contatos do rodapé
  contatos_rodape.append(rede);

  // Adicionando a div de contatos do rodapé à div centralizada do rodapé
  div_rodape_centralizado.append(contatos_rodape);
}

// Adicionando a div centralizada do rodapé à div do rodapé
rodape_div.append(div_rodape_centralizado);

// Adicionando a div do rodapé ao fragmento de documento
barra_bottom.append(rodape_div);

// Adicionando o fragmento de documento ao elemento com ID "bottom-bar" no HTML
bottom_bar.append(barra_bottom);
//============================================================================================

let listaCategorias = document.getElementById("lista-categorias");

if (listaCategorias) {
  let fragmentCategorias = document.createDocumentFragment();

  nomeCategoria = "Teste";

  function novaCategoria(nomeCategoria) {
    let categoria = document.createElement("button");
    categoria.setAttribute("id", "categoria");

    categoria.append(nomeCategoria);

    fragmentCategorias.append(categoria);

    listaCategorias.append(fragmentCategorias);
  }

  for (let i = 0; i < 20; i++) {
    novaCategoria(nomeCategoria);
  }
}


document.addEventListener("DOMContentLoaded", function () {
  fetch('/createCard')
    .then(response => response.json())
    .then(cards => {
      let cont = 1;
      cards.forEach((cardReceita) => {
        const addCard = document.getElementById("rowCard");
        const fragment_card = document.createDocumentFragment();
        const newCard = new Card(cardReceita.chef, cardReceita.receita, cardReceita.curtidas, cardReceita.fotoChef, cardReceita.fotoReceita);
        const card = newCard.createCard();
        fragment_card.append(card);
        addCard.append(fragment_card);
      });
    })
    .catch(error => console.error('Erro:', error));
});


class Card {
  constructor(chef, receita, curtidas, fotoChef, fotoReceita) {
    this.chef = chef;
    this.receita = receita;
    this.curtidas = curtidas;
    this.fotoChef = fotoChef;
    this.fotoReceita = fotoReceita;
  }

  createCard() {
    let card = document.createElement("div");
    card.classList.add("card");

    let imgReceita = document.createElement("img");
    imgReceita.classList.add("div_img");
    imgReceita.src = this.fotoReceita;
    imgReceita.addEventListener('click', () => {
      const caminhoPagina = '../pages/verReceitas.html'
        window.location.href = caminhoPagina;
    });
    card.append(imgReceita);

    let imgChef = document.createElement("img");
    imgChef.classList.add("chef-avatar");
    imgChef.src = this.fotoChef;
    imgChef.addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });
    card.append(imgChef);

    let btnReceita = document.createElement("button");
    btnReceita.classList.add("btn-receita");
    btnReceita.textContent = this.receita;
    btnReceita.addEventListener('click', () => {
      const caminhoPagina = '../pages/verReceitas.html'
        window.location.href = caminhoPagina;
    });
    card.append(btnReceita);

    let lbChef = document.createElement("label");
    lbChef.classList.add("lb-chef");
    lbChef.textContent = this.chef;
    lbChef.addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });
    card.append(lbChef);

    let lbAvaliacao = document.createElement("label");
    lbAvaliacao.classList.add("lb-avaliacao");
    lbAvaliacao.textContent = "❤ " + this.curtidas;
    card.append(lbAvaliacao);

    // card.addEventListener('click', (event) => {
    //   const caminhoPagina = '../pages/verReceitas.html'
    //     // const idReceita = event.currentTarget.dataset.id; // Alterei para event.currentTarget.dataset.id para acessar o id armazenado no atributo de dados do elemento clicado
    //     // window.location.href = `${caminhoPagina}?id=${idReceita}`; // Utilizei window.location.href para redirecionar para a URL desejada
    //     window.location.href = caminhoPagina;
    //   });

    return card;

  }

}

//Vai ficar de quarentena por enquanto kkkk
/*
document.addEventListener("DOMContentLoaded", function () {
        let cont = 1;
        cards.forEach((cardReceita) => { // Adiciona os Cards a tela de inicio
          const addCard = document.getElementById("rowCard");
          const fragment_card = document.createDocumentFragment();
          const newCard = new Card(cardReceita.chef, cardReceita.receita, cardReceita.curtidas, cardReceita.fotoChef, cardReceita.fotoReceita);
          const card = newCard.createCard();
          fragment_card.append(card);
          addCard.append(fragment_card);


        });
      });

      document.addEventListener("DOMContentLoaded", function () {
        let cont = 1;
        cards.forEach((cardReceita) => { // Adiciona os Cards a tela de inicio
          if (cardReceita.favorite && cont <= 5 && cardReceita.chef != "Manoel Moura") {
            const receitaDestaque = document.getElementById("receitaDestaque");
            const fragmentDestaque = document.createDocumentFragment();
            const newCard = new Card(cardReceita.chef, cardReceita.receita, cardReceita.curtidas, cardReceita.fotoChef, cardReceita.fotoReceita);
            const card = newCard.createCard();
            fragmentDestaque.append(card);
            receitaDestaque.append(fragmentDestaque);
            cont++;
          }

        });
      });

      document.addEventListener("DOMContentLoaded", function () {
        cards.forEach((cardReceita) => { // Adiciona os Cards a tela de inicio
          const addCard = document.getElementById("rowCardChef");
          if (cardReceita.chef != "Manoel Moura") {
            const fragment_card = document.createDocumentFragment();
            const newCard = new Card(cardReceita.chef, cardReceita.receita, cardReceita.curtidas, cardReceita.fotoChef, cardReceita.fotoReceita);
            const card = newCard.createCard();
            fragment_card.append(card);
            addCard.append(fragment_card);


          }

        });
      });
*/
//============================================================================================
