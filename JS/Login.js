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
  
  localStorage.setItem('player', input.value);
  window.location = 'jogo.html';
};

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
