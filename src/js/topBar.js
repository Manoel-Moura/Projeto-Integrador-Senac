// =============================================================================

function Toggle() {
  let div_btns = document.getElementById("menubutton");
  let bnt_social = document.getElementById("contatos");
  let img_barra_pesquisa = document.getElementById("containerResponsivo");

  if (div_btns.style.display === "none") {
    div_btns.style.display = "flex";
    bnt_social.style.display = "flex";
    img_barra_pesquisa.style.marginTop = "75mm";
  } else {
    div_btns.style.display = "none";
    bnt_social.style.display = "none";
    img_barra_pesquisa.style.marginTop = "0mm";
  }
}

// Obtendo a referência do elemento com o ID "topo" no HTML
let container = document.getElementById("topo");

// Criando um fragmento de documento para otimizar a manipulação do DOM
let fragment = document.createDocumentFragment();

// Criando o elemento <div> para a TopBar
let topBar = document.createElement("div");
topBar.classList.add("topo");

// Criando a div para a logo
let divLogo = document.createElement("div");
divLogo.classList.add("divLogo");

//============================================================
// Criando a imagem do topo com o Link para a página do Senac
let aLogo = document.createElement("a");
aLogo.classList.add("logo");
aLogo.setAttribute("href", "https://www.senac.br/");

let imgLogo = document.createElement("img");
imgLogo.setAttribute("src", "../src/media/images/Senac_logo.jpg");
imgLogo.classList.add("logo");

aLogo.appendChild(imgLogo);
divLogo.appendChild(aLogo);

let buttonMenu = document.createElement("button");
buttonMenu.setAttribute("id", "bt-menu-response");
buttonMenu.addEventListener("click", () => {
  console.log("opa");
  Toggle();
});

divLogo.appendChild(buttonMenu);

//================================================================================================
// Criando uma div com todos os botões do Menu já configurados
let botoesMenu = ["O Senac", "Início", "Chefes", "Sobre", "Login"];
let paginasMenu = [
  "https://www.senac.br/",
  "../pages/home.html",
  "../pages/editarReceita.html",
  "../pages/sobre.html",
  "../pages/manoel.html",
];

let divBotoes = document.createElement("div");
divBotoes.setAttribute("id", "menubutton");

for (let i = 0; i < botoesMenu.length; i++) {
  let pagina = paginasMenu[i];

  let botao = document.createElement("a");
  botao.setAttribute("href", pagina);

  let button = document.createElement("button");
  button.textContent = botoesMenu[i];
  button.setAttribute("class", "botao");

  botao.appendChild(button);
  divBotoes.appendChild(botao);
}
//================================================================================================
// Criando uma div com todos os contatos do Senac configurados
let imgContato = [
  "../src/media/icons/facebook-.svg",
  "../src/media/icons/instagram.svg",
  "../src/media/icons/twitter-alt.svg",
  "../src/media/icons/linkedin.svg",
  "../src/media/icons/youtube.svg",
];

let classCss = ["face", "instagram", "twitter", "linkedin", "youtube"];
let linkContato = [
  "https://www.facebook.com/SenacBrasil",
  "https://www.instagram.com/senacbrasil/",
  "https://twitter.com/SenacBrasil",
  "https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F2655383",
  "https://www.youtube.com/user/SenacNacional",
];

const contatos = document.createElement("div");
contatos.setAttribute("id", "contatos");

for (let i = 0; i < imgContato.length; i++) {
  const classe = classCss[i];

  let linkSocial = linkContato[i];
  let imgRede = imgContato[i];

  let rede = document.createElement("a");
  rede.setAttribute("href", linkSocial);
  rede.setAttribute("target", "_blank");

  let btnRede = document.createElement("button");
  btnRede.setAttribute("class", "btn-social");

  let imgSocial = document.createElement("img");
  imgSocial.setAttribute("class", classe);
  imgSocial.setAttribute("src", imgRede);

  btnRede.appendChild(imgSocial);
  rede.appendChild(btnRede);
  contatos.appendChild(rede);
}

// Adicionando a logo à TopBar
topBar.appendChild(divLogo);
// Adicionando os botões do menu à TopBar
topBar.appendChild(divBotoes);
// Adicionando os contatos à TopBar
topBar.appendChild(contatos);

// Adicionando a TopBar ao fragmento de documento
fragment.appendChild(topBar);
// Adicionando o fragmento de documento à div com o ID "topo" no HTML
container.appendChild(fragment);

fragment_menu_mobile.append(menu);
menu_mobile.append(fragment_menu_mobile);
