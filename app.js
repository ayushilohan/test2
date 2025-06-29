import React, { useState } from 'react';
import './App.css';
import VirtualRemote from './VirtualRemote';
import DropDelayDialog from './DropDelayDialog';

const buttonsList = {
  HTV: ['HTV-A', 'HTV-B', 'HTV-C', 'HTV-D', 'HTV-E'],
  SS: ['SS-A', 'SS-B', 'SS-C', 'SS-D', 'SS-E']
};

function App() {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [droppedItems, setDroppedItems] = useState([]);
  const [activeRemoteTag, setActiveRemoteTag] = useState(null);
  const [showDelayDialog, setShowDelayDialog] = useState(false);
  const [pendingDropItem, setPendingDropItem] = useState(null);

  const onDrop = (e) => {
    const item = e.dataTransfer.getData('text/plain');
  
    if (droppedItems.includes(item)) return;
  
    if (droppedItems.length === 0) {
      setDroppedItems(prev => [...prev, item]);
    } else {
      setPendingDropItem(item);
      setShowDelayDialog(true);
    }
  };

  const handleDelaySubmit = (delay) => {
    if (pendingDropItem) {
      // Here you could store the delay along with the item
      setDroppedItems(prev => [...prev, pendingDropItem]);
      console.log(`Delay for ${pendingDropItem}: ${delay} seconds`);
      setPendingDropItem(null);
      setShowDelayDialog(false);
    }
  };
  
  const handleDelayCancel = () => {
    setPendingDropItem(null);
    setShowDelayDialog(false);
  };
  
  

  const handleRadioChange = (e) => {
    setSelectedGroup(e.target.value);
    setDroppedItems([]); // Optional: clear when radio changes
  };

  const onDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', item);
  };

  // const onDrop = (e) => {
  //   const item = e.dataTransfer.getData('text/plain');
  //   if (!droppedItems.includes(item)) {
  //     setDroppedItems(prev => [...prev, item]);
  //   }
  // };

  const onDragOver = (e) => {
    e.preventDefault(); // Required to allow drop
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="radio-buttons">
          <label><input type="radio" value="HTV" name="group" onChange={handleRadioChange} /> HTV</label>
          <label><input type="radio" value="SS" name="group" onChange={handleRadioChange} /> SS</label>
        </div>
        <div className="button-list">
          {selectedGroup && buttonsList[selectedGroup].map(btn => (
            <button
              key={btn}
              draggable
              onDragStart={(e) => onDragStart(e, btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      <div className="right-panel">
        <div className="fixed-bottom" onDrop={onDrop} onDragOver={onDragOver}>
          {droppedItems.length === 0 && <span className="placeholder">Drag buttons here</span>}
          {droppedItems.map((btn, i) => (
            <div key={i} className="tag">{btn}</div>
          ))}
        </div>
      </div>

      <VirtualRemote tag="KEY-A" />
      <DropDelayDialog
  open={showDelayDialog}
  onSubmit={handleDelaySubmit}
  onCancel={handleDelayCancel}
/>

    </div>
  );
}

export default App;
