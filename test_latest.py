
port = "8000"
url = "http://localhost:8000"

with open("result.json","w") as f:
    import json
    json.dump({"port":port,"url":url},f)
