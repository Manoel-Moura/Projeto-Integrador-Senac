const queryString = window.location.search; // Recebe as informações do Headers, no caso: ?id:1232132
console.log("Id chef: " + queryString.slice(4)); // pega somente os números do id, ignorando as 4 primeiras casas (?id:)

fetch("/user", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "id": queryString.slice(4)
    // id: "65c16b932f74375369e4e8c2",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erro na resposta do servidor");
    }
    return response.json();
  })
  .then((dadosDoChef) => {
    console.log(dadosDoChef);

    let nomeChef = document.getElementById("nome-chef");
    nomeChef.innerText = dadosDoChef.username;

    let fotoChef = document.getElementById("foto-chef");
    fotoChef.style.background = `url('../assets/media/uploads/${dadosDoChef.fotoUsuario}')`;
    // Adicionando as características ao estilo do elemento
    fotoChef.style.backgroundSize = "cover";
    fotoChef.style.backgroundPosition = "center";
    fotoChef.style.backgroundRepeat = "no-repeat";
    console.log(nomeChef);
  });
;

// document.addEventListener("DOMContentLoaded", function () {
//   fetch("/createCard")
//     .then((response) => response.json())
//     .then((cards) => {
//       const addCard = document.getElementById("rowCardChef");
//       const fragment_card = document.createDocumentFragment();

//       cards.forEach((cardReceita) => {
//         const newCard = new Card2(
//           cardReceita.chef,
//           cardReceita.receita,
//           cardReceita.curtidas,
//           cardReceita.fotoChef,
//           cardReceita.fotoReceita,
//           cardReceita.id,
//           cardReceita.categorias,
//           cardReceita.chefID
//         );
        
//         const card = newCard.createCard();
//         fragment_card.append(card);
//       });

//       addCard.append(fragment_card);
//     })
//     .catch((error) => console.error("Erro:", error));
// });

document.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;
  const chefId = queryString.slice(4);

  fetch("/createCard")
    .then((response) => response.json())
    .then((cards) => {
      const addCard = document.getElementById("rowCardChef");
      const fragment_card = document.createDocumentFragment();

      cards.forEach((cardReceita) => {
        // Verifica se o ID do chef associado à receita corresponde ao ID do chef atual
        if (cardReceita.chefID === chefId) {
          const newCard = new Card2(
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
        }
      });

      addCard.append(fragment_card);
    })
    .catch((error) => console.error("Erro:", error));
});


class Card2 {
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
    btnReceita.textContent = this.receita;
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
    console.log(this.curtidas);
    card.append(lbAvaliacao);

    return card;
  }
}