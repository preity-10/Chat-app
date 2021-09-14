const socket = io('http://localhost:8000');
// client-side
// const io = require("socket.io-client");
// const socket = io("http://localhost:8000", {
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "abcd"
//   }
// });


const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');

const append = (message,position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left'){
        audio.play();
    }
}

const append_center = (message,position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('center');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);  
    audio.play() ;
}

form.addEventListener('submit',(e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
})

const name = prompt("Enter your name to join")
socket.emit('new-user-joined', name)

socket.on('user-joined', name=>{
    append_center(`${name} joined the chat`, 'center');
})

socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`,'left');
})

socket.on('leave', name=>{
    append_center(`${name } left the chat`,'center');
})
