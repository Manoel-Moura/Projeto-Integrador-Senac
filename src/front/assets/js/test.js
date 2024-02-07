
//Para fazer funcionar a barra de pesquisa da página home.html
document.getElementById('barra-pesquisa').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        let input = document.getElementById('barra-pesquisa');
        let filter = input.value.toUpperCase();
        let cards = document.getElementsByClassName('card');

        for (let i = 0; i < cards.length; i++) {
            let btnReceita = cards[i].getElementsByClassName('btn-receita')[0];
            let txtValue = btnReceita.textContent || btnReceita.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                cards[i].style.display = "";
            } else {
                cards[i].style.display = "none";
            }
        }
    }
});

