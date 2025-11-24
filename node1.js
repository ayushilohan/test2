var WebSocket = require('ws');
var wss = new WebSocket.Server({ port: 8080 });

console.log("Relay running on ws://0.0.0.0:8080");

wss.on('connection', function (ws) {

    ws.on('message', function (raw) {
        try {
            var data = JSON.parse(raw.toString());

            if (data.type === "log") {
                console.log(" LOG  →", data.message);
                return;
            }
            if (data.type === "error") {
                console.log(" ERR  →", data.message);
                return;
            }
            if (data.type === "result") {
                console.log(" RES  →", data.result);
                return;
            }

            // forward UI commands to TV
            wss.clients.forEach(function (c) {
                if (c !== ws && c.readyState === WebSocket.OPEN) {
                    c.send(raw.toString());
                }
            });

        } catch (e) {
            console.log("RAW →", raw.toString());
        }
    });
});
