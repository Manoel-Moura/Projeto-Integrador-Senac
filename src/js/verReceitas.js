const receitas = [
  {
    nome: "Ovo frito ",
    descricao: "Muito boa ",
    autor: 'Manoel Moura',
    numero_porcoes: 2,
    rendimento: 1,
    tempo_preparo: 5,
    tempo_cozimento: 2,
    ingredientes: ['ovo','sal','salcinha','folha de alface'],
    modo_preparo: [],
    url: {
      // tipo: 'video',
      // src: "https://www.youtube.com/embed/LF_kxpSKXdM?si=xrOZuz1hZaZGVFuD"
      tipo: "imagem",
      src: "https://folhago.com.br/blogs/receitas-faceis/wp-content/uploads/2021/03/ovo-frito.jpeg",
    },
  },
];

let receita = document.getElementById("corpo");

let fragment_receita = document.createDocumentFragment();

let div_receita = document.createElement("div");
div_receita.setAttribute("class", "destaque-receita");

let div_descricao = document.createElement("div");
div_descricao.setAttribute("id", "descricao-receita");

let nome_prato = document.createElement("label");
nome_prato.setAttribute("id", "nome-prato");
nome_prato.innerText = receitas[0].nome;

let lista_descricao = document.createElement("div");
lista_descricao.setAttribute("id", "lista-descricao");

let numero_igredientes = document.createElement("label");
numero_igredientes.setAttribute("id", "valor-itens");
numero_igredientes.innerText = receitas[0].ingredientes.length;

let label_igredientes = document.createElement("label");
label_igredientes.setAttribute("id", "label-itens");
label_igredientes.innerText = 'Igredientes';

let colum_ingredientes = document.createElement("div");
colum_ingredientes.setAttribute("id", "colum");


// ===================================================================================================
let tempo_preparo = document.createElement("label");
tempo_preparo.setAttribute("id", "valor-itens");
tempo_preparo.innerText = receitas[0].tempo_preparo;

let label_tempo_preparo = document.createElement("label");
label_tempo_preparo.setAttribute("id", "label-itens");
label_tempo_preparo.innerHTML  = 'Minutos';

let colum_tempo_preparo = document.createElement("div");
colum_tempo_preparo.setAttribute("id", "colum");

// ===================================================================================================
let nPorcoes = document.createElement("label");
nPorcoes.setAttribute("id", "valor-itens");
nPorcoes.innerText = receitas[0].rendimento;

let label_nPorcoes  = document.createElement("label");
label_nPorcoes.setAttribute("id", "label-itens");
label_nPorcoes.innerHTML  = 'Numero<br>porções';

let colum_nPorcoes = document.createElement("div");
colum_nPorcoes.setAttribute("id", "colum");

let autor  = document.createElement("label");
autor.setAttribute("id", "label-autor");
autor.innerHTML  = '👨‍🍳 ' + receitas[0].autor  ;


colum_ingredientes.append(numero_igredientes)
colum_ingredientes.append(label_igredientes)

colum_nPorcoes.append(nPorcoes)
colum_nPorcoes.append(label_nPorcoes)

colum_tempo_preparo.append(tempo_preparo)
colum_tempo_preparo.append(label_tempo_preparo)


lista_descricao.append(colum_ingredientes)
lista_descricao.append(colum_tempo_preparo)
lista_descricao.append(colum_nPorcoes)


div_descricao.append(nome_prato);
div_descricao.append(autor)
div_descricao.append(lista_descricao);

let img_receita;

if (receitas[0].url.tipo === "imagem") {
  img_receita = document.createElement("img");
  img_receita.setAttribute("id", "img-receita");
  img_receita.setAttribute("src", receitas[0].url.src);
} else {
  img_receita = document.createElement("iframe");
  img_receita.setAttribute("id", "video-receita");
  img_receita.setAttribute("src", receitas[0].url.src);
}

// =====================================================================================================
let div_des = document.createElement("div");
div_des.setAttribute("id","descricao-chef")
div_des.innerHTML  = 'Descrição do chef: ';

let descricao = document.createElement("div");
descricao.setAttribute("id","descricao")
descricao.innerHTML  = '" ' + receitas[0].descricao + ' "'  ;


div_des.append(descricao)
//=================================================================================================



// =====================================================================================================


// =====================================================================================================









div_receita.append(img_receita);
div_receita.append(div_descricao);


fragment_receita.append(div_receita);
fragment_receita.append(div_des)

receita.append(fragment_receita);
