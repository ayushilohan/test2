import React, { useState } from 'react';

function App() {
  const [cmd1, setCmd1] = useState("");
  const [cmd2, setCmd2] = useState("");
  const [result, setResult] = useState("");

  const runCommand = async (command) => {
    const res = await fetch("http://localhost:5000/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command })
    });
    const data = await res.json();
    setResult(data.output || data.error);
  };

  return (
    React.createElement("div", { style: { padding: "20px", fontFamily: "Arial" } },

      // FIELD 1
      React.createElement("div", { style: { marginBottom: "20px" } },
        React.createElement("input", {
          value: cmd1,
          onChange: e => setCmd1(e.target.value),
          placeholder: "Enter command 1",
          style: { marginRight: "10px" }
        }),
        React.createElement("button", {
          onClick: () => runCommand(cmd1),
          style: { marginRight: "10px" }
        }, "Submit"),
        React.createElement("button", {
          onClick: () => setCmd1("")
        }, "Clear")
      ),

      // FIELD 2
      React.createElement("div", { style: { marginBottom: "20px" } },
        React.createElement("input", {
          value: cmd2,
          onChange: e => setCmd2(e.target.value),
          placeholder: "Enter command 2",
          style: { marginRight: "10px" }
        }),
        React.createElement("button", {
          onClick: () => runCommand(cmd2),
          style: { marginRight: "10px" }
        }, "Submit"),
        React.createElement("button", {
          onClick: () => setCmd2("")
        }, "Clear")
      ),

      // RESULT BOX
      React.createElement("div", { style: { marginTop: "30px" } },
        React.createElement("h3", null, "Command Output:"),
        React.createElement("pre", {
          style: { background: "#eee", padding: "10px", minHeight: "100px" }
        }, result),
        React.createElement("button", {
          onClick: () => setResult(""),
          style: { marginTop: "10px" }
        }, "Clear Result")
      )
    )
  );
}

export default App;
