let debugURL = "";

async function runPython() {
  try {
    const res = await fetch("http://localhost:5001/run-debug");
    const data = await res.json();

    debugURL = data.url;
    document.getElementById("debugUrlText").textContent = debugURL;
    document.getElementById("inspectBtn").disabled = false;
  } catch (err) {
    alert("Run server.py first!");
  }
}

function inspectURL() {
  if (debugURL) window.open(debugURL, "_blank");
}

function buildWeb() { console.log("Build clicked"); }
function buildPackage() { console.log("Package clicked"); }
function sdbPush() { console.log("Push clicked"); }
function installApp() { console.log("Install clicked"); }
function uninstallApp() { console.log("Uninstall clicked"); }
