let tentativa = 0;
let cartasLevantadas = 0;
let acertos = 0;
let tempo; // Tempo ajustado pela dificuldade
let primeiraCarta = null;
let segundaCarta = null;
let timerInterval;

const grid = document.querySelector(".grid");
const contadorTentativas = document.querySelector("#contadorTentativas");
const contadorCartas = document.querySelector("#contadorCartas");
const contadorAcertos = document.querySelector("#contadorAcertos");
const timerDisplay = document.querySelector("#timer");

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
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

const virarcarta = ({ target }) => {
  const card = target.parentNode;

  if (card.classList.contains('virarcarta')) return;

  cartasLevantadas++;
  atualizarContadores();

  if (!primeiraCarta) {
    primeiraCarta = card;
    card.classList.add('virarcarta');
    return;
  }

  if (!segundaCarta) {
    segundaCarta = card;
    card.classList.add('virarcarta');

    tentativa++;
    atualizarContadores();

    if (
      primeiraCarta.querySelector('.frente').style.backgroundImage ===
      segundaCarta.querySelector('.frente').style.backgroundImage
    ) {
      acertos++;
      primeiraCarta = null;
      segundaCarta = null;
      atualizarContadores();
    } else {
      setTimeout(() => {
        primeiraCarta.classList.remove('virarcarta');
        segundaCarta.classList.remove('virarcarta');
        primeiraCarta = null;
        segundaCarta = null;
      }, 1000);
    }
  }
};

const atualizarContadores = () => {
  contadorTentativas.textContent = `Tentativas: ${tentativa}`;
  contadorCartas.textContent = `Cartas levantadas: ${cartasLevantadas}`;
  contadorAcertos.textContent = `Acertos: ${acertos}`;
};

const iniciarTimer = () => {
  timerDisplay.textContent = `Tempo: ${tempo}s`;
  timerInterval = setInterval(() => {
    tempo--;
    timerDisplay.textContent = `Tempo: ${tempo}s`;

    if (tempo == 0) {
      pararTimer();
      alert("Tempo esgotado! Tente novamente.");
      location.reload(); // Reinicia o jogo
    }
  }, 1000);
};

const pararTimer = () => {
  clearInterval(timerInterval);
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

  aleatorio.forEach(cor => {
    grid.appendChild(CreateCard(cor));
  });

  iniciarTimer();
};

// Função para selecionar dificuldade
const selecionarDificuldade = () => {
  const dificuldade = prompt("Escolha a dificuldade: Fácil (F), Médio (M), Difícil (D)").toUpperCase();

  if (dificuldade === "F") {
    tempo = 40;
  } else if (dificuldade === "M") {
    tempo = 30;
  } else if (dificuldade === "D") {
    tempo = 20;
  } else {
    alert("Opção inválida. O jogo será iniciado no modo Fácil.");
    tempo = 40;
  }

  LoadGame();
};

selecionarDificuldade();
