import { useMemo } from 'react';
import { usePlantPoints } from '../hooks/usePlantPoints';

// Plant stages based on points
const plantStages = ["🪴", "🌱", "🌸", "🌸🎉"];

export default function Plant() {
  const { plantPoints } = usePlantPoints();

  // Calculate plant stage based on points using useMemo
  const currentStage = useMemo(() => {
    if (plantPoints >= 31) return 3; // 🌸🎉 (party bloom!)
    if (plantPoints >= 21) return 2; // 🌸 (bloom)
    if (plantPoints >= 11) return 1; // 🌱 (sprout)
    return 0; // 🪴 (pot)
  }, [plantPoints]);




  return (
    <section>
      <h2>🌿 Plant Progress Tracker 🌿</h2>

      {/* Display the current stage based on points */}
      <div>
        style={{ fontSize: "5rem", margin: "1.5rem 0", textAlign: "center" }}
      >
        {plantStages[currentStage]}
      </div>

      {/* Show current points */}
      {/* <div style={{ 
        fontSize: "1.2rem", 
        margin: "1rem 0",
        color: "#666",
        fontWeight: "bold",
        textAlign: "center"
      }}>
        Current points: {plantPoints}
      </div> */}

      {/* Progress info */}
      <div style={{ 
        fontSize: "0.9rem", 
        color: "#888",
        marginTop: "1rem",
        textAlign: "center"
      }}>
        {currentStage === 0 && "Complete tasks to grow your plant!"}
        {currentStage === 1 && "Keep going! Your plant is sprouting!"}
        {currentStage === 2 && "Beautiful! Your plant is blooming!"}
        {currentStage === 3 && "Amazing! Your plant is celebrating! 🎉"}
      </div>
    </section>
  );
}
