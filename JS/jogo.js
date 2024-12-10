const grid = document.querySelector(".grid");

const cors = [
  'red',
  'blue',
  'green',
  'yellow',
  'pink',
  'purple',
  'orange',
  'black',
  'white',
  'gray',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let primeiraCarta = null;
let segundaCarta = null;

const virarcarta = ({ target }) => {
  const card = target.parentNode;

  // Se a carta já está virada, ignora
  if (card.classList.contains('virarcarta')) return;

  // Virar a primeira carta
  if (!primeiraCarta) {
    primeiraCarta = card;
    card.classList.add('virarcarta');
    return;
  }

  // Virar a segunda carta
  if (!segundaCarta) {
    segundaCarta = card;
    card.classList.add('virarcarta');

    // Verificar se são iguais
    if (
      primeiraCarta.querySelector('.frente').style.backgroundImage ===
      segundaCarta.querySelector('.frente').style.backgroundImage
    ) {
      // Mantém as cartas viradas se forem iguais
      primeiraCarta = null;
      segundaCarta = null;
    } else {
      // Se não forem iguais, vira de volta após 1 segundo
      setTimeout(() => {
        primeiraCarta.classList.remove('virarcarta');
        segundaCarta.classList.remove('virarcarta');
        primeiraCarta = null;
        segundaCarta = null;
      }, 1000);
    }
  }
};

const CreateCard = (cor) => {
  const card = createElement('div', 'card');
  const frente = createElement('div', 'face frente');
  const tras = createElement('div', 'face tras');

  frente.style.backgroundImage = `url('./img/${cor}.png')`;

  card.appendChild(frente);
  card.appendChild(tras);

  card.addEventListener('click', virarcarta);

  return card;
};

const LoadGame = () => {
  const duplicateCors = [...cors, ...cors];
  const aleatorio = duplicateCors.sort(() => Math.random() - 0.5);

  aleatorio.forEach((cor) => {
    const card = CreateCard(cor);
    grid.appendChild(card);
  });
};

LoadGame();
