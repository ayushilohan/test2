const express = require('express');
const app = express();

var command = "";

app.get('/cmd', function(req, res) {
    res.send(command);
    command = "";
});

app.get('/set', function(req, res) {
    command = req.query.cmd || "";
    res.send("OK");
});

app.listen(3000, function() {
    console.log("Backend running on port 3000");
});
