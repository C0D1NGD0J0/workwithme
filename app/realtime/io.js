module.exports = function(io){
	io.on('connection', (socket) =>{
		console.log('Connected(backend).');

		socket.on('joinRoom', function(data){
			socket.room = data.room;
			socket.join(data.room);
		});

		socket.on('chatMessage', function(data){
			io.to(socket.room).emit('chatMessage', data);
		});

		socket.on('disconnect', function(){
			socket.leave(socket.room);
		});
	});
};