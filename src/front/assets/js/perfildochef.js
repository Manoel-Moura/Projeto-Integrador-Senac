
const queryString = window.location.search; // Recebe as informações do Headers, no caso: ?id:1232132
// console.log("Id chef: " + queryString.slice(4)); // pega somente os números do id, ignorando as 4 primeiras casas (?id:)

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
    // console.log(dadosDoChef);

    let nomeChef = document.getElementById("nome-chef");
    nomeChef.innerText = dadosDoChef.username;

    let fotoChef = document.getElementById("foto-chef");
    fotoChef.style.background = `url('../assets/media/uploads/${dadosDoChef.fotoUsuario}')`;
    // Adicionando as características ao estilo do elemento
    fotoChef.style.backgroundSize = "cover";
    fotoChef.style.backgroundPosition = "center";
    fotoChef.style.backgroundRepeat = "no-repeat";
    // console.log(nomeChef);
  });
;


document.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;
  const chefId = queryString.slice(4);

  fetch("/createCard")
    .then((response) => response.json())
    .then((cards) => {
      const addCard = document.getElementById("rowCardChef");
      const fragment_card = document.createDocumentFragment();
      let recipeCount = 0;

      cards.forEach((cardReceita) => {


        
        // Verifica se o ID do chef associado à receita corresponde ao ID do chef atual
        if (cardReceita.chefID === chefId) {
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
          recipeCount++;
        }

     
  
        
      });

      addCard.append(fragment_card);

      // Verifica se o usuário possui receitas
      if (recipeCount === 0) {
        const divCont2 = document.getElementById("cont2");
        divCont2.style.display = "none";

      }
    })
    .catch((error) => console.error("Erro:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;
  const chefId = queryString.slice(4);

  fetch("/createCard")
    .then((response) => response.json())
    .then((cards) => {
      displayLikedRecipes(cards, chefId);
    })
    .catch((error) => console.error("Erro:", error));
});

function displayLikedRecipes(cards, chefId) {
  const receitaDestaque = document.getElementById("receitaDestaque");
  let hasLikedRecipes = false;

  cards.forEach((cardReceita) => {
    // Verifica se o chef atual curtiu essa receita
    const curtidas = cardReceita.curtidas.map(like => typeof like === 'string' ? like : (like.usuario ? like.usuario : ''));
    if (curtidas.includes(chefId)) {
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
      receitaDestaque.appendChild(card);
      hasLikedRecipes = true;
    }
    if(queryString.slice(4) != cardReceita.sessionUser){
       const addReceita = document.getElementById("box-one");
          addReceita.style.display = "none";
    }
    // console.log(`Dono: ${queryString.slice(4)}`);
    // console.log(`User: ${cardReceita.sessionUser}`);
  });

  // Oculta a div receitaDestaque se não houver receitas curtidas
  if (!hasLikedRecipes) {
    const receitaDestaque = document.getElementById("cont");
    receitaDestaque.style.display = "none";
  }
 
}
