"use strict";
const ot = require('ot');
const roomList = {};
const mongoose = require('mongoose');
const Project = mongoose.model('Project');

module.exports = function(io){
	let dummyText = "This is a markdown heading";

	io.on('connection', (socket) =>{
		console.log('Connected(backend)');

		socket.on('joinRoom', function(data){
			if(!roomList[data.room]){
				let socketIOServer = new ot.EditorSocketIOServer(dummyText, [], data.room, function(socket, cb){
					let self = this;
					Project.findByIdAndUpdate(data.room, {content: self.document}, function(err){
						if(err) return cb(false);
						cb(true);
					});
				});
				roomList[data.room] = socketIOServer;
			}
			roomList[data.room].addClient(socket);
			roomList[data.room].setName(socket, data.username);

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