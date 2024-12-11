
let tentativa = 0;
let cartasLevantadas = 0;
let acertos = 0; // Contador de acertos
let tempo = 0; // Timer
let primeiraCarta = null;
let segundaCarta = null;
let timerInterval; // Armazena o intervalo do timer

const grid = document.querySelector(".grid");
const contadorTentativas = document.querySelector("#contadorTentativas");
const contadorCartas = document.querySelector("#contadorCartas");
const contadorAcertos = document.querySelector("#contadorAcertos");
const timerDisplay = document.querySelector("#timer"); // Exibição do timer

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

  // Se a carta já está virada, ignora
  if (card.classList.contains('virarcarta')) return;

  cartasLevantadas++;
  atualizarContadores();

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

    // Contabilizar tentativa após virar a segunda carta
    tentativa++;
    atualizarContadores();

    // Verificar se as duas cartas são iguais
    if (
      primeiraCarta.querySelector('.frente').style.backgroundImage ===
      segundaCarta.querySelector('.frente').style.backgroundImage
    ) {
      // Se forem iguais, incrementa o contador de acertos
      acertos++;
      primeiraCarta = null;
      segundaCarta = null;
      atualizarContadores();
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

// Função para atualizar os contadores
const atualizarContadores = () => {
  contadorTentativas.textContent = `Tentativas: ${tentativa}`;
  contadorCartas.textContent = `Cartas levantadas: ${cartasLevantadas}`;
  contadorAcertos.textContent = `Acertos: ${acertos}`;
};

// Função para iniciar o timer
const iniciarTimer = () => {
  tempo = 0; // Reseta o tempo
  timerDisplay.textContent = `Tempo: 0s`;

  timerInterval = setInterval(() => {
    tempo++;
    timerDisplay.textContent = `Tempo: ${tempo}s`;
  }, 1000);
};

// Função para parar o timer
const pararTimer = () => {
  clearInterval(timerInterval);
};

// Função para verificar se o jogo foi concluído
const verificarJogoConcluido = () => {
  const totalCartas = grid.querySelectorAll('.card').length;
  const cartasViradas = grid.querySelectorAll('.virarcarta').length;
  if (cartasViradas === totalCartas) {
    pararTimer(); // Para o timer ao completar o jogo
    alert(`Jogo concluído! Acertos: ${acertos}, Tempo: ${tempo}s`);
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

  aleatorio.forEach(cor => {
    grid.appendChild(CreateCard(cor));
  });

  // Iniciar o timer quando o jogo começar
  iniciarTimer();
};

// Chama a função para carregar o jogo
LoadGame();


