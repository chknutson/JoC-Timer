

import { useState } from "react";

const plantStages = ["🌱", "🌿", "🌳"];

export default function Plant() {
  const [stage, setStage] = useState(0);

  // Move to the next stage if not at max
  const growPlant = () => {
    if (stage < plantStages.length - 1) {
      setStage(stage + 1);
    }
  };


// Reset back to stage 0
  const resetPlant = () => {
    setStage(0);
  };

  return (
    <section style={{ textAlign: "center", padding: "2rem" }}>
      <h2> Plant Progress Test</h2>

      {/* Display the current stage */}
      <div style={{ fontSize: "4rem", margin: "1rem 0" }}>
        {plantStages[stage]}
      </div>


{/* Test buttons */}
      <button
        onClick={growPlant}
        style={{
          marginRight: "0.5rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          background: "#bbf7d0",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Grow Plant
      </button>


<button
  onClick={resetPlant}
  style={{
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    background: "#fca5a5",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  Reset Plant
</button>
   </section>
  );
}
