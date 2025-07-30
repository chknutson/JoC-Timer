import "./App.css";

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
        <PriorityGrid />
        <GoalTracker />
        <Timer />
        <Plant />
      </main>
    </div>
  );
}
