// ComponentA.jsx
import { useState } from "react";
function ComponentA({ onSave }) {
    const [formData, setFormData] = useState({ name: "", age: "" });
  
    const handleSave = () => {
      const jsonA = {
        userDetails: formData   // custom JSON structure
      };
      onSave(jsonA);  // pass JSON back to parent
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        <button onClick={handleSave}>Save</button>
      </div>
    );
  }

  export default ComponentA;