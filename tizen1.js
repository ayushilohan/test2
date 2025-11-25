// ====== TIZEN TV main.js (NO ES6) ======
var ws = null;

function connectWS() {
    ws = new WebSocket("ws://YOUR_SERVER_IP:8080");

    ws.onopen = function () {
        console.log("WS Connected");
    };

    ws.onerror = function (e) {
        console.error("WS Error: " + JSON.stringify(e));
    };
}

(function () {
    var oldLog = console.log;
    var oldErr = console.error;

    console.log = function () {
        var msg = Array.prototype.slice.call(arguments).join(" ");
        oldLog.apply(console, arguments);
        try {
            if (ws && ws.readyState === 1) {
                ws.send(JSON.stringify({ type: "log", message: msg }));
            }
        } catch (e) {}
    };

    console.error = function () {
        var msg = Array.prototype.slice.call(arguments).join(" ");
        oldErr.apply(console, arguments);
        try {
            if (ws && ws.readyState === 1) {
                ws.send(JSON.stringify({ type: "error", message: msg }));
            }
        } catch (e) {}
    };
})();

window.onload = function () {
    connectWS();

    try {
        var info = tizen.systeminfo.getCapability("fakeKey");
    } catch (e) {
        console.error("Tizen API failed:", e);
    }
};
