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

  function novaCategoria(nomeCategoria) {
    let categoria = document.createElement("button");
    categoria.classList.add("categoria");
    categoria.append(nomeCategoria);
    fragmentCategorias.append(categoria);
    listaCategorias.append(fragmentCategorias);

    document.querySelector('.categoria').addEventListener('click', function() {
      this.classList.add('categoria_selecionada');
    });
  }

  fetch("/criarCategoria")
    .then((response) => response.json())
    .then((categorias) => {
      categorias.forEach((categoria) => {
        novaCategoria(categoria.nome);
      });

      setTimeout(function () {
        let botoesCategoria = document.getElementsByClassName("categoria");
        let categoriaAtual = null;

        for (let i = 0; i < botoesCategoria.length; i++) {
          botoesCategoria[i].addEventListener("click", function () {
            let filter = this.textContent.toUpperCase();
            let cards = document.getElementsByClassName("card");

            if (categoriaAtual === filter) {
              for (let j = 0; j < cards.length; j++) {
                cards[j].style.display = "";
              }
              categoriaAtual = null;
            } else {
              // Caso contrário, aplique o filtro de categoria
              for (let j = 0; j < cards.length; j++) {
                let categorias = cards[j].dataset.categorias
                  .toUpperCase()
                  .split(",");
                if (categorias.includes(filter)) {
                  cards[j].style.display = "";
                } else {
                  cards[j].style.display = "none";
                }
              }
              categoriaAtual = filter;
            }
          });
        }
      }, 0);
    })
    .catch((error) => console.error("Erro:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("/createCard")
    .then((response) => response.json())
    .then((cards) => {
      let cont = 1;
      cards.forEach((cardReceita) => {
        // console.log("cardReceitas " + JSON.stringify(cardReceita));
        const addCard = document.getElementById("rowCard");
        const fragment_card = document.createDocumentFragment();

        const newCard = new Card(
          cardReceita.chef,
          cardReceita.receita,
          cardReceita.curtidas,
          cardReceita.fotoChef,
          cardReceita.fotoReceita,
          cardReceita.id,
          cardReceita.categorias,
          cardReceita.chefID
        );
        const card = newCard.createCard();
        fragment_card.append(card);
        addCard.append(fragment_card);
      });
    })
    .catch((error) => console.error("Erro:", error));
});

class Card {
  constructor(
    chef,
    receita,
    curtidas = [],
    fotoChef,
    fotoReceita,
    id,
    categorias,
    chefID
  ) {
    this.chef = chef;
    this.receita = receita;
    this.curtidas = curtidas || [];
    this.fotoChef = fotoChef;
    this.fotoReceita = fotoReceita;
    this.id = id;
    this.categorias = categorias;
    this.chefID = chefID;
  }

  createCard() {
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

    if (this.receita.length > 15) {
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
    lbAvaliacao.textContent = "❤ " + this.curtidas.length;
    // console.log(this.curtidas);
    card.append(lbAvaliacao);

    return card;
  }
}

//Para fazer funcionar a barra de pesquisa da página home.html
document.getElementById('barra-pesquisa').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    let input = document.getElementById('barra-pesquisa');
    let filter = input.value.toUpperCase();
    let cards = document.getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
      let btnReceita = cards[i].getElementsByClassName('btn-receita')[0];
      let lbChef = cards[i].getElementsByClassName('lb-chef')[0];
      let txtValueReceita = btnReceita.textContent || btnReceita.innerText;
      let txtValueChef = lbChef.textContent || lbChef.innerText;
      if (txtValueReceita.toUpperCase().indexOf(filter) > -1 || txtValueChef.toUpperCase().indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
  }
});


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


