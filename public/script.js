var socket = io();

// Get DOM elements
let btn = document.getElementById('btn');
let inputMsg = document.getElementById('newmsg');
let msgList = document.getElementById('msglist');

// Emit message when button is clicked
btn.onclick = function exec() {
    const message = inputMsg.value;
    if (message.trim() !== '') { // Ensure input is not empty
        socket.emit('msg_send', { msg: message }); // Emit the message
        inputMsg.value = ''; // Clear input field
    }
};

// Receive message from server
socket.on('msg_rcvd', (data) => {
    let limsg = document.createElement('li');
    limsg.innerText = data.msg;

    // Check if the message is from this client or others
    if (data.id === socket.id) {
        limsg.style.color = 'blue'; // Message from this client (current user)
        limsg.innerText += ' (You)'; // Label message as 'You'
    } else {
        limsg.style.color = 'green'; // Message from other clients
        limsg.innerText += ` (User:)`; // Show sender's socket ID
    }

    msgList.appendChild(limsg); // Add the message to the list
});
