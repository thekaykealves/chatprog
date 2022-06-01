// front-end
const socket = io('http://localhost:3000');

let user = null;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#message_form');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if(!user) {
        alert('Você precisa definir o seu nome!')
        return
      }
  
      const message = document.forms['message_form_name']['msg'].value;
      document.forms['message_form_name']['msg'].value = '';

      socket.emit('new_message', { user: user, msg: message });
    })
  }

  const userForm = document.getElementById('user_form');
  if(userForm){
    userForm.addEventListener('submit', () => {

      user = document.forms['user_form_name']['user'].value; 
      userForm.parentNode.removeChild(userForm);

    })
  }
})

socket.on('output_messages', (data) => {
  const divMessages = document.querySelector('#messages');
  if(divMessages){
    document.querySelector('#messages').innerHTML = '';
  }

  // verificar se existe alguma mensagem
  if(data.length > 0){
    data.forEach(message => {
      updateMessagesOnScreen(message.user, message.msg);
    })
  }
})

function updateMessagesOnScreen(user, message){
  const divMessages = document.querySelector('#messages');
  if(divMessages){
    const msg = `<div><span>${user}:</span> ${message}</div>`
  
    divMessages.innerHTML += msg;
  }
}