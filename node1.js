// ====== NODE.JS SERVER (server.js) ======
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (client) => {
    client.on("message", (msg) => {
        wss.clients.forEach((c) => {
            if (c !== client && c.readyState === WebSocket.OPEN) {
                c.send(msg);
            }
        });
    });
});
