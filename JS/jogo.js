/* Variáveis do jogo */
let tentativa = 0;
let cartasLevantadas = 0;
let acertos = 0;
let tempo;
let primeiraCarta = null;
let segundaCarta = null;
let timerInterval;
let numCartas = 18; // Número de cartas padrão (9 pares)

/* Seletores */
const grid = document.querySelector(".grid");
const contadorTentativas = document.querySelector("#contadorTentativas");
const contadorCartas = document.querySelector("#contadorCartas");
const contadorAcertos = document.querySelector("#contadorAcertos");
const timerDisplay = document.querySelector("#timer");

/* Lista de cores para as cartas */
const cores = [
  "red", "blue", "green", "yellow", "pink", "purple", "orange", "black", "white",
];

/* Criação de elementos HTML */
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

/* Função para virar a carta */
const virarcarta = ({ target }) => {
  const card = target.parentNode;

  if (card.classList.contains("virarcarta") || segundaCarta) return;

  cartasLevantadas++;
  atualizarContadores();

  if (!primeiraCarta) {
    primeiraCarta = card;
    card.classList.add("virarcarta");
    return;
  }

  segundaCarta = card;
  card.classList.add("virarcarta");

  tentativa++;
  atualizarContadores();

  const primeiraCor = primeiraCarta.querySelector(".frente").style.backgroundImage;
  const segundaCor = segundaCarta.querySelector(".frente").style.backgroundImage;

  if (primeiraCor === segundaCor) {
    acertos++;
    primeiraCarta = null;
    segundaCarta = null;
    atualizarContadores();

    if (acertos === numCartas / 2) {
      clearInterval(timerInterval);
      salvarScore(); // Salva o score ao finalizar
      FinalModal();
    }
  } else {
    setTimeout(() => {
      primeiraCarta.classList.remove("virarcarta");
      segundaCarta.classList.remove("virarcarta");
      primeiraCarta = null;
      segundaCarta = null;
    }, 1000);
  }
};

/* Atualização dos contadores */
const atualizarContadores = () => {
  contadorTentativas.textContent = `Tentativas: ${tentativa}`;
  contadorCartas.textContent = `Cartas levantadas: ${cartasLevantadas}`;
  contadorAcertos.textContent = `Acertos: ${acertos}`;
};

/* Timer */
const iniciarTimer = () => {
  const formatarTempo = (tempo) => {
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;
    return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
  };

  timerDisplay.textContent = `Tempo: ${formatarTempo(tempo)}`;

  timerInterval = setInterval(() => {
    tempo--;
    timerDisplay.textContent = `Tempo: ${formatarTempo(tempo)}`;

    if (tempo <= 0) {
      clearInterval(timerInterval);
      salvarScore(); // Salva o score mesmo que o jogador perca
      FinalModal();
    }
  }, 1000);
};

/* Função para criar as cartas */
const criarCarta = (cor) => {
  const card = createElement("div", "card");
  const frente = createElement("div", "face frente");
  const tras = createElement("div", "face tras");

  frente.style.backgroundImage = `url('./img/${cor}.png')`;

  card.appendChild(frente);
  card.appendChild(tras);
  card.addEventListener("click", virarcarta);

  return card;
};

/* Função para carregar o jogo */
const carregarJogo = () => {
  const coresEscolhidas = cores.slice(0, numCartas / 2); // Seleciona as cores necessárias para os pares
  const pares = [...coresEscolhidas, ...coresEscolhidas]; // Duplica as cores para criar os pares
  const cartasEmbaralhadas = pares.sort(() => Math.random() - 0.5); // Embaralha as cartas

  cartasEmbaralhadas.forEach((cor) => {
    const carta = criarCarta(cor);
    grid.appendChild(carta);
  });

  iniciarTimer();
};

/* Função para salvar o score no LocalStorage */
const salvarScore = () => {
  const score = {
    player: localStorage.getItem("player") || "Desconhecido",
    tentativas: tentativa,
    tempoRestante: timerDisplay.textContent,
    acertos: acertos,
    dificuldade: numCartas === 12 ? "Fácil" : numCartas === 14 ? "Médio" : "Difícil",
  };

  // Recuperar os scores existentes ou criar um array vazio
  let scores = JSON.parse(localStorage.getItem("scores")) || [];

  // Adicionar o novo score
  scores.push(score);

  // Salvar novamente no LocalStorage
  localStorage.setItem("scores", JSON.stringify(scores));
};

/* Modal de final de jogo */
const FinalModal = () => {
  const mensagem = acertos === numCartas / 2
    ? `Parabéns! Você finalizou o jogo!\nTentativas: ${tentativa}\nTempo restante: ${timerDisplay.textContent}\nAcertos: ${acertos}`
    : `Que pena! Você não conseguiu!\nTentativas: ${tentativa}\nTempo restante: ${timerDisplay.textContent}\nAcertos: ${acertos}`;

  alert(mensagem);

  while (true) {
    const resposta = prompt("Deseja jogar novamente? (S/N)").toUpperCase();

    if (resposta === "S") {
      location.reload();
      break;
    } else if (resposta === "N") {
      break;
    } else {
      alert("Opção inválida! Por favor, insira 'S' para sim ou 'N' para não.");
    }
  }
};

/* Seleção de dificuldade */
const selecionarDificuldade = () => {
  while (true) {
    const dificuldade = prompt(
      "Escolha a dificuldade: Fácil (F), Médio (M), Difícil (D)"
    ).toUpperCase();

    if (dificuldade === "F") {
      tempo = 300;
      numCartas = 12; // 6 pares
      break;
    } else if (dificuldade === "M") {
      tempo = 180;
      numCartas = 14; // 7 pares
      break;
    } else if (dificuldade === "D") {
      tempo = 60;
      numCartas = 18; // 9 pares
      break;
    } else {
      alert("Opção inválida! Por favor, insira F, M ou D.");
    }
  }
};

/* Inicialização */
selecionarDificuldade();
carregarJogo();
