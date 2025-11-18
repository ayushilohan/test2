const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");
const os = require("os");

const app = express();
app.use(express.json());
app.use(cors());

function getShell() {
  const p = os.platform(); // win32 / darwin / linux

  if (p === "win32") {
    return "C:\\Windows\\System32\\cmd.exe";
  }

  return "/bin/bash"; // macOS + Linux
}

app.post("/run", (req, res) => {
  const { command } = req.body;

  exec(command, { shell: getShell() }, (error, stdout, stderr) => {
    if (error) {
      return res.json({
        success: false,
        output: error.message
      });
    }

    res.json({
      success: true,
      output: stdout || stderr
    });
  });
});

app.listen(5000, () => {
  console.log("Backend running on 5000");
  console.log("Detected shell:", getShell());
});
