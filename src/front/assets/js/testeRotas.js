document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault();
    var rota = document.getElementById('req').value;
    var qntCards = document.getElementById('qntCards').value;

    var t0 = performance.now();

    fetch(rota + '?qntCards=' + qntCards, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    })
        .then(response => response.text())
        .then(data => {
            var t1 = performance.now();
            console.log("Tempo de resposta: " + (t1 - t0) + " milissegundos.");
            //console.log(data);
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
});
