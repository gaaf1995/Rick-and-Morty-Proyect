const characterContainer = document.getElementById('character-container');
const apiUrl = 'https://rickandmortyapi.com/api/character/';
let page = 1;

async function fetchCharacters(page) {
  const response = await fetch(`${apiUrl}?page=${page}`);
  const data = await response.json();
  return data.results;
}

async function loadCharacters() {
  const characters = await fetchCharacters(page);
  page++;

  characters.forEach(async character => {
    const characterElement = document.createElement('div');
    characterElement.classList.add('character');
    characterElement.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="${character.name}">
      <div class="character-info">
        <!-- Aquí se mostrará la información adicional -->
      </div>
    `;

   // Evento de mouse para cambiar el color del fondo
   characterElement.addEventListener('mouseover', () => {
    characterElement.style.backgroundColor = '#02afc5';
  });

  characterElement.addEventListener('mouseout', () => {
    characterElement.style.backgroundColor = '';
  });
  
    characterContainer.appendChild(characterElement);

    // Obtener información adicional y actualizar el menú desplegable
    const infoContainer = characterElement.querySelector('.character-info');
    const response = await fetch(character.url);
    const characterInfo = await response.json();

    // Actualizar el contenido del menú desplegable
    infoContainer.innerHTML = `
      <p>Status: ${characterInfo.status}</p>
      <p>Species: ${characterInfo.species}</p>
      <p>Location: ${character.location.name}</p>
    `;
  });
}

loadCharacters();

// Detectar el scroll y cargar más personajes cuando sea necesario
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    loadCharacters();
  }
});