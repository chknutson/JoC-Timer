import { useState } from "react";

// Updated stages: pot → sprout → bloom → party bloom!
const plantStages = ["🪴", "🌱", "🌸", "🌸🎉"];

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
    <section>
      <h2>🌿 Plant Progress Tracker 🌿</h2>

      {/* Display the current stage */}
      <div
        style={{ fontSize: "5rem", margin: "1.5rem 0", textAlign: "center" }}
      >
        {plantStages[stage]}
      </div>

      {/* Test buttons */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={growPlant}
          style={{
            marginRight: "0.5rem",
            padding: "0.5rem 1.2rem",
            fontSize: "1rem",
            background: "#bbf7d0",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🌞 Grow Plant
        </button>

        <button
          onClick={resetPlant}
          style={{
            padding: "0.5rem 1.2rem",
            fontSize: "1rem",
            background: "#fca5a5",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🔄 Reset Plant
        </button>
      </div>
    </section>
  );
}
