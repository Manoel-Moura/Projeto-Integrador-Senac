let reqNumber = 0;
const camposDiv = document.querySelector('.camposReq');

document.getElementById('myForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const rota = document.getElementById('req').value;
    const qntCards = document.getElementById('qntCards').value || 1;
    let totalTime = 0;

    const avgLabel = document.createElement('label');
    const avgInput = document.createElement('input');
    avgInput.type = "text";
    avgInput.className = "reqs";
    avgInput.name = "reqs";
    avgInput.readOnly = true;

    if (rota === '/createCardTest') {
        avgLabel.textContent = "Tempo médio:";
        avgLabel.className = "label";
        camposDiv.prepend(avgInput);
        camposDiv.prepend(avgLabel);
    }

    for (let i = 0; i < qntCards; i++) {
        reqNumber++;
        const newLabel = document.createElement('label');
        newLabel.textContent = `Requisição ${reqNumber}°:`;
        newLabel.className = "label";

        const newInput = document.createElement('input');
        newInput.type = "text";
        newInput.className = "reqs";
        newInput.name = "reqs";
        newInput.readOnly = true;

        camposDiv.appendChild(newLabel);
        camposDiv.appendChild(newInput);

        const t0 = performance.now();

        await fetch(`${rota}${rota === '/createCardTest' ? '?qntCards=1' : ''}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.text())
            .then(data => {
                const t1 = performance.now();
                const timeTaken = t1 - t0;
                totalTime += timeTaken;
                newInput.value = `${timeTaken} milissegundos.`;
                // newInput.value = `${timeTaken.toFixed(5)} milissegundos.`;
            })
            .catch((error) => {
                console.error('Erro:', error);
            });
    }

    if (rota === '/createCardTest') {
        const avgTime = totalTime / qntCards;
        avgInput.value = `${avgTime} milissegundos.`;
        // avgInput.value = `${avgTime.toFixed(5)} milissegundos.`;
    }
});
