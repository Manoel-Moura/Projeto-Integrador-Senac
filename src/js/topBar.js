let container = document.getElementById("topo"); // Pega a div com id "topo" de cada pagina HTML para montar a TopBar

let fragment = document.createDocumentFragment();

let topBar = document.createElement("div");

topBar.setAttribute("class", "topo");

let divLogo = document.createElement("div");

divLogo.setAttribute("class", "divLogo");

//============================================================
// Criadno a imagem do topo com o Link para a pagina do Senac
let a_logo = document.createElement(`a`);
a_logo.setAttribute("class", "logo");
a_logo.setAttribute("href", "https://www.senac.br/");

let img_logo = document.createElement(`img`);
img_logo.setAttribute("src", "../src/media/images/senac_logo.svg.png");
img_logo.setAttribute("class", "logo");

a_logo.append(img_logo);

//================================================================================================
// Criando uma div com todos os botões do Menu já configurados
let botoes_menu = ["O Senac", "Início", "Chefes", "Sobre", "Login"];
const paginas_menu = [
  "https://www.senac.br/",
  "../index.html",
  "Chefes.html",
  "Sobre.html",
  "Login.html",
];

let tam = botoes_menu.length;

let div_botoes = document.createElement("div"); // Div para receber os botoes

div_botoes.setAttribute("class", "menubutton");

for (let i = 0; i < tam; i++) {
  let pagina = `${paginas_menu[i]}`;

  let botao = document.createElement(`a`);
  botao.setAttribute("href", pagina);

  let button = document.createElement(`button`);
  button.append(botoes_menu[i]);
  button.setAttribute("class", "botao");

  botao.append(button);
  div_botoes.append(botao);
}
//================================================================================================
// Criando uma div com todos dos contatos do Senac configurados
let img_contato = [
  "../src/media/images/facebook.png",
  "../src/media/images/instagram.png",
  "../src/media/images/twitter.png",
  "../src/media/images/linkedin.svg",
  "../src/media/images/youtube.png",
];
let class_css = ["face", "instagram", "twitter", "linkedin", "youtube"];
const link_contato = [
  "https://www.facebook.com/SenacBrasil",
  "https://www.instagram.com/senacbrasil/",
  "https://twitter.com/SenacBrasil",
  "https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F2655383",
  "https://www.youtube.com/user/SenacNacional",
];

let contatos = document.createElement("div");
contatos.setAttribute("class", "contatos");

let tam_contato = img_contato.length;

for (let i = 0; i < tam_contato; i++) {
  let cla = `${class_css[i]}`;

  //
  let link_social = `${link_contato[i]}`;
  let img_rede = `${img_contato[i]}`;

  let rede = document.createElement(`a`);
  rede.setAttribute("href", link_social);
  rede.setAttribute("target", "_blank");

  let btn_rede = document.createElement(`button`);
  btn_rede.setAttribute("class", "btn-social");

  let img_social = document.createElement(`img`);
  img_social.setAttribute("class", cla);
  img_social.setAttribute("src", img_rede);

  btn_rede.append(img_social);
  rede.append(btn_rede);
  contatos.append(rede);
}

// let logo_e_botoes = document.createElement('div')
// logo_e_botoes.setAttribute('class','divLogo')

topBar.append(a_logo); // Adiciona a logo a TopBar
topBar.append(div_botoes); // Adiciona a div com os botões do menu a TopBar

topBar.append(contatos); // Adiciona a div com os botões de contato a TopBar
fragment.append(topBar);
container.append(topBar); // Adiciona o topo da pagina ao HTML

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
  "../src/media/images/facebook.png",
  "../src/media/images/instagram.png",
  "../src/media/images/twitter.png",
  "../src/media/images/linkedin.svg",
  "../src/media/images/youtube.png",
];
let class_css_rodape = ["face-rodape", "instagram-rodape", "twitter-rodape", "linkedin-rodape", "youtube-rodape"];
const link_contato_rodape = [
  "https://www.facebook.com/SenacBrasil",
  "https://www.instagram.com/senacbrasil/",
  "https://twitter.com/SenacBrasil",
  "https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F2655383",
  "https://www.youtube.com/user/SenacNacional",
];

// Criando o elemento <div> que irá conter os contatos
let contatos_rodape = document.createElement("div");
contatos_rodape.setAttribute("class", "contatos");

// Obtendo o tamanho do array de imagens de contato
let tam_contato_rodape = img_contato_rodape.length;

// Iterando sobre os contatos
for (let i = 0; i < tam_contato_rodape; i++) {
  // Obtendo a classe CSS correspondente ao contato atual
  let cla = `${class_css_rodape[i]}`;

  // Obtendo o link e a imagem do contato atual
  let link_social = `${link_contato_rodape[i]}`;
  let img_rede = `${img_contato_rodape[i]}`;

  // Criando um elemento <a> para o link social
  let rede = document.createElement(`a`);
  rede.setAttribute("href", link_social);
  rede.setAttribute("target", "_blank");

  // Criando um botão dentro do link social
  let btn_rede = document.createElement(`button`);
  btn_rede.setAttribute("class", "btn-social-rodape");

  // Criando a imagem social
  let img_social = document.createElement(`img`);
  img_social.setAttribute("class", cla);
  img_social.setAttribute("src", img_rede);

  // Adicionando a imagem ao botão
  btn_rede.append(img_social);

  // Adicionando o botão ao link
  rede.append(btn_rede);

  // Adicionando o link à div de contatos
  contatos_rodape.append(rede);

  div_rodape_centralizado.append(contatos_rodape)
}

rodape_div.append(div_rodape_centralizado);
barra_bottom.append(rodape_div);

// Adicionando o fragmento de documento ao elemento com ID "bottom-bar" no HTML
bottom_bar.append(barra_bottom);
