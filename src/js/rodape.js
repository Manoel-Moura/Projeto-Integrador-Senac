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
logo_branca.setAttribute("src", "../src/media/images/senac_logo_branco.png"); // Configurando o atributo 'src' com o caminho da imagem

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
  "../src/media/icons/facebook-blue.svg",
  "../src/media/icons/instagram-blue.svg",
  "../src/media/icons/twitter-alt-blue.svg",
  "../src/media/icons/linkedin-blue.svg",
  "../src/media/icons/youtube-blue.svg",
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

if (listaCategorias){
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

const cards = [
  {
    chef: "Manoel Moura",
    receita: "Nome da Receita muito grande",
    curtidas: 1.511,
    fotoChef: "../src/media/images/chef.jpg",
    fotoReceita: "../src/media/images/fejoada.jpg",
    favorite: true,
  },
  {
    chef: "Paula Martins",
    receita: "Bolo de chocolate",
    curtidas: 1.234,
    fotoChef:
      "https://claudia.abril.com.br/wp-content/uploads/2022/12/receber-ABRE-da-materia.jpg?quality=85&strip=info",
    fotoReceita:
      "https://d2qcpt1idvpipw.cloudfront.net/recipes/2020/10/bolo-de-chocolate-recheado.jpg",
      favorite: false,
  },
  {
    chef: "João Silva",
    receita: "Pizza marguerita",
    curtidas: 987,
    fotoChef:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtRBoj24__MWojvhRoyWyRgGIlLi73ruLSvkMWOrbTt95rGQYCJok2_dX_rstYP758Z78&usqp=CAU",
    fotoReceita:
      "https://blog.praticabr.com/wp-content/uploads/2023/06/margherita-1024x682.jpg",
      favorite: true,
  },
  {
    chef: "Mariana Souza",
    receita: "Lasanha à bolonhesa",
    curtidas: 876,
    fotoChef:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjupo0yUuH2-4JV11_B8CZOs65II_FdcAHww&usqp=CAU",
    fotoReceita:
      "https://static.itdg.com.br/images/360-240/ec2a5e38702c60bf1ace0b5f1c8e9415/shutterstock-739787011.jpg",
      favorite: true,
  },
  {
    chef: "Pedro Santos",
    receita: "Feijoada",
    curtidas: 765,
    fotoChef:
      "https://www.rbsdirect.com.br/imagesrc/35582396.jpg?w=1024&h=768&a=c",
    fotoReceita:
      "https://www.sabornamesa.com.br/media/k2/items/cache/0f18514092300971a1d9467fe5706101_XL.jpg",
      favorite: false,
  },
  {
    chef: "Ana Paula",
    receita: "Paella",
    curtidas: 654,
    fotoChef: "https://ciadosfrios.com.br/wp-content/uploads/2022/07/leka2.jpg",
    fotoReceita:
      "https://cdn.casaeculinaria.com/wp-content/uploads/2023/05/17151208/Paella.webp",
      favorite: true,
  },
  {
    chef: "José Carlos",
    receita: "Carpaccio de salmão",
    curtidas: 543,
    fotoChef:
      "https://blog.zanottirefrigeracao.com.br/wp-content/uploads/2018/08/chef-cozinha-profissional.jpg",
    fotoReceita:
      "https://www.receiteria.com.br/wp-content/uploads/receitas-de-carpaccio-de-salmao-4-730x449.jpg",
      favorite: true,
    }
  ,
  {
    chef: "Clara Almeida",
    receita: "Torta de limão",
    curtidas: 432,
    fotoChef:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPjqfDEeFNaumUEQqwhToEv4mdM5_ZHcA4g&usqp=CAU",
    fotoReceita:
      "https://guiadacozinha.com.br/wp-content/uploads/2018/04/torta-de-limao-facil.jpg",
      favorite: false,
    },
  {
    chef: "Luís Oliveira",
    receita: "Brigadeiro",
    curtidas: 321,
    fotoChef:
      "https://viagemegastronomia.cnnbrasil.com.br/wp-content/uploads/sites/5/2018/07/pp.jpg",
    fotoReceita:
      "https://assets.delirec.com/images%2FhaztW3Xphpg6dAWjzLKIgW3ndc62%2Frecipe%2F45cdc669-bb94-4c24-bf6e-277f74447edd-Brigadeiro-Gourmet-gallery-0",
      favorite: true,
    },
];

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

    card.append(imgReceita);

    let imgChef = document.createElement("img");
    imgChef.classList.add("chef-avatar");
    imgChef.src = this.fotoChef; 

    card.append(imgChef);

    let btnReceita = document.createElement("button");
    btnReceita.classList.add("btn-receita");
    btnReceita.textContent = this.receita;

    card.append(btnReceita);

    let lbChef = document.createElement("label");
    lbChef.classList.add("lb-chef");
    lbChef.textContent = this.chef;

    card.append(lbChef);

    let lbAvaliacao = document.createElement("label");
    lbAvaliacao.classList.add("lb-avaliacao");
    lbAvaliacao.textContent = "❤ " + this.curtidas;

    card.append(lbAvaliacao);

    return card;
  }

}


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
    if(cardReceita.favorite && cont <= 5 && cardReceita.chef != "Manoel Moura"){
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
      if(cardReceita.chef != "Manoel Moura"){
        const fragment_card = document.createDocumentFragment(); 
        const newCard = new Card(cardReceita.chef, cardReceita.receita, cardReceita.curtidas, cardReceita.fotoChef, cardReceita.fotoReceita);
        const card = newCard.createCard();
        fragment_card.append(card);
        addCard.append(fragment_card);
       
        
      }
      
    });
    });


//============================================================================================

