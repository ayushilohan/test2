let socket;
const logs = document.getElementById('logs');

function connect() {
  const url = document.getElementById('url').value.trim();
  if (!url) return log('⚠️ Enter WebSocket URL');

  socket = new WebSocket(url);

  socket.onopen = () => log('✅ Connected');
  socket.onmessage = (msg) => log('📥 ' + msg.data);
  socket.onerror = (err) => log('❌ ' + err);
  socket.onclose = () => log('🔒 Disconnected');
}

function sendCmd() {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    return log('⚠️ Not connected to TV');
  }

  const expr = document.getElementById('cmd').value.trim();
  if (!expr) return;

  const payload = {
    id: Date.now(),
    method: 'Runtime.evaluate',
    params: { expression: expr }
  };
  socket.send(JSON.stringify(payload));
  log('📤 ' + expr);
}

function log(text) {
  logs.textContent += text + '\n';
  logs.scrollTop = logs.scrollHeight;
}
