import random

def get_debug():
    port = 9000 + random.randint(0, 200)
    url = f"http://127.0.0.1:{port}/inspector"
    return port, url
