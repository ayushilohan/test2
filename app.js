import React, { useState } from 'react';
import './App.css';
import DialogBox from './DialogBox.js';

const buttonsList = {
  HTV: ['HTV-A', 'HTV-B', 'HTV-C', 'HTV-D', 'HTV-E'],
  SS: ['SS-A', 'SS-B', 'SS-C', 'SS-D', 'SS-E']
};

function App() {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [droppedItems, setDroppedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedButton, setSelectedButton] = useState('');

  const handleRadioChange = (e) => {
    setSelectedGroup(e.target.value);
    setDroppedItems([]);
    setShowDialog(false);
  };

  const onDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', item);
  };

  const onDrop = (e) => {
    const item = e.dataTransfer.getData('text/plain');
    if (!droppedItems.includes(item)) {
      setDroppedItems(prev => [...prev, item]);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const handleTagClick = (btn) => {
    setSelectedButton(btn);
    setShowDialog(true);
  };

  return (
    <div className="container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="radio-buttons">
          <label>
            <input type="radio" value="HTV" name="group" onChange={handleRadioChange} />
            HTV
          </label>
          <label>
            <input type="radio" value="SS" name="group" onChange={handleRadioChange} />
            SS
          </label>
        </div>
        <div className="button-list">
          {selectedGroup &&
            buttonsList[selectedGroup].map((btn) => (
              <button key={btn} draggable onDragStart={(e) => onDragStart(e, btn)}>
                {btn}
              </button>
            ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel" onDrop={onDrop} onDragOver={onDragOver}>
        {showDialog && (
          <div className="inline-dialog-container">
            <DialogBox selectedButton={selectedButton} onClose={() => setShowDialog(false)} />
          </div>
        )}

        <div className="fixed-bottom">
          {droppedItems.length === 0 && <span className="placeholder">Drag buttons here</span>}
          {droppedItems.map((btn, i) => (
            <div key={i} className="tag" onClick={() => handleTagClick(btn)}>
              {btn}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
