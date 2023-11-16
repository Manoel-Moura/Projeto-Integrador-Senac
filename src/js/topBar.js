let container = document.getElementById("container");

let fragment = document.createDocumentFragment();

let topBar = document.createElement('div');

topBar.setAttribute('class','topo');


let divLogo = document.createElement('div');

divLogo.setAttribute('class','divLogo')



//============================================================
let a_logo = document.createElement(`a`)
a_logo.setAttribute('class', 'logo')
a_logo.setAttribute('href','https://www.senac.br/')

let img_logo = document.createElement(`img`)
img_logo.setAttribute('src','../src/media/images/senac_logo.svg.png')
img_logo.setAttribute('class', 'logo')

a_logo.append(img_logo)



//=============================================================

let a_inicio = document.createElement('a');
a_inicio.setAttribute('href','../pages/camila.html')

let b_inicio = document.createElement('button');
b_inicio.append('Inicio')
b_inicio.setAttribute('class','botao')
//==============================================================
let a_senac = document.createElement('a');
a_senac.setAttribute('href','https://www.senac.br/')

let b_senac = document.createElement('button');
b_senac.append('Senac')
b_senac.setAttribute('class','botao')
//==============================================================

let a_chef = document.createElement('a');
a_chef.setAttribute('href','../pages/thalita.html')

let b_chef = document.createElement('button');
b_chef.append('Chefs')
b_chef.setAttribute('class','botao')
//==============================================================
let a_sobre = document.createElement('a');
a_sobre.setAttribute('href','../pages/gabriel.html')

let b_sobre = document.createElement('button');
b_sobre.append('Sobre')
b_sobre.setAttribute('class','botao')
//==============================================================
let a_login = document.createElement('a');
a_login.setAttribute('href','https://www.senac.br/')

let b_login = document.createElement('button');
b_login.append('Login')
b_login.setAttribute('class','botao')
//==============================================================

let div_botoes = document.createElement('div');

div_botoes.setAttribute('class','menubutton')

a_inicio.append(b_inicio)
a_senac.append(b_senac)
a_chef.append(b_chef)
a_login.append(b_login)
a_sobre.append(b_sobre)

div_botoes.append(a_inicio)
div_botoes.append(a_senac)
div_botoes.append(a_chef)
div_botoes.append(a_sobre)
div_botoes.append(a_login)
//===================================================================

let contatos = document.createElement('div')
contatos.setAttribute('class', 'contatos')

let a_face = document.createElement('a')
a_face.setAttribute('class','contato')
a_face.setAttribute('target','_blank')
a_face.setAttribute('href','https://www.facebook.com/SenacBrasil' )

let img_face = document.createElement('img')
img_face.setAttribute('class', 'face')
img_face.setAttribute('src','../src/media/images/facebook.png')

//----------------------------------------------------------------------

let a_insta = document.createElement('a')
a_insta.setAttribute('class','contato')
a_insta.setAttribute('target','_blank')
a_insta.setAttribute('href','https://www.instagram.com/senacbrasil/' )

let img_insta = document.createElement('img')
img_insta.setAttribute('class', 'instagram')
img_insta.setAttribute('src','../src/media/images/instagram.png')
//----------------------------------------------------------------------

let a_twitter = document.createElement('a')
a_twitter.setAttribute('class','contato')
a_twitter.setAttribute('target','_blank')
a_twitter.setAttribute('href','https://twitter.com/SenacBrasil' )

let img_twitter = document.createElement('img')
img_twitter.setAttribute('class', 'twitter')
img_twitter.setAttribute('src','../src/media/images/twitter.png')

//----------------------------------------------------------------------

let a_linkedin = document.createElement('a')
a_linkedin.setAttribute('class','contato')
a_linkedin.setAttribute('target','_blank')
a_linkedin.setAttribute('href','https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F2655383' )

let img_linkedin = document.createElement('img')
img_linkedin.setAttribute('class', 'linkedin')
img_linkedin.setAttribute('src','../src/media/images/linkedin.svg')
//----------------------------------------------------------------------

let a_youtube = document.createElement('a')
a_youtube.setAttribute('class','contato')
a_youtube.setAttribute('target','_blank')
a_youtube.setAttribute('href','https://www.youtube.com/user/SenacNacional' )

let img_youtube = document.createElement('img')
img_youtube.setAttribute('class', 'youtube')
img_youtube.setAttribute('src','../src/media/images/youtube.png')



a_face.append(img_face)
a_insta.append(img_insta)
a_twitter.append(img_twitter)
a_linkedin.append(img_linkedin)
a_youtube.append(img_youtube)

contatos.append(a_face)
contatos.append(a_insta)
contatos.append(a_twitter)
contatos.append(a_linkedin)
contatos.append(a_youtube)
//=========================================================================
let logo_e_botoes = document.createElement('div')
logo_e_botoes.setAttribute('class','divLogo')
logo_e_botoes.append(a_logo)
logo_e_botoes.append(div_botoes)

topBar.append(logo_e_botoes)
topBar.append(contatos)
fragment.append(topBar);
container.append(topBar)