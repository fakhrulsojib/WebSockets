var server = require('ws').Server;
var n = new server({port: 4100});

n.on('connection', function(ws) {
	ws.on('message', function(message) {

		let date_ob = new Date();
		let date = ("0" + date_ob.getDate()).slice(-2);
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		let year = date_ob.getFullYear();
		let hours = ("0" + date_ob.getHours()).slice(-2);
		let minutes = ("0" + date_ob.getMinutes()).slice(-2);
		let seconds = ("0" + date_ob.getSeconds()).slice(-2);

		message = JSON.parse(message);
		// console.log("asce: ", message.type);
		if (message.type == "naming") {
			ws.parsonName = message.data;
			n.clients.forEach(function e(client) {
				if (client != ws) {
					client.send(JSON.stringify({
						date: date,
						month: month,
						year: year,
						hours: hours,
						minutes: minutes,
						seconds: seconds,
						type: "dhukaorberhowa",
						name: message.data,
						data: "joined the chat."
					}));
				} else {
					client.send(JSON.stringify({
						date: date,
						month: month,
						year: year,
						hours: hours,
						minutes: minutes,
						seconds: seconds,
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
					date: date,
					month: month,
					year: year,
					hours: hours,
					minutes: minutes,
					seconds: seconds,
					type: "message",
					name: nam,
					data: message.data
				}));
			} else {
				client.send(JSON.stringify({
					date: date,
					month: month,
					year: year,
					hours: hours,
					minutes: minutes,
					seconds: seconds,
					type: "message",
					name: "Me",
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