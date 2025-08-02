import "./App.css";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import PriorityGrid from "./components/PriorityGrid";
import GoalTracker from "./components/GoalTracker";
import Timer from "./components/Timer";
import Plant from "./components/Plant";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        {/* Combined Timer + Plant Card with tagline inside */}
        <div className="timer-plant-card">
          <h2 className="focus-tagline">🌱 Focus Fuels Growth</h2>
          <div className="timer-plant-content">
            <div className="timer-section">
              <Timer />
            </div>
            <div className="plant-section">
              <Plant />
            </div>
          </div>
        </div>

        <PriorityGrid />
        <GoalTracker />
        <Toaster position="top-center" reverseOrder={false} />
      </main>
    </div>
  );
}
