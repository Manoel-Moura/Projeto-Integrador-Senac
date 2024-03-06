var reqNumber = 0;
var camposDiv = document.querySelector('.camposReq');

document.getElementById('submit').addEventListener('click', async function(event) {
    event.preventDefault();
    var rota = document.getElementById('req').value;
    var qntCards = document.getElementById('qntCards').value;
    var totalTime = 0;

    var avgLabel = document.createElement('label');
    avgLabel.textContent = "Tempo médio:";
    avgLabel.className = "label";

    var avgInput = document.createElement('input');
    avgInput.type = "text";
    avgInput.className = "reqs";
    avgInput.name = "reqs";
    avgInput.readOnly = true;

    camposDiv.appendChild(avgLabel);
    camposDiv.appendChild(avgInput);

    for (let i = 0; i < qntCards; i++) {
        reqNumber++;
        var newLabel = document.createElement('label');
        newLabel.textContent = "Requisição " + reqNumber + "°:";
        newLabel.className = "label";

        var newInput = document.createElement('input');
        newInput.type = "text";
        newInput.className = "reqs";
        newInput.name = "reqs";
        newInput.readOnly = true;

        camposDiv.appendChild(newLabel);
        camposDiv.appendChild(newInput);

        var t0 = performance.now();

        await fetch(rota + '?qntCards=1', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        })
            .then(response => response.text())
            .then(data => {
                var t1 = performance.now();
                var timeTaken = t1 - t0;
                totalTime += timeTaken;
                newInput.value = timeTaken + " milissegundos.";
            })
            .catch((error) => {
                console.error('Erro:', error);
            });
    }

    var avgTime = totalTime / qntCards;
    avgInput.value = avgTime + " milissegundos.";
});
