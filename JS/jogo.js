const grid = document.querySelector(".grid");

const CreatCard = () => {
  const card = document.createElement("div");
  const frente = document.createElement("div");
  const tras = document.createElement("div");

  card.className = 'card';
  frente.className = 'face frente';
  tras.className = 'face tras';

  card.appendChild(frente);
  card.appendChild(tras);

  grid.appendChild(card);
};

CreatCard();
