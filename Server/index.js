var server = require('ws').Server;
var n = new server({port: 4100});

n.on('connection', function(ws) {
	ws.on('message', function(message) {

		message = JSON.parse(message);
		// console.log("asce: ", message.type);
		if (message.type == "naming") {
			ws.parsonName = message.data;
			n.clients.forEach(function e(client) {
				if (client != ws) {
					client.send(JSON.stringify({
						type: "dhukaorberhowa",
						name: message.data,
						data: "joined the chat."
					}));
				} else {
					client.send(JSON.stringify({
						type: "userList",
						name: message.data,
						data: n.clients.size
					}));
				}
			});
			return;
		}
		// console.log("got one message: " + message.data + " " + ws.parsonName);
		var nam = ws.parsonName;
		n.clients.forEach(function e(client) {
			// console.log(nam);
			if (client != ws) {
				client.send(JSON.stringify({
					type: "message",
					name: nam,
					data: message.data
				}));
			}
		});

		// ws.send("User1: " + message);
	});

	// ws.on('close', function() {
	// 	console.log("One more gone!");
	// 	ws.send('User1 left.');
	// });

	// console.log("Asche ekjon user");
	ws.on('close', function() {
		var nam = ws.parsonName;
		n.clients.forEach(function e(client) {
			if (client != ws) {
				client.send(JSON.stringify({
					type: "dhukaorberhowa",
					name: nam,
					data: "left the chat."
				}));
			}
		});
	});
});