<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Tizen Remote UI</title>
  <style>
    body{font-family:sans-serif;margin:20px}
    textarea{width:100%;height:120px}
    #log{width:100%;height:200px;border:1px solid #ccc;overflow:auto;padding:6px;margin-top:8px;font-family:monospace;background:#f9f9f9}
    .row{margin-top:8px}
    button{margin-right:6px}
  </style>
</head>
<body>
  <h3>Tizen Remote (UI)</h3>
  <label>Relay URL: <input id="url" value="ws://<SERVER_IP>:8080" style="width:260px"></label>
  <button id="connect">Connect</button>
  <div class="row">
    <textarea id="code" placeholder="Type JS or WebAPI call, e.g. webapis.avplay.play()"></textarea>
  </div>
  <div class="row">
    <button id="send">Send</button>
    <button data-sample="console.log('hi from ui')">Console</button>
    <button data-sample="webapis.avplay.open('http://example.com/video.mp4')">AVPlay Open</button>
    <button data-sample="webapis.avplay.play()">AVPlay Play</button>
    <button data-sample="tizen.application.getCurrentApplication().exit()">Exit App</button>
  </div>
  <div id="log"></div>

<script>
(function(){
  var ws = null;
  var log = document.getElementById('log');
  function append(m){ log.innerHTML += (new Date().toLocaleTimeString()) + ' ➜ ' + m + '<br>'; log.scrollTop = log.scrollHeight; }

  document.getElementById('connect').onclick = function(){
    var url = document.getElementById('url').value.trim();
    if(ws){ try{ ws.close(); }catch(e){} ws = null; }
    ws = new WebSocket(url);
    ws.onopen = function(){ append('Connected to relay: ' + url); };
    ws.onmessage = function(evt){ append('TV → ' + evt.data); };
    ws.onclose = function(){ append('Disconnected'); };
    ws.onerror = function(e){ append('Error: ' + (e && e.message ? e.message : 'connection error')); };
  };

  document.getElementById('send').onclick = function(){
    var code = document.getElementById('code').value;
    if(!ws || ws.readyState !== WebSocket.OPEN){ append('Socket not open'); return; }
    // send JSON so TV can detect easily
    ws.send(JSON.stringify({ cmd: code }));
    append('Sent → ' + code);
  };

  // sample buttons
  var buttons = document.querySelectorAll('button[data-sample]');
  for (var i=0;i<buttons.length;i++){
    (function(btn){
      btn.onclick = function(){ document.getElementById('code').value = btn.getAttribute('data-sample'); };
    })(buttons[i]);
  }
})();
</script>
</body>
</html>
