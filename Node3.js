// server.js
const WebSocket = require("ws");
const readline = require("readline");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("TV connected");

    // Read commands from terminal at runtime
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("line", function (input) {
        ws.send(JSON.stringify({
            cmd: "exec",
            code: input     // whatever you type, TV will execute
        }));
    });

    ws.on("message", (msg) => console.log("TV →", msg.toString()));
});
