import './App.css';

import Header from "./components/Header";
import PriorityGrid from "./components/PriorityGrid";
import GoalTracker from "./components/GoalTracker";
import Timer from "./components/Timer";
import Plant from "./components/Plant";
import AddTaskForm from "./components/AddTaskForm";


export default function App() {
  return (
    <div>
      <Header />
      <main>
        <PriorityGrid />
        <GoalTracker />
        <Timer />
        <Plant />
        <AddTaskForm />
      </main>
    </div>
  );
}
