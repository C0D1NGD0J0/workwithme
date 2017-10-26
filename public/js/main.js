"use strict";
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
$(function(){
	let socket = io(); //initialize socketIO
	let EditorClient = ot.EditorClient;
	let SocketIOAdapter = ot.SocketIOAdapter;
	let CodeMirrorAdapter = ot.CodeMirrorAdapter;
	let cmClient;
	let code = $('#code-screen').val();
	var username = $('#chatbox-username').val();
	var roomId = $('#roomId').val();

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

// Compatibility shim
// navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

peer.on('open', function(){
  $('#my-id').text(peer.id);
});

// Receiving a call
peer.on('call', function(call){
  // Answer the call automatically (instead of prompting user) for demo purposes
  call.answer(window.localStream);
  step3(call);
});

peer.on('error', function(err){
  alert(err.message);
  // Return to step 2 if error occurs
  step2();
});

// Click handlers setup
$(function(){
  $('#make-call').click(function(){
    // Initiate a call!
    var call = peer.call($('#callto-id').val(), window.localStream);
    step3(call);
  });

  $('#end-call-btn').click(function(){
    window.existingCall.close();
    step2();
  });

  // Retry if getUserMedia fails
  $('#step1-retry').click(function(){
    $('#step1-error').hide();
    step1();
  });

  // Get things started
  step1();
});

function step1 () {
  // Get audio/video stream
  navigator.getUserMedia({audio: true, video: true}, function(stream){
    // Set your video displays
    $('#my-video').prop('src', URL.createObjectURL(stream));
    window.localStream = stream;
    step2();
  }, function(){ $('#step1-error').show(); });
}

function step2 () {
  $('#step1, #step3').hide();
  $('#step2').show();
}

function step3 (call) {
  // Hang up on an existing call if present
  if (window.existingCall) {
    window.existingCall.close();
  }
  // Wait for stream on the call, then set peer video display
  call.on('stream', function(stream){
    $('#guest-video').prop('src', URL.createObjectURL(stream));
  });

  // UI stuff
  window.existingCall = call;
  $('#guest-id').text(call.peer);
  call.on('close', step2);
  $('#step1, #step2').hide();
  $('#step3').show();
}