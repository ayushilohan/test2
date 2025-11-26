/* ============================
   TIZEN main.js  (NO ES6)
   Receives commands from UI,
   runs them, and sends logs back
   ============================ */

var ws = null;

// ---------- CONNECT TO WS ----------
function connectWS() {
    ws = new WebSocket("ws://YOUR_SERVER_IP:8080");

    ws.onopen = function () {
        console.log("TV Connected to WS");
        try {
            ws.send(JSON.stringify({ type: "tv-register" }));
        } catch (e) {}
    };

    ws.onerror = function (e) {
        console.error("WS Error:", JSON.stringify(e));
    };

    ws.onmessage = function (msg) {
        var data = JSON.parse(msg.data);

        // ---------- RUN COMMAND FROM UI ----------
        if (data.type === "run") {
            try {
                var result = eval(data.command);   // run function / webapi

                console.log("Command executed: " + data.command);

                // return result
                try {
                    ws.send(JSON.stringify({
                        type: "log",
                        message: "Result: " + JSON.stringify(result)
                    }));
                } catch (e) {}
            } catch (err) {
                console.error("Command failed:", err);
                try {
                    ws.send(JSON.stringify({
                        type: "error",
                        message: "Error: " + err.toString()
                    }));
                } catch (e) {}
            }
        }
    };
}

// ---------- CAPTURE LOGS & SEND TO UI ----------
(function () {
    var oldLog = console.log;
    var oldErr = console.error;

    console.log = function () {
        var msg = Array.prototype.join.call(arguments, " ");
        oldLog.apply(console, arguments);

        try {
            if (ws && ws.readyState === 1) {
                ws.send(JSON.stringify({ type: "log", message: msg }));
            }
        } catch (e) {}
    };

    console.error = function () {
        var msg = Array.prototype.join.call(arguments, " ");
        oldErr.apply(console, arguments);

        try {
            if (ws && ws.readyState === 1) {
                ws.send(JSON.stringify({ type: "error", message: msg }));
            }
        } catch (e) {}
    };
})();

// ---------- INIT ----------
window.onload = function () {
    connectWS();

    // Test Tizen API error
    try {
        var info = tizen.systeminfo.getCapability("FakeCapability");
    } catch (e) {
        console.error("Tizen API failed on load:", e);
    }
};
