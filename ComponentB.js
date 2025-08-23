// ComponentB.jsx
import { useState } from "react";
function ComponentB({ onSave }) {
    const [formData, setFormData] = useState({ city: "", country: "" });
  
    const handleSave = () => {
      const jsonB = {
        address: formData
      };
      onSave(jsonB);
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        />
        <button onClick={handleSave}>Save</button>
      </div>
    );
  }
export default ComponentB;  