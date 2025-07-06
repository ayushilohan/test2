import React, { useState } from 'react';
import './DialogBox.css';

const DialogBox = ({ selectedButton, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [items, setItems] = useState([]);

  const handleAdd = () => {
    if (!inputVal.trim()) return;
    setItems([
      ...items,
      {
        id: Date.now(),
        value: inputVal,
        configShown: false,
        config: {
          bindType: '',
          encryption: 'false',
          timeValue: '',
          subOptionsEnabled: false,
          subInputs: ['', '', '', '']
        }
      }
    ]);
    setInputVal('');
  };

  const toggleConfig = (id) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, configShown: !item.configShown }
        : { ...item, configShown: false }
    ));
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateConfig = (id, field, value) => {
    setItems(items.map(item =>
      item.id === id
        ? {
            ...item,
            config: {
              ...item.config,
              [field]: value
            }
          }
        : item
    ));
  };

  const updateSubInput = (id, index, value) => {
    setItems(items.map(item =>
      item.id === id
        ? {
            ...item,
            config: {
              ...item.config,
              subInputs: item.config.subInputs.map((v, i) =>
                i === index ? value : v
              )
            }
          }
        : item
    ));
  };

  const handleSave = (item) => {
    console.log('Saved item config:', item);
    alert(`Configuration for "${item.value}" saved successfully!`);
  };

  return (
    <div className="dialog-box">
      <button className="close-btn" onClick={onClose}>×</button>
      <h3>{selectedButton} Configuration</h3>

      {/* Input + Add */}
      <div className="dialog-inline-row">
        <input
          type="text"
          placeholder="Enter value"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button onClick={handleAdd} disabled={!inputVal.trim()}>
          Add
        </button>
      </div>

      {/* List */}
      {items.map((item) => (
        <div key={item.id}>
          <div className="list-row">
            <span className="item-name" onClick={() => toggleConfig(item.id)}>
              {item.value}
            </span>
            <button className="delete-btn" onClick={() => handleDelete(item.id)}>
              ×
            </button>
          </div>

          {item.configShown && (
            <>
              {/* Bind Type */}
              <div className="radio-section">
                <label>
                  <input
                    type="radio"
                    name={`bind-${item.id}`}
                    value="time"
                    checked={item.config.bindType === 'time'}
                    onChange={() => updateConfig(item.id, 'bindType', 'time')}
                  />
                  Time
                </label>
                <label>
                  <input
                    type="radio"
                    name={`bind-${item.id}`}
                    value="key"
                    checked={item.config.bindType === 'key'}
                    onChange={() => updateConfig(item.id, 'bindType', 'key')}
                  />
                  Key
                </label>
              </div>

              {/* If Time selected, show input */}
              {item.config.bindType === 'time' && (
                <div>
                  <label>Time (in seconds):</label>
                  <input
                    type="text"
                    value={item.config.timeValue}
                    onChange={(e) =>
                      updateConfig(item.id, 'timeValue', e.target.value)
                    }
                    placeholder="Enter time"
                  />
                </div>
              )}

              {/* Encryption */}
              <div className="dropdown">
                <label>Encryption:</label>
                <select
                  value={item.config.encryption}
                  onChange={(e) =>
                    updateConfig(item.id, 'encryption', e.target.value)
                  }
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>

              {/* Sub-options */}
              <label>
                <input
                  type="checkbox"
                  checked={item.config.subOptionsEnabled}
                  onChange={(e) =>
                    updateConfig(item.id, 'subOptionsEnabled', e.target.checked)
                  }
                />
                Enable Sub-options
              </label>

              {item.config.subOptionsEnabled &&
                item.config.subInputs.map((val, i) => (
                  <div key={i}>
                    <label>Option {i + 1}</label>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) =>
                        updateSubInput(item.id, i, e.target.value)
                      }
                    />
                  </div>
                ))}

              {/* Save Button */}
              <button className="save-btn" onClick={() => handleSave(item)}>
                Save
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default DialogBox;
