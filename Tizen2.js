// TV side (ES5)
var ws = new WebSocket("ws://<YOUR_PC_IP>:8080");

ws.onopen = function () { console.log("Connected to relay"); };

ws.onmessage = function (evt) {
    try {
        var data = typeof evt.data === "string" ? JSON.parse(evt.data) : evt.data;
        // If UI sent { cmd: "..." } or plain code string
        var code = data && data.cmd ? data.cmd : evt.data;
        try {
            var result = eval(code);
            ws.send(JSON.stringify({ ok: true, result: result }));
        } catch (errEval) {
            ws.send(JSON.stringify({ ok: false, error: errEval.toString() }));
        }
    } catch (err) {
        // fallback: try to eval raw text
        try {
            var r = eval(evt.data);
            ws.send(JSON.stringify({ ok: true, result: r }));
        } catch (e2) {
            ws.send(JSON.stringify({ ok: false, error: e2.toString() }));
        }
    }
};
