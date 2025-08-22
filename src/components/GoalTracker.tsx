import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { usePlantPoints } from '../hooks/usePlantPoints';
import './GoalTracker.css';

interface Goal {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority?: 'high' | 'medium' | 'low';
}

export default function GoalTracker() {
  const [goals, setGoals] = useLocalStorage<Goal[]>('weekly-goals', []);
  const [newGoalText, setNewGoalText] = useState('');
  const [newGoalPriority, setNewGoalPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [awardedGoals, setAwardedGoals] = useLocalStorage<string[]>('awarded-goals', []);
  const { addGoalPoints } = usePlantPoints();

  const addGoal = () => {
    if (newGoalText.trim()) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        text: newGoalText.trim(),
        completed: false,
        createdAt: new Date(),
        priority: newGoalPriority
      };
      setGoals([...goals, newGoal]);
      setNewGoalText('');
      setNewGoalPriority('medium');
      setIsAddingGoal(false);
    }
  };

  const toggleGoal = (goalId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newCompleted = !goal.completed;
        
        // Award 5 points only once when marking as complete for the first time
        if (newCompleted && !awardedGoals.includes(goalId)) {
          addGoalPoints();
          setAwardedGoals([...awardedGoals, goalId]);
        }
        
        return { ...goal, completed: newCompleted };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addGoal();
    } else if (e.key === 'Escape') {
      setIsAddingGoal(false);
      setNewGoalText('');
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'high-priority';
      case 'medium': return 'medium-priority';
      case 'low': return 'low-priority';
      default: return 'medium-priority';
    }
  };

  const renderGoalsForCategory = (_category: string, filterFn: (goal: Goal) => boolean) =>
    goals
      .filter(filterFn)
      .map((goal) => (
        <div
          key={goal.id}
          className={`task-card ${goal.completed ? "completed" : ""}`}
        >
          <div>
            <strong>{goal.text}</strong>
            <div className="task-date">
              {new Date(goal.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className="task-actions">
            <button onClick={() => toggleGoal(goal.id)}>
              {goal.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => deleteGoal(goal.id)}>❌</button>
          </div>
        </div>
      ));

  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">🔵 Weekly Goals</h2>
        {!isAddingGoal && (
          <button
            onClick={() => setIsAddingGoal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            Add Goal
          </button>
        )}
      </div>

      {isAddingGoal && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border-2 border-blue-200">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter your weekly goal..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            <select
              value={newGoalPriority}
              onChange={(e) => setNewGoalPriority(e.target.value as 'high' | 'medium' | 'low')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="high">🔥 High</option>
              <option value="medium">⚡ Medium</option>
              <option value="low">🌱 Low</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={addGoal}
              disabled={!newGoalText.trim()}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAddingGoal(false);
                setNewGoalText('');
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Press Enter to add, Escape to cancel
          </p>
        </div>
      )}

      {goals.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg mb-2">No weekly goals yet</p>
          <p className="text-sm">Click "Add Goal" to get started!</p>
        </div>
      ) : (
        <div className="priority-grid">
          <div className={`card ${getPriorityClass('high')}`}>
            <h3>🔥 High Priority Goals</h3>
            <div className="task-placeholder">
              {renderGoalsForCategory('high-priority', goal => goal.priority === 'high' && !goal.completed)}
            </div>
          </div>
          
          <div className={`card ${getPriorityClass('medium')}`}>
            <h3>⚡ Medium Priority Goals</h3>
            <div className="task-placeholder">
              {renderGoalsForCategory('medium-priority', goal => goal.priority === 'medium' && !goal.completed)}
            </div>
          </div>
          
          <div className={`card ${getPriorityClass('low')}`}>
            <h3>�� Low Priority Goals</h3>
            <div className="task-placeholder">
              {renderGoalsForCategory('low-priority', goal => goal.priority === 'low' && !goal.completed)}
            </div>
          </div>
        </div>
      )}

      {goals.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              {goals.filter(g => g.completed).length} of {goals.length} completed
            </span>
            <span>
              {Math.round((goals.filter(g => g.completed).length / goals.length) * 100)}% done
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(goals.filter(g => g.completed).length / goals.length) * 100}%`
              }}
            ></div>
          </div>
        </div>
      )}
    </section>
  );
}
