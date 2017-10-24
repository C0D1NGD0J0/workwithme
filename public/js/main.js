"use strict";
$(function(){
	let socket = io(); //initialize socketIO
	console.log('Connected(frontend)');

	let username = $('#chatbox-username').val();
	let roomId = $('#roomId').val();

	if(username === "" || username === 'undefined'){
		let userID = Math.floor(Math.random() * 9999).toString();
		username = "Guest-User " + userID;
		$('#chatbox-username').text(username);
	}

	socket.emit('joinRoom', {room: roomId});

	let html = function(name, msg){
		return(`
			<li class="media">
				<div class="media-body">
					<b>${name}: </b> ${msg}
				</div>
				<hr>
			</li>
		`);
	};

	let sendMsgBtn = document.querySelector('#sendMsg-btn');
	sendMsgBtn.addEventListener('click', function(){
		let userMsg = $('#user-message').val();
		socket.emit('chatMessage', {username, userMsg});
		$('#user-message').val('');
	});

	socket.on('chatMessage', function(data){
		$('#chatbox-messages').append(html(data.username, data.userMsg));
	});
});