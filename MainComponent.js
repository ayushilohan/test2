// MainComponent.jsx
import { useState } from "react";
import ComponentA from './ComponentA.js'
import ComponentB from './ComponentB.js'

function MainComponent() {
  const [finalJson, setFinalJson] = useState({});

  const handleSaveFromChild = (childJson) => {
    setFinalJson((prev) => ({
      ...prev,        // keep old data
      ...childJson,  // merge new json
    }));
  };

  const handleSubmit = () => {
    console.log("Final JSON:", finalJson);
    // send finalJson to backend
  };

  return (
    <div>
      <ComponentA onSave={handleSaveFromChild} />
      <ComponentB onSave={handleSaveFromChild} />

      <button onClick={handleSubmit}>Submit to Backend</button>
    </div>
  );
}

export default MainComponent;
