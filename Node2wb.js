const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {

    ws.type = "unknown";

    ws.on('message', (msg) => {
        msg = msg.toString();
        console.log("Received:", msg);

        // Client registering types
        if (msg === "apk") {
            ws.type = "apk";
            console.log("APK connected");
            return;
        }

        if (msg === "tv") {
            ws.type = "tv";
            console.log("TV connected");
            return;
        }

        // If APK sent a command string → send to TV
        if (ws.type === "apk") {
            wss.clients.forEach((client) => {
                if (client.readyState === 1 && client.type === "tv") {
                    client.send(msg);   // sending raw command like "home,true"
                }
            });
        }
    });
});
