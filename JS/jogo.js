let tentativa = 0;
let cartasLevantadas = 0;
let acertos = 0;
let tempo;
let primeiraCarta = null;
let segundaCarta = null;
let timerInterval;

const grid = document.querySelector(".grid");
const contadorTentativas = document.querySelector("#contadorTentativas");
const contadorCartas = document.querySelector("#contadorCartas");
const contadorAcertos = document.querySelector("#contadorAcertos");
const timerDisplay = document.querySelector("#timer");
const resltado = document.querySelector("#modal");

const cors = [
  "red",
  "blue",
  "green",
  "yellow",
  "pink",
  "purple",
  "orange",
  "black",
  "white",
  /* 9 cartas */
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

const virarcarta = ({ target }) => {
  const card = target.parentNode;

  if (card.classList.contains("virarcarta")) return;

  cartasLevantadas++;
  atualizarContadores();

  if (!primeiraCarta) {
    primeiraCarta = card;
    card.classList.add("virarcarta");
    return;
  }

  if (!segundaCarta) {
    segundaCarta = card;
    card.classList.add("virarcarta");

    tentativa++;
    atualizarContadores();

    if (
      primeiraCarta.querySelector(".frente").style.backgroundImage ===
      segundaCarta.querySelector(".frente").style.backgroundImage
    ) {
      acertos++;
      primeiraCarta = null;
      segundaCarta = null;
      atualizarContadores();
    } else {
      setTimeout(() => {
        primeiraCarta.classList.remove("virarcarta");
        segundaCarta.classList.remove("virarcarta");
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
  const formatarTempo = (tempo) => {
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
  };

  timerDisplay.textContent = `Tempo: ${formatarTempo(tempo)}`;

  timerInterval = setInterval(() => {
    tempo--;
    timerDisplay.textContent = `Tempo: ${formatarTempo(tempo)}`;

    if (tempo <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "Tempo: 00:00";


      
    }else if (acertos == 1) {
      FinalModal();
      tempo;
      clearInterval(timerInterval);
      timerDisplay.textContent = `Tempo: ${formatarTempo(tempo)}`;
    };
  }, 1000);
  
}


const pararTimer = () => {
  clearInterval(timerInterval);
};

const CreateCard = (cor) => {
  const card = createElement("div", "card");
  const frente = createElement("div", "face frente");
  const tras = createElement("div", "face tras");

  frente.style.backgroundImage = `url('./img/${cor}.png')`;

  card.appendChild(frente);
  card.appendChild(tras);
  card.addEventListener("click", virarcarta);

  return card;
};

const LoadGame = () => {
  const duplicateCors = [...cors, ...cors];
  const aleatorio = duplicateCors.sort(() => Math.random() - 0.5);

  aleatorio.forEach((cor) => {
    grid.appendChild(CreateCard(cor));
  });

  iniciarTimer();
};


const mensagem = `
Parabéns! Você finalizou o jogo!
Tentativas: ${tentativa}
Tempo restante: ${timerDisplay.textContent}
Acertos: ${acertos}

`;

const FinalModal = () => {
  const Modal2 = prompt(mensagem).toUpperCase();
  

  while (true) {
    resposta = prompt("Deseja jogar novamente? (S/N)").toUpperCase();
    
    if (resposta === "S") {
      alert("Você escolheu jogar novamente!");
      location.reload();
      break;  
    } else if (resposta === "N") {
      window.open("https://github.com/Medeirosvdd/JogoDaMemoria");  
      break;  
    } else {
      alert("Opção inválida! Por favor, insira 'S' para sim ou 'N' para não.");
    }
  }	
  
};

const selecionarDificuldade = () => {
  const dificuldade = prompt(
    "Escolha a dificuldade: Fácil (F), Médio (M), Difícil (D)"
  ).toUpperCase();

  if (dificuldade === "F") {
    tempo = 300;
  } else if (dificuldade === "M") {
    tempo = 180;
  } else if (dificuldade === "D") {
    tempo = 60;
  } else {
    alert("Opção inválida. O jogo não será iniciado.");
    const dificuldade = prompt(
      "Escolha a dificuldade: Fácil (F), Médio (M), Difícil (D)"
    ).toUpperCase();
    if (dificuldade === "F") {
      tempo = 900;
    } else if (dificuldade === "M") {
      tempo = 600;
    } else if (dificuldade === "D") {
      tempo = 360;
    } else {
      alert("Opção inválida. O jogo não será iniciado.");
      const dificuldade = prompt(
        "Escolha a dificuldade: Fácil (F), Médio (M), Difícil (D)"
      ).toUpperCase();
    }
  }



  

  LoadGame();
};

selecionarDificuldade();



