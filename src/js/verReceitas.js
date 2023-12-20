const receitas = [
  {
    nome: "Ovo frito fsdfagdfg gdfgdsfg hdfgsh gfh fgh fghf dghfg hfghfghfg hfghddfghdfg fghrtybnruntiy urikj uh iuuih byhvgyigiogihovbyu gyi vgyibo gyti gytiu gyi gyi hb gyi gyi",
    descricao: "Muito boa sdfagdfg gdfgdsfg hdfgsh gfh fgh fghf dghfg hfghfghfg hfghddfghdfg fghrtybnruntiy urikj uh sdfagdfg gdfgdsfg hdfgsh gfh fgh fghf dghfg hfghfghfg hfghddfghdfg fghrtybnruntiy urikj uh i sdfagdfg gdfgdsfg hdfgsh gfh fgh fghf dghfg hfghfghfg hfghddfghdfg fghrtybnruntiy urikj uh i iuuih byhvgyigiogihovby ",
    autor: 'Manoel Moura',
    numero_porcoes: 2,
    rendimento: 1,
    tempo_preparo: 5,
    tempo_cozimento: 2,
    calorias: 750,
    ingredientes: ['ovo','sal','salcinha','folha de alface'],
    modo_preparo: ['ovo','sal','salcinha','folha de alface'],
    url: {
      // tipo: 'video',
      // src: "https://www.youtube.com/embed/LF_kxpSKXdM?si=xrOZuz1hZaZGVFuD"
      tipo: "imagem",
      src: "https://folhago.com.br/blogs/receitas-faceis/wp-content/uploads/2021/03/ovo-frito.jpeg",
    },
  },
];

// ===================================================================================================
let receita = document.getElementById("corpo");

let fragment_receita = document.createDocumentFragment();

let div_receita = document.createElement("div");
div_receita.setAttribute("class", "destaque-receita");

let div_descricao = document.createElement("div");
div_descricao.setAttribute("id", "descricao-receita");

let nome_prato = document.createElement("label");
nome_prato.setAttribute("id", "nome-prato");
nome_prato.innerText = receitas[0].nome;

let div_des = document.createElement("div");
div_des.setAttribute("id","descricao-chef")
div_des.innerHTML  = 'Descrição do chef: ';

let descricao = document.createElement("div");
descricao.setAttribute("id","descricao")
descricao.innerHTML  = '" ' + receitas[0].descricao + ' "'  ;
// ===================================================================================================


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


let tempo_preparo = document.createElement("label");
tempo_preparo.setAttribute("id", "valor-itens");
tempo_preparo.innerText = receitas[0].tempo_preparo;

let label_tempo_preparo = document.createElement("label");
label_tempo_preparo.setAttribute("id", "label-itens");
label_tempo_preparo.innerHTML  = 'Minutos';

let colum_tempo_preparo = document.createElement("div");
colum_tempo_preparo.setAttribute("id", "colum");

let nPorcoes = document.createElement("label");
nPorcoes.setAttribute("id", "valor-itens");
nPorcoes.innerText = receitas[0].rendimento;

let label_nPorcoes  = document.createElement("label");
label_nPorcoes.setAttribute("id", "label-itens");
label_nPorcoes.innerHTML  = 'Numero<br>porções';

let colum_nPorcoes = document.createElement("div");
colum_nPorcoes.setAttribute("id", "colum");


let calorias = document.createElement("label");
calorias.setAttribute("id", "valor-itens");
calorias.innerText = receitas[0].calorias;

let label_calorias  = document.createElement("label");
label_calorias.setAttribute("id", "label-itens");
label_calorias.innerHTML  = 'Calorias';

let colum_calorias = document.createElement("div");
colum_calorias.setAttribute("id", "colum");


colum_ingredientes.append(numero_igredientes)
colum_ingredientes.append(label_igredientes)

colum_nPorcoes.append(nPorcoes)
colum_nPorcoes.append(label_nPorcoes)

colum_calorias.append(calorias)
colum_calorias.append(label_calorias)

colum_tempo_preparo.append(tempo_preparo)
colum_tempo_preparo.append(label_tempo_preparo)


lista_descricao.append(colum_ingredientes)
lista_descricao.append(colum_tempo_preparo)
lista_descricao.append(colum_calorias)
lista_descricao.append(colum_nPorcoes)

// ===================================================================================================

let ingredientes_receita = document.createElement("div");
ingredientes_receita.setAttribute("id", "ingredientes-receita");

let ingredientes = document.createElement("div");
ingredientes.setAttribute("id", "ingredientes");

let label_ingredientes = document.createElement("label");
label_ingredientes.setAttribute("id", "label-ingredientes");
label_ingredientes.innerHTML  = 'ingredientes: ';

let lista_ingredientes = document.createElement("div");
lista_ingredientes.setAttribute("id", "lista-ingredientes");

receitas[0].ingredientes.forEach(element => {
  let ingrediente = document.createElement("label");
  ingrediente.setAttribute("id", "ingrediente");
  ingrediente.innerHTML  = '# ' + element;
  lista_ingredientes.append(ingrediente)

});

let modo_preparo = document.createElement("div");
modo_preparo.setAttribute("id", "modo-preparo");

let label_preparo = document.createElement("label");
label_preparo.setAttribute("id", "label-ingredientes");
label_preparo.innerHTML  = 'Modo de preparo: ';

let lista_modo_preparo = document.createElement("div");
lista_modo_preparo.setAttribute("id", "lista-ingredientes");

let num = 1

receitas[0].modo_preparo.forEach(element => {
  let modo = document.createElement("label");
  modo.setAttribute("id", "ingrediente");
  modo.innerHTML  = num + '- ' + element;
  lista_modo_preparo.append(modo)
num++;
});



ingredientes.append(label_ingredientes)
ingredientes.append(lista_ingredientes)

modo_preparo.append(label_preparo)
modo_preparo.append(lista_modo_preparo)


ingredientes_receita.append(ingredientes)
ingredientes_receita.append(modo_preparo)
// ===================================================================================================
// ===================================================================================================
// ===================================================================================================
// ===================================================================================================
// ===================================================================================================





// ===================================================================================================

// ===================================================================================================


// let autor  = document.createElement("label");
// autor.setAttribute("id", "label-autor");
// autor.innerHTML  = '👨‍🍳 ' + receitas[0].autor;


// colum_ingredientes.append(numero_igredientes)
// colum_ingredientes.append(label_igredientes)

// colum_nPorcoes.append(nPorcoes)
// colum_nPorcoes.append(label_nPorcoes)

// colum_tempo_preparo.append(tempo_preparo)
// colum_tempo_preparo.append(label_tempo_preparo)


// lista_descricao.append(colum_ingredientes)
// lista_descricao.append(colum_tempo_preparo)
// lista_descricao.append(colum_nPorcoes)


div_descricao.append(nome_prato);
div_descricao.append(div_des)

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
// let div_des = document.createElement("div");
// div_des.setAttribute("id","descricao-chef")
// div_des.innerHTML  = 'Descrição do chef: ';

// let descricao = document.createElement("div");
// descricao.setAttribute("id","descricao")
// descricao.innerHTML  = '" ' + receitas[0].descricao + ' "'  ;


div_des.append(descricao)
//=================================================================================================



// =====================================================================================================


// =====================================================================================================









div_receita.append(img_receita);
div_receita.append(div_descricao);


fragment_receita.append(div_receita);
fragment_receita.append(lista_descricao)
fragment_receita.append(ingredientes_receita)

// fragment_receita.append(div_des)

receita.append(fragment_receita);
