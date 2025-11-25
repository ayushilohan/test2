const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let tvClient = null;
let apkClient = null;

wss.on('connection', ws => {
    ws.on('message', msg => {
        msg = msg.toString();

        if (msg === "APK_CONNECTED") {
            apkClient = ws;
            return;
        }

        if (msg === "TV_CONNECTED") {
            tvClient = ws;
            return;
        }

        if (ws === apkClient && tvClient) {
            tvClient.send(msg);
        }

        if (ws === tvClient && apkClient) {
            apkClient.send(msg);
        }
    });

    ws.on('close', () => {
        if (ws === apkClient) apkClient = null;
        if (ws === tvClient) tvClient = null;
    });
});

console.log("Server running on ws://0.0.0.0:8080");
