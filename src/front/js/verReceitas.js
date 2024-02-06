const queryString = window.location.search; // Recebe as informações do Headers, no caso: ?id:1232132
console.log(queryString.slice(4)); // pega somente os números do id, ignorando as 4 primeiras casas (?id:)

let idParam = {
  id: queryString.slice(4),
};

let data = {
  method: "GET",
  headers: idParam,
};

const receitas = [
  // Receita de exemplo
  {
    nome: "Ovo frito",
    descricao:
      "O ovo frito é um prato simples, mas que pode ser uma obra-prima culinária. Para fazer um ovo frito perfeito, é preciso atenção aos detalhes e um pouco de prática.",
    autor: "Manoel Moura",
    numero_porcoes: 2,
    rendimento: 1,
    tempo_preparo: 5,
    tempo_cozimento: 2,
    calorias: 750,
    ingredientes: ["ovo", "sal", "salcinha", "folha de alface"],
    modo_preparo: [
      "Aqueça o óleo ou a manteiga em uma frigideira antiaderente em fogo médio.",
      "Quebre o ovo na frigideira e tempere com sal e pimenta a gosto.",
      "Deixe cozinhar por cerca de 2 minutos, ou até a clara começar a firmar.",
      "Tampe a frigideira e deixe cozinhar por mais 1 minuto, ou até a gema ficar na consistência desejada.",
      "Sirva em seguida.",
    ],
    curtidas: [],
    favoritas: [],
    url: {
      // tipo: 'video',
      // src: "https://www.youtube.com/embed/69GdvCwsM0A?si=C8qJFIzUk8hFUW_M"
      tipo: "imagem",
      src: "https://folhago.com.br/blogs/receitas-faceis/wp-content/uploads/2021/03/ovo-frito.jpeg",
    },
  },
];

let fotoUser;

