// Seleciona a div lista-categorias
const listaCat = document.getElementById('lista-categorias');


// Adiciona um ouvinte de evento para detectar o movimento de rolagem na div
listaCat.addEventListener('wheel', function(event) {
  // Impede o comportamento padrão de rolagem
  event.preventDefault();
  
  // Verifica a direção do movimento da roda do mouse
  if (event.deltaY !== 0) {
    // Rola na direção horizontal (eixo x) baseada na direção do movimento da roda do mouse
    listaCat.scrollLeft += event.deltaY;
  }
});