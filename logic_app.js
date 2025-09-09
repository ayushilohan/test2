import React, { useState } from "react";
import './App.css';

const initialLeftButtons = [
  { id: "btn1", label: "Button 1" },
  { id: "btn2", label: "Button 2" },
  { id: "btn3", label: "Button 3" },
  { id: "btn4", label: "Button 4" },
  { id: "btn5", label: "Button 5" }
];

function App() {
  const [leftButtons, setLeftButtons] = useState(initialLeftButtons);
  const [bottomItems, setBottomItems] = useState([]); // {id,label,value}
  const [showModal, setShowModal] = useState(false);
  const [pendingButton, setPendingButton] = useState(null);
  const [inputValue, setInputValue] = useState("");

  // Drag start from left buttons
  const onDragStart = (e, button) => {
    e.dataTransfer.setData("text/plain", button.id);
    // optional visual cue
    e.dataTransfer.effectAllowed = "move";
  };

  // Drop area handlers (bottom)
  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;
    // find button in left list (maybe already moved -> guard)
    const btn = leftButtons.find((b) => b.id === id);
    if (!btn) return; // nothing to do if already moved
    // open modal to ask for number
    setPendingButton(btn);
    setInputValue("");
    setShowModal(true);
  };

  const handleSubmitValue = (ev) => {
    ev.preventDefault();
    if (!pendingButton) return;
    const value = inputValue.trim();
    // allow empty? it's supposed to be a number — try to accept numeric input
    // We'll validate as number (but allow string if user insists)
    // Convert to number if numeric
    const numeric = value === "" ? "" : isNaN(Number(value)) ? value : Number(value);

    // Add to bottomItems
    setBottomItems((prev) => [...prev, { ...pendingButton, value: numeric }]);
    // Remove from leftButtons (move)
    setLeftButtons((prev) => prev.filter((b) => b.id !== pendingButton.id));

    // close modal
    setPendingButton(null);
    setShowModal(false);
    setInputValue("");
  };

  const handleCancel = () => {
    setPendingButton(null);
    setShowModal(false);
    setInputValue("");
  };

  // Optional: allow removing items from bottom and returning to left
  const removeFromBottom = (id) => {
    const item = bottomItems.find((it) => it.id === id);
    if (!item) return;
    setBottomItems((prev) => prev.filter((p) => p.id !== id));
    setLeftButtons((prev) => [...prev, { id: item.id, label: item.label }]);
  };

  return (
    <div className="app-root">
      <div className="left-pane">
        <h3 className="pane-title">Draggable Buttons</h3>
        <div className="buttons-list">
          {leftButtons.map((b) => (
            <button key={b.id} className="draggable-btn" draggable onDragStart={(e) => onDragStart(e, b)} >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className="right-pane">
        <div className="right-top">
          <h3 className="pane-title">Right Top (content area)</h3>
          <p style={{ padding: 12 }}>This area can show whatever you want. It takes the remaining space above the fixed bottom.</p>
        </div>

        <div className="right-bottom" onDragOver={onDragOver} onDrop={onDrop} >
          <h4 style={{ margin: "6px 8px" }}>Fixed Bottom (drop here)</h4>

          <div className="bottom-items">
            {bottomItems.length === 0 && <div className="placeholder">Drop buttons here</div>}
            {bottomItems.map((it) => (
              <div key={it.id} className="bottom-card">
                <div className="bottom-btn">{it.label}</div>
                <div className="bottom-value">{String(it.value)}</div>
                <button className="small-remove" onClick={() => removeFromBottom(it.id)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && pendingButton && (
        <div className="modal-overlay" onMouseDown={handleCancel}>
          <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
            <h3>Enter a number for "{pendingButton.label}"</h3>
            <form onSubmit={handleSubmitValue}>
              <input autoFocus value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter number" className="modal-input" inputMode="numeric" />
              <div className="modal-actions">
                <button type="button" onClick={handleCancel} className="btn secondary">Cancel</button>
                <button type="submit" className="btn primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
