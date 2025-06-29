import React, { useState } from 'react';
import './App.css';

function DropDelayDialog({ open, onSubmit, onCancel }) {
  const [delay, setDelay] = useState('');

  if (!open) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h3>Set Delay Time</h3>
        <input
          type="number"
          placeholder="Enter delay in seconds"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
        />
        <div style={{ marginTop: 10 }}>
          <button onClick={() => onSubmit(delay)}>Submit</button>
          <button className="cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DropDelayDialog;
