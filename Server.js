const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const FILE_PATH = path.join(__dirname, 'public', 'feature-config.json');

// Serve static files
app.use('/config', express.static(path.join(__dirname, 'public')));

// Handle POST from React
app.post('/update-config', (req, res) => {
  const jsonData = req.body;
  fs.writeFile(FILE_PATH, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Failed to write file');
    }
    res.send('✅ Config updated successfully');
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});




const handleSubmit = (e) => {
  e.preventDefault();

  fetch("http://localhost:5000/update-config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.text())
    .then(msg => alert(msg))
    .catch(err => alert("Failed to upload config"));
};




var videoUrl = ""; // This will hold the value from JSON

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://<your-ip>:5000/config/feature-config.json", true);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var config = JSON.parse(xhr.responseText);
    videoUrl = config.url; // 🎯 Store the URL from JSON
    console.log("Video URL is: " + videoUrl);

    // Optional: Start playing
    var video = document.getElementById("videoPlayer");
    video.src = videoUrl;
    video.load();
    video.play();
  }
};

xhr.send();



