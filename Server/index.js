var server = require('ws').Server;
var n = new server({port: 4100});

n.on('connection', function(ws) {
	ws.on('message', function(message) {
		console.log("got one message: " + message);
		ws.send("User1: " + message);
	});

	ws.on('close', function() {
		console.log("One more gone!");
		ws.send('User1 left.');
	});

	console.log("Asche ekjon user");
	ws.send('User1 has joined the chat!');
	// ws.on('close', function() {
	// 	console.log("");
	// 	ws.send('');
	// });
});