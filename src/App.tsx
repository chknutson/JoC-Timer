import "./App.css";
import { Toaster } from "react-hot-toast";
import { useLocalStorage } from "./hooks/useLocalStorage";

import Header from "./components/Header";
import PriorityGrid from "./components/PriorityGrid";
import GoalTracker from "./components/GoalTracker";
import Timer from "./components/Timer";
import Plant from "./components/Plant";

interface Goal {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority?: 'high' | 'medium' | 'low';
}

interface Task {
  id: number;
  title: string;
  priority: string;
  dueDate: string;
  completed: boolean;
  animation?: string;
}

export default function App() {
  const [goals] = useLocalStorage<Goal[]>('weekly-goals', []);
  const [tasks] = useLocalStorage<Task[]>('tasks', []);

  const completedGoals = goals.filter(goal => goal.completed);
  const completedTasks = tasks.filter(task => task.completed);
  const allCompletedItems = [...completedGoals, ...completedTasks];

  const getPlantEmoji = (index: number) => {
    const plants = ['🌻', '🌹', '🌷', '🌸', '🌺', '🌼', '🌿', '🌱', '🌵', '🌴', '🌳', '🌲'];
    return plants[index % plants.length];
  };

  const getItemText = (item: Goal | Task) => {
    if ('text' in item) {
      return item.text; // Goal
    } else {
      return item.title; // Task
    }
  };

  const isGoal = (item: Goal | Task): item is Goal => {
    return 'text' in item;
  };

  return (
    <div className="app">
      <Header />
      <main>
        {/* Garden Section - Above Timer + Plant */}
        <section className="garden-section">
          <div className="garden-container">
            <h2 className="garden-main-title">🌻 Completed Task Garden</h2>
            <div className="garden-main-bed">
              {allCompletedItems.length === 0 ? (
                <div className="garden-placeholder">
                  <p className="text-gray-500 text-center text-lg">Your garden will bloom here as you complete goals!</p>
                  <p className="text-sm text-gray-400 text-center mt-2">Complete some weekly goals or priority tasks to see plants grow</p>
                </div>
              ) : (
                <div className="garden-plants-grid">
                  {allCompletedItems.map((item, index) => (
                    <div key={`${item.id}-${index}`} className={`garden-plant ${isGoal(item) ? 'goal-plant' : 'task-plant'}`}>
                      <div className="plant-emoji">
                        {getPlantEmoji(index)}
                      </div>
                      <div className="plant-text">
                        {getItemText(item)}
                      </div>
                      <div className="plant-type-badge">
                        {isGoal(item) ? '🌱 Weekly Goal' : '📋 Priority Task'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

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
