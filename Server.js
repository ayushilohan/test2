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




function fetchFromServer() {
  fetch("http://<YOUR_IP>:5000/config/feature-config.json")
    .then(res => res.json())
    .then(config => {
      console.log("✅ Remote config:", config);
      startPlayer(config.url);
    })
    .catch(err => console.error("❌ Failed to fetch remote JSON", err));
}



