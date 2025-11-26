var ws;

function connectWS() {
    ws = new WebSocket("ws://YOUR_SERVER_IP:8080");

    ws.onopen = function () {
        ws.send("tv");   // register type
    };

    ws.onmessage = function (e) {
        var msg = e.data;  
        console.log("Command received:", msg);

        // split if contains boolean
        var parts = msg.split(",");
        var command = parts[0];       // "home"
        var state = parts[1];         // true/false (optional)

        // TODO: perform action
        console.log("Command:", command, "State:", state);
    };
}

window.onload = connectWS;
