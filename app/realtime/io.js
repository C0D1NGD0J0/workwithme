module.exports = function(io){
	io.on('connection', (socket) =>{
		console.log('Connected(backend).');

		socket.on('chatMessage', function(data){
			io.emit('chatMessage', data);
		});
	});
};