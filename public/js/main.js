"use strict";
$(function(){
	
	let socket = io(); //initialize socketIO
	console.log('Connected(frontend)');

	let username = $('#chatbox-username').val();
	console.log("Current logged in user is: ", username);
	
	if(username === "" || username === 'undefined'){
		let userID = Math.floor(Math.random() * 9999).toString();
		username = "Guest-User " + userID;
		$('#chatbox-username').text(username);
	}

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

	let sendMessage = function(){
		let userMsg = $('#user-message').val();
		socket.emit('chatMessage', {username, userMsg});
		$('#user-message').val();
	}

	socket.on('chatMessage', function(data){
		$('#chatbox-messages').append(html(data.username, data.userMsg));
	})
});