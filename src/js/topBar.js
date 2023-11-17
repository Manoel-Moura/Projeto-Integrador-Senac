let container = document.getElementById("topo"); // Pega a div com id "topo" de cada pagina HTML para montar a TopBar

let fragment = document.createDocumentFragment();

let topBar = document.createElement('div');

topBar.setAttribute('class','topo');


let divLogo = document.createElement('div');

divLogo.setAttribute('class','divLogo')


//============================================================
        // Criadno a imagem do topo com o Link para a pagina do Senac
let a_logo = document.createElement(`a`)
a_logo.setAttribute('class', 'logo')
a_logo.setAttribute('href','https://www.senac.br/')

let img_logo = document.createElement(`img`)
img_logo.setAttribute('src','../src/media/images/senac_logo.svg.png')
img_logo.setAttribute('class', 'logo')

a_logo.append(img_logo)


//================================================================================================
        // Criando uma div com todos os botões do Menu já configurados 
let botoes_menu = ["O Senac","Início", "Chefes", "Sobre", "Login"]
const paginas_menu = ["https://www.senac.br/", "../index.html", "Chefes.html", "Sobre.html", "Login.html"]

let tam = botoes_menu.length

let div_botoes = document.createElement('div'); // Div para receber os botoes 

div_botoes.setAttribute('class','menubutton')

for(let i=0; i<tam; i++) {

    let pagina = `${paginas_menu[i]}`

    let botao = document.createElement(`a`)
    botao.setAttribute('href', pagina)

    let button = document.createElement(`button`)
    button.append(botoes_menu[i])
    button.setAttribute('class', 'botao')
    
    botao.append(button)
    div_botoes.append(botao)
};
//================================================================================================
                    // Criando uma div com todos dos contatos do Senac configurados
let img_contato = ['../src/media/images/facebook.png','../src/media/images/instagram.png', '../src/media/images/twitter.png', "../src/media/images/linkedin.svg","../src/media/images/youtube.png"]
let class_css = ['face','instagram', 'twitter', 'linkedin','youtube']
const link_contato = ["https://www.facebook.com/SenacBrasil", "https://www.instagram.com/senacbrasil/", "https://twitter.com/SenacBrasil", "https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F2655383", 'https://www.youtube.com/user/SenacNacional']


let contatos = document.createElement('div')
contatos.setAttribute('class', 'contatos')

let tam_contato = img_contato.length

for(let i=0; i<tam_contato; i++) {

    let cla = `${class_css[i]}`

    //
    let link_social = `${link_contato[i]}`
    let img_rede = `${img_contato[i]}`

    let rede = document.createElement(`a`);
    rede.setAttribute('href', link_social)
    rede.setAttribute('target','_blank')

    let btn_rede = document.createElement(`button`);
    btn_rede.setAttribute("class", "btn-social");

    let img_social = document.createElement(`img`);
    img_social.setAttribute("class", cla);
    img_social.setAttribute('src', img_rede)
  
    btn_rede.append(img_social)
    rede.append(btn_rede)
    contatos.append(rede)
   
};


// let logo_e_botoes = document.createElement('div')
// logo_e_botoes.setAttribute('class','divLogo')

topBar.append(a_logo) // Adiciona a logo a TopBar
topBar.append(div_botoes) // Adiciona a div com os botões do menu a TopBar


topBar.append(contatos) // Adiciona a div com os botões de contato a TopBar
fragment.append(topBar);
container.append(topBar) // Adiciona o topo da pagina ao HTML

//========================================================================================================
//                      Configurando o Rodapé da pagina

let bottom_bar = document.getElementById("bottom-bar")
let barra_bottom = document.createDocumentFragment();

let rodape_div = document.createElement('div');

rodape_div.setAttribute('class','rodape');

barra_bottom.append(rodape_div)
bottom_bar.append(barra_bottom)