const input = document.querySelector('.Login_name'); 
const button = document.querySelector('.Login_botão');
const form = document.querySelector('.Login-Form');

const validateInput = ({ target }) => {
  if (target.value.length > 2) {
    button.removeAttribute('disabled');
    return;
  }
  button.setAttribute('disabled', ''); 
};

const handleSubmit = (event) => {
  event.preventDefault();
  
  // Corrigido para salvar como "player"
  localStorage.setItem('player', input.value);
  window.location = 'jogo.html'; // Redireciona para o jogo
};

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
