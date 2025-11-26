<!DOCTYPE html>
<html>
<head>
    <title>Tizen Command + Logs UI</title>
    <style>
        #logs {
            width: 100%;
            height: 350px;
            overflow-y: auto;
            background: #000;
            color: #0f0;
            padding: 10px;
            font-family: monospace;
            font-size: 14px;
            border: 1px solid #333;
            margin-top: 10px;
        }
        #status {
            padding: 8px;
            background: #222;
            color: #0f0;
            font-family: monospace;
            margin-bottom: 10px;
        }
        #cmdBox {
            width: 80%;
            padding: 8px;
            font-size: 16px;
        }
        #runBtn {
            padding: 8px 15px;
            font-size: 16px;
            cursor: pointer;
            margin-left: 10px;
        }
    </style>
</head>
<body>

<div id="status">Connecting...</div>

<input id="cmdBox" type="text" placeholder="Enter command to run on TV (example: tizen.systeminfo.getCapabilities())" />
<button id="runBtn">Run</button>

<div id="logs"></div>

<script>
    var ws = new WebSocket("ws://YOUR_SERVER_IP:8080");

    ws.onopen = function () {
        document.getElementById("status").textContent = "Connected";
        ws.send(JSON.stringify({ type: "ui-register" }));
    };

    ws.onerror = function () {
        document.getElementById("status").textContent = "WebSocket Error";
    };

    ws.onclose = function () {
        document.getElementById("status").textContent = "Disconnected";
    };

    ws.onmessage = function (e) {
        var data = JSON.parse(e.data);
        var logBox = document.getElementById("logs");

        var line = document.createElement("div");
        line.textContent = "[" + data.type + "] " + data.message;

        logBox.appendChild(line);
        logBox.scrollTop = logBox.scrollHeight;
    };

    document.getElementById("runBtn").onclick = function () {
        var cmd = document.getElementById("cmdBox").value;
        if (cmd.trim() !== "") {
            ws.send(JSON.stringify({ type: "run", command: cmd }));

            var logBox = document.getElementById("logs");
            var line = document.createElement("div");
            line.textContent = "[log] Sent command: " + cmd;
            logBox.appendChild(line);
            logBox.scrollTop = logBox.scrollHeight;
        }
    };
</script>

</body>
</html>
