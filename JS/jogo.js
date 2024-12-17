/*aqui seria as "Variaveis" das infos */
let tentativa = 0;
let cartasLevantadas = 0;
let acertos = 0;
let tempo;
let primeiraCarta = null;
let segundaCarta = null;
let timerInterval;

/*aqui entra nos coisa para criar as cartas
se me lembrar faço outros comentarios melhores*/
const grid = document.querySelector(".grid");
const contadorTentativas = document.querySelector("#contadorTentativas");
const contadorCartas = document.querySelector("#contadorCartas");
const contadorAcertos = document.querySelector("#contadorAcertos");
const timerDisplay = document.querySelector("#timer");
const resltado = document.querySelector("#modal");


/* Aqui ele chama a frente dea carta para o seu respequitivo nome */
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

/* Aqui vira as cartas e compara se é o msm par */
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

/* Aqui ele Atualiza os contadores de a cordo com a const acima */
const atualizarContadores = () => {
  contadorTentativas.textContent = `Tentativas: ${tentativa}`;
  contadorCartas.textContent = `Cartas levantadas: ${cartasLevantadas}`;
  contadorAcertos.textContent = `Acertos: ${acertos}`;
};

/*Aqui ele cria, inicia e atualiza o timer, */
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
      tempo;
      clearInterval(timerInterval);
      timerDisplay.textContent = `Tempo: ${formatarTempo(tempo)}`;
      FinalModal();

      
    }else if (acertos == 9) {/* Se eu alterar aqui, Não Posso esquecer de trocar aqui é o controle do prompt final
      de quando ele aparece*/
      tempo;
      clearInterval(timerInterval);
      timerDisplay.textContent = `Tempo: ${formatarTempo(tempo)}`;
      FinalModal();
    };
  }, 1000);
  
}

/*Aqui para o timer, //Bem inutio para ser sincero ksk*/ 
const pararTimer = () => {
  clearInterval(timerInterval);
};

/*Aqui ele cria as cartas */
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
/* aqui ele cria a const do jogo para iniciar ele */
const LoadGame = () => {
  const duplicateCors = [...cors, ...cors];
  const aleatorio = duplicateCors.sort(() => Math.random() - 0.5);

  aleatorio.forEach((cor) => {
    grid.appendChild(CreateCard(cor));
  });

  iniciarTimer();
};

/*Não funcionou aparentemente, Não esquecer de arrumar */
const FinalModal = () => {

  const score = {
    player: localStorage.getItem('palyer') || 'Desconhecido',
    tentativas: `Tentativas: ${tentativa}`,
    tempoRestante: timerDisplay.textContent,
    acertos: acertos
  };
  
  // Recuperar os scores existentes ou criar um array vazio
  let scores = JSON.parse(localStorage.getItem('scores')) || [];
  
  // Adicionar o novo score
  scores.push(score);
  
  // Salvar novamente no LocalStorage
  localStorage.setItem('scores', JSON.stringify(scores));
  

  const mensagem = `
  Parabéns! Você finalizou o jogo!
  Tentativas: ${tentativa}
  Tempo restante: ${timerDisplay.textContent}
  Acertos: ${acertos}
  `; 

  const mensagemP = `
  Que pena! Você Não conseguiu!
  Tentativas: ${tentativa}
  Tempo restante: ${timerDisplay.textContent}
  Acertos: ${acertos}
  `; 



     if(acertos == 9){
  alert(mensagem);
} else if (tempo == 0){
  alert(mensagemP)
}
  while (true) {
    const resposta = prompt("Deseja jogar novamente? (S/N) E para Score").toUpperCase();

    if (resposta === "S") {
      alert("Você escolheu jogar novamente!");
      location.reload();
      break;
    } else if (resposta === "N") {
      // window.open("https://github.com/Medeirosvdd/JogoDaMemoria");
      break;
    } else if (resposta === "E") {
      window.open("score.html");
      break;
    } else {
      alert("Opção inválida! Por favor, insira 'S' para sim ou 'N' para não.");
    }
  }
};


const selecionarDificuldade = () => {
  

  while (true) {
    const dificuldade = prompt(
      "Escolha a dificuldade: Fácil (F), Médio (M), Difícil (D)"
    ).toUpperCase();
  
    
    if (dificuldade === "F") {
      alert("Voce escolheu a dificuldade facil!");
     tempo = 300;
  break;  
    } else if (dificuldade === "M") {
      alert("Voce escolheu a dificuldade Média!");
     tempo = 180;
  break;  
    } else if (dificuldade === "D") {
      alert("Voce escolheu a dificuldade Dificil!");
     tempo = 60;
  break;  
    } else if (dificuldade === "T") {
      alert("Voce escolheu a dificuldade Dificil!");
     tempo = 3;
  break;  
} else {
  alert("Opção inválida! Por favor, insira ainformação correta.");
}
}	

};

LoadGame();

/* Aqui ele chama a const selecionar dificuldade para iniciar o mesmo */
selecionarDificuldade();



