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
I;