document.addEventListener("DOMContentLoaded", function () {
  fetch("/receitaUser", data)
    .then((response) => response.json())
    .then((receita) => {
      console.log(JSON.stringify(receita));
      receitas[0].nome = receita[0].titulo;
      receitas[0].descricao = receita[0].descricao;
      receitas[0].numero_porcoes = receita[0].porcoes;
      receitas[0].tempo_preparo = receita[0].preparacao;
      receitas[0].tempo_cozimento = receita[0].cozimento;
      receitas[0].url.src = "../uploads/" + receita[0].foto;
      fotoUser = receita[0].user.fotoUsuario;
      receitas[0].autor = receita[0].user.username;
      receitas[0].ingredientes = receita[0].ingredientes;
      receitas[0].modo_preparo = receita[0].modoPreparo;
      receitas[0].curtidas = receita[0].curtidas;
      receitas[0].favoritas = receita[0].favoritas;
      let sessionID = receita[1].idsession || null;
      // alert(receita[1].idsession)
      //================

      // Criação da página com os dados atualizados
      let receitaElement = document.getElementById("corpo");

      let fragment_receita = document.createDocumentFragment();

      let div_receita = document.createElement("div");
      div_receita.setAttribute("class", "destaque-receita");

      let div_descricao = document.createElement("div");
      div_descricao.setAttribute("id", "descricao-receita"); // Foco

      let nome_prato = document.createElement("label");
      nome_prato.setAttribute("id", "nome-prato");
      nome_prato.innerText = receitas[0].nome;
      //=================================================================================

      let div_des = document.createElement("div");
      div_des.setAttribute("id", "descricao-chef");

      let infoChef = document.createElement("div");
      infoChef.setAttribute("id", "infochefe");

      let fotoChef = document.createElement("img");
      fotoChef.setAttribute("id", "fotochefe");
      fotoChef.setAttribute("src", "../assets/media/uploads/" + fotoUser);
      infoChef.appendChild(fotoChef);

      let dadosChef = document.createElement("div");
      dadosChef.setAttribute("id", "dadosChef");

      let nomeChef = document.createElement("div");
      nomeChef.setAttribute("id", "nomeChef");
      nomeChef.innerHTML = receitas[0].autor;
      //===========================================================

      // Criando a div para os botões
      let divBotoes = document.createElement("div");
      divBotoes.setAttribute("class", "botoes-container");

      let botaoCurtir = document.createElement("button");
      botaoCurtir.setAttribute("id", "curtir");
      let like = false;

      // Verifica se o usuário já curtiu a receita e define o ícone do botão de acordo
      receitas[0].curtidas.forEach((curtida) => {
        if (curtida === sessionID) {
          botaoCurtir.style.background =
            "url('../assets/media/icons/heart-solid.svg')";
          like = true; // Define como verdadeiro se houver correspondência
        }
      });

      // Adiciona o evento de clique ao botão de curtir
      botaoCurtir.addEventListener("click", () => {
        if (sessionID != null) {
          fetch("/curtidasReceita", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: queryString.slice(4) }), // Adicionando o corpo da requisição
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Erro na resposta do servidor");
              }
              return response.json();
            })
            .then((data) => {
              // alert("Operação realizada com sucesso!");
              // Inverte o estado do like após a operação ser realizada com sucesso
              like = !like;
              // Atualiza o ícone do botão de acordo com o estado atual do like
              if (like) {
                botaoCurtir.style.background =
                  "url('../assets/media/icons/heart-solid.svg')";
              } else {
                botaoCurtir.style.background =
                  "url('../assets/media/icons/favorito.svg')";
              }
            })
            .catch((error) => {
              console.error("Erro:", error);
            });
        } else {
          alert("Precisa fazer login para curtir!");
        }
      });

      // Botão de favorito
      let botaoFavorito = document.createElement("button");
      botaoFavorito.setAttribute("id", "favorito");
      let favorito = false; // Defina como global para persistir o estado

      // Verifica se o usuário já curtiu a receita e define o ícone do botão de acordo
      receitas[0].favoritas.forEach((favoritas) => {
        if (favoritas === sessionID) {
          botaoFavorito.style.backgroundImage =
            "url('../assets/media/icons/save2.svg')";
          favorito = true; // Define como verdadeiro se houver correspondência
        }
      });

      botaoFavorito.addEventListener("click", () => {
        if (sessionID != null) {
          fetch("/favoritaReceita", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: queryString.slice(4) }), // Adicionando o corpo da requisição
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Erro na resposta do servidor");
              }
              return response.json();
            })
            .then((data) => {
              // alert("Operação realizada com sucesso!");

              // Atualiza o ícone do botão de acordo com o estado atual do like
              if (favorito) {
                botaoFavorito.style.backgroundImage =
                  "url('../assets/media/icons/save.svg')";
              } else {
                botaoFavorito.style.backgroundImage =
                  "url('../assets/media/icons/save2.svg')";
              }
              favorito = !favorito;
            })
            .catch((error) => {
              console.error("Erro:", error);
            });
        } else {
          alert("Precisa fazer login para favoritar!");
        }
      });

      // Botão de imprimir
      let botaoImprimir = document.createElement("button");
      botaoImprimir.setAttribute("id", "imprimir");
      // Adiciona um evento de clique ao botão
      botaoImprimir.addEventListener("click", function () {
        imprimirReceita();
      });

      // Função para imprimir a receita
      // function imprimirReceita() {
      //   let receitaParaImprimir = document.getElementById("corpo").innerHTML;
      //   // let janelaDeImpressao = window.open('', '_blank');
      //   // janelaDeImpressao.document.write('<html><head><title>Receita</title></head><body>');
      //   // janelaDeImpressao.document.write('<h1>Receita</h1>');
      //   // janelaDeImpressao.document.write(receitaParaImprimir);
      //   // janelaDeImpressao.document.write('</body></html>');
      //   // janelaDeImpressao.document.close();
      //   // janelaDeImpressao.print();
      //   window.print();
      // }

      // Adicionando os botões à div
      divBotoes.appendChild(botaoCurtir);
      divBotoes.appendChild(botaoFavorito);
      divBotoes.appendChild(botaoImprimir);
      //=============================================================================

      let contatoChef = document.createElement("div");
      contatoChef.setAttribute("id", "contatochef");
      contatoChef.innerText = "@Manoel Moura";

      let div_dados_chef = document.createElement("div");
      div_dados_chef.setAttribute("id", "div-dados-chef");

      div_dados_chef.append(contatoChef);
      div_dados_chef.append(divBotoes);

      // Adicionando a div com os botões à lista_opcao ou outro elemento de sua escolha
      dadosChef.appendChild(nomeChef);
      dadosChef.appendChild(div_dados_chef);

      infoChef.appendChild(dadosChef);

      div_des.appendChild(infoChef);

      let descricao = document.createElement("div");
      descricao.setAttribute("id", "descricao");
      descricao.innerHTML = '" ' + receitas[0].descricao + ' "';
      // ===================================================================================================

      let lista_descricao = document.createElement("div");
      lista_descricao.setAttribute("id", "lista-descricao");

      let numero_igredientes = document.createElement("label");
      numero_igredientes.setAttribute("id", "valor-itens");
      numero_igredientes.innerText = receitas[0].ingredientes.length;

      let label_igredientes = document.createElement("label");
      label_igredientes.setAttribute("id", "label-itens");
      label_igredientes.innerText = "Igredientes";

      let colum_ingredientes = document.createElement("div");
      colum_ingredientes.setAttribute("id", "colum");

      let tempo_preparo = document.createElement("label");
      tempo_preparo.setAttribute("id", "valor-itens");
      tempo_preparo.innerText = receitas[0].tempo_preparo;

      let label_tempo_preparo = document.createElement("label");
      label_tempo_preparo.setAttribute("id", "label-itens");
      label_tempo_preparo.innerHTML = "Minutos";

      let colum_tempo_preparo = document.createElement("div");
      colum_tempo_preparo.setAttribute("id", "colum");

      let nPorcoes = document.createElement("label");
      nPorcoes.setAttribute("id", "valor-itens");
      nPorcoes.innerText = receitas[0].rendimento;

      let label_nPorcoes = document.createElement("label");
      label_nPorcoes.setAttribute("id", "label-itens");
      label_nPorcoes.innerHTML = "Numero<br>porções";

      let colum_nPorcoes = document.createElement("div");
      colum_nPorcoes.setAttribute("id", "colum");

      let calorias = document.createElement("label");
      calorias.setAttribute("id", "valor-itens");
      calorias.innerText = receitas[0].calorias;

      let label_calorias = document.createElement("label");
      label_calorias.setAttribute("id", "label-itens");
      label_calorias.innerHTML = "Calorias";

      let colum_calorias = document.createElement("div");
      colum_calorias.setAttribute("id", "colum");

      colum_ingredientes.append(numero_igredientes);
      colum_ingredientes.append(label_igredientes);

      colum_nPorcoes.append(nPorcoes);
      colum_nPorcoes.append(label_nPorcoes);

      colum_calorias.append(calorias);
      colum_calorias.append(label_calorias);

      colum_tempo_preparo.append(tempo_preparo);
      colum_tempo_preparo.append(label_tempo_preparo);

      lista_descricao.append(colum_ingredientes);
      lista_descricao.append(colum_tempo_preparo);
      lista_descricao.append(colum_calorias);
      lista_descricao.append(colum_nPorcoes);

      // ===================================================================================================

      let ingredientes_receita = document.createElement("div");
      ingredientes_receita.setAttribute("id", "ingredientes-receita");

      let ingredientes = document.createElement("div");
      ingredientes.setAttribute("id", "ingredientes");

      let label_ingredientes = document.createElement("label");
      label_ingredientes.setAttribute("id", "label-ingredientes");
      label_ingredientes.innerHTML = "ingredientes: ";

      let lista_ingredientes = document.createElement("div");
      lista_ingredientes.setAttribute("id", "lista-ingredientes");

      receitas[0].ingredientes.forEach((element) => {
        let ingrediente = document.createElement("label");
        ingrediente.setAttribute("id", "ingrediente");
        ingrediente.innerHTML = "# " + element;
        lista_ingredientes.append(ingrediente);
      });

      let modo_preparo = document.createElement("div");
      modo_preparo.setAttribute("id", "modo-preparo");

      let label_preparo = document.createElement("label");
      label_preparo.setAttribute("id", "label-ingredientes");
      label_preparo.innerHTML = "Modo de preparo: ";

      let lista_modo_preparo = document.createElement("div");
      lista_modo_preparo.setAttribute("id", "lista-ingredientes");

      let num = 1;

      receitas[0].modo_preparo.forEach((element) => {
        let modo = document.createElement("label");
        modo.setAttribute("id", "ingrediente");
        modo.innerHTML = num + "- " + element;
        lista_modo_preparo.append(modo);
        num++;
      });

      ingredientes.append(label_ingredientes);
      ingredientes.append(lista_ingredientes);

      modo_preparo.append(label_preparo);
      modo_preparo.append(lista_modo_preparo);

      ingredientes_receita.append(ingredientes);
      ingredientes_receita.append(modo_preparo);
      // ===================================================================================================

      div_descricao.append(nome_prato);
      div_descricao.append(div_des);

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

      div_des.append(descricao);
      //=================================================================================================

      div_receita.append(img_receita);
      div_receita.append(div_descricao);

      fragment_receita.append(div_receita);
      fragment_receita.append(lista_descricao);
      fragment_receita.append(ingredientes_receita);

      // fragment_receita.append(div_des)

      receitaElement.append(fragment_receita);
    })
    .catch((error) => console.error("Erro:", error));
});
