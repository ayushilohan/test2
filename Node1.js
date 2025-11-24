const WebSocket = require('ws');

const DEBUG_URL = "ws://<tv-ip>:<port>/devtools/page/1";

const ws = new WebSocket(DEBUG_URL);

// Helper to execute JS inside TV app
function runJS(expression) {
    ws.send(JSON.stringify({
        id: Date.now(),
        method: "Runtime.evaluate",
        params: { expression }
    }));
}

ws.on('open', () => {
    console.log("Connected");

    ws.send(JSON.stringify({
        id: 1,
        method: "Runtime.enable"
    }));

    // Test Web API
    runJS("document.title");  
    runJS("localStorage.getItem('name')");
    runJS("window.innerWidth");
    runJS("navigator.userAgent");
});

ws.on('message', (msg) => {
    console.log("Received:", msg.toString());
});

ws.on('error', (err) => {
    console.log("Error:", err);
});

ws.on('close', () => {
    console.log("Closed");
});
