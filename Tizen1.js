var backendUrl = "http://<your-ip>:3000/cmd";

// Poll backend every 2 seconds
function checkCommand() {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", backendUrl, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var cmd = xhr.responseText;

                if (cmd && cmd.replace(/\s/g, "") !== "") {
                    console.log("Executing: " + cmd);

                    try {
                        eval(cmd); // run the command inside your app
                    } catch (e) {
                        console.log("Eval error: " + e);
                    }
                }
            }
        };

        xhr.send(null);
    } catch (e) {
        console.log("Request error: " + e);
    }
}

// Start polling
setInterval(checkCommand, 2000);


// ------------------------------------------------------
// Your functions (ES5 only)
// ------------------------------------------------------

function changeBg() {
    document.body.style.backgroundColor = "yellow";
}

function showMsg() {
    alert("Hello from backend!");
}

function increaseVolume() {
    console.log("Volume increased!");
}
