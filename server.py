from flask import Flask, jsonify
from test import get_debug

app = Flask(__name__)

@app.get("/run-debug")
def run_debug():
    port, url = get_debug()
    return jsonify({ "port": port, "url": url })

app.run(port=5001)
