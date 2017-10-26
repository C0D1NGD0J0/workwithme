"use strict";
$(function(){
	let socket = io(); //initialize socketIO
	let EditorClient = ot.EditorClient;
	let SocketIOAdapter = ot.SocketIOAdapter;
	let CodeMirrorAdapter = ot.CodeMirrorAdapter;
	let cmClient;
	let code = $('#code-screen').val();

	console.log('Connected(frontend)');

	let editor = CodeMirror.fromTextArea(document.querySelector('#code-screen'), {
		lineNumbers: true,
		theme: "monokai"
	});

	function init(str, revision, clients, serverAdapter){
		if(!code){
			editor.setValue(str);
		}
		cmClient = window.cmClient = new EditorClient(
			revision, clients, serverAdapter, new CodeMirrorAdapter(editor)
		);
	};

	socket.on('doc', function(obj){
		init(obj.str, obj.revision, obj.clients, new SocketIOAdapter(socket));
	});

	let username = $('#chatbox-username').val();
	let roomId = $('#roomId').val();

	if(username === "" || username === 'undefined'){
		let userID = Math.floor(Math.random() * 9999).toString();
		username = "Guest-User " + userID;
		$('#chatbox-username').text(username);
	}

	socket.emit('joinRoom', {room: roomId, username});

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