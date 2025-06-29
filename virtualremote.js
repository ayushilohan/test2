import React from 'react';
import './VirtualRemote.css';

function VirtualRemote({ tag, onClose }) {
  if (!tag) return null;

  return (
    <div className="remote-ui">
      <div className="remote-header">
        <h3>Remote for: {tag}</h3>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>

      <div className="remote-top-row">
        <button className="remote-btn power">Power</button>
        <button className="remote-btn">Source</button>
      </div>

      <div className="remote-numbers">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
          <button key={num} className="remote-btn">{num}</button>
        ))}
      </div>

      <div className="remote-nav">
        <button className="remote-btn">⬆</button>
        <div>
          <button className="remote-btn">⬅</button>
          <button className="remote-btn">OK</button>
          <button className="remote-btn">➡</button>
        </div>
        <button className="remote-btn">⬇</button>
      </div>

      <div className="remote-colors">
        <button className="remote-btn red">A</button>
        <button className="remote-btn green">B</button>
        <button className="remote-btn yellow">C</button>
        <button className="remote-btn blue">D</button>
      </div>
    </div>
  );
}

export default VirtualRemote;
