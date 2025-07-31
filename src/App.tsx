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
        <PriorityGrid />
        <Toaster position="top-center" reverseOrder={false} />
        <GoalTracker />
        <Timer />
        <Plant />
      </main>
    </div>
  );
}
