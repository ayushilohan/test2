// ====== NODE.JS SERVER (server.js) ======
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

// Mark who is TV and who is UI
let tvSocket = null;

wss.on("connection", (client) => {
    client.on("message", (msg) => {
        let data;

        try {
            data = JSON.parse(msg);
        } catch (e) {
            return;
        }

        // TV identifies itself
        if (data.type === "tv-register") {
            tvSocket = client;
            return;
        }

        // UI → Run Command
        if (data.type === "run") {
            if (tvSocket && tvSocket.readyState === WebSocket.OPEN) {
                tvSocket.send(JSON.stringify(data)); 
            }

            // Show command on UI logs immediately
            wss.clients.forEach((c) => {
                if (c.readyState === WebSocket.OPEN) {
                    c.send(JSON.stringify({
                        type: "log",
                        message: "Executing: " + data.command
                    }));
                }
            });
        }

        // TV → Log/Error output
        if (data.type === "log" || data.type === "error") {
            wss.clients.forEach((c) => {
                if (c.readyState === WebSocket.OPEN) {
                    c.send(JSON.stringify(data));
                }
            });
        }
    });
});
