var ws = new WebSocket("ws://<YOUR_PC_IP>:8080");

// ---- override console logs ----
var _origLog = console.log;
var _origErr = console.error;

console.log = function () {
    var msg = "";
    for (var i = 0; i < arguments.length; i++) {
        msg += arguments[i] + " ";
    }
    _origLog.apply(console, arguments);
    try {
        ws.send(JSON.stringify({
            type: "log",
            message: msg
        }));
    } catch (e) {}
};

console.error = function () {
    var msg = "";
    for (var i = 0; i < arguments.length; i++) {
        msg += arguments[i] + " ";
    }
    _origErr.apply(console, arguments);
    try {
        ws.send(JSON.stringify({
            type: "error",
            message: msg
        }));
    } catch (e) {}
};

// ---- runtime errors ----
window.onerror = function (msg, url, line) {
    try {
        ws.send(JSON.stringify({
            type: "error",
            message: msg + " @ line " + line
        }));
    } catch (e) {}
};

// ---- receive JS command ----
ws.onmessage = function (evt) {
    try {
        var obj = JSON.parse(evt.data);
        var code = obj.cmd;
        var result = eval(code);

        ws.send(JSON.stringify({
            type: "result",
            result: result
        }));
    } catch (e) {
        ws.send(JSON.stringify({
            type: "error",
            message: e.toString()
        }));
    }
};
