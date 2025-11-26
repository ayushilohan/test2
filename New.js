// server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// store clients by type
let tvClient = null;
let apkClient = null;

wss.on('connection', (ws) => {
    console.log("New client connected");

    // identify client type
    ws.on('message', (msg) => {
        try {
            const data = JSON.parse(msg);

            // FIRST message from client should specify type
            if (data.type === "tv") {
                tvClient = ws;
                console.log("TV connected");
                return;
            }

            if (data.type === "apk") {
                apkClient = ws;
                console.log("APK connected");
                return;
            }

            // ROUTE COMMAND FROM APK → TV
            if (data.source === "apk") {
                console.log("Command from APK:", data.command);

                // forward to TV if connected
                if (tvClient && tvClient.readyState === WebSocket.OPEN) {
                    tvClient.send(JSON.stringify({
                        from: "server",
                        command: data.command
                    }));
                } else {
                    console.log("TV not connected");
                }
            }

        } catch (e) {
            console.log("Invalid JSON", e);
        }
    });

    ws.on('close', () => {
        if (ws === tvClient) tvClient = null;
        if (ws === apkClient) apkClient = null;
        console.log("Client disconnected");
    });
});

console.log("WebSocket Server running on ws://0.0.0.0:8080");





----
var ws = new WebSocket("ws://YOUR_SERVER_IP:8080");

ws.onopen = function () {
    ws.send(JSON.stringify({ type: "tv" }));
};

ws.onmessage = function (msg) {
    var data = JSON.parse(msg.data);
    console.log("Received from server:", data.command);

    // handle commands here
    if (data.command === "PLAY_VIDEO") {
        // perform TV action
    }
};
  
  
