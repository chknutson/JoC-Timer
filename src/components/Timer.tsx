import { useState, useEffect } from 'react';
import { usePlantPoints } from '../hooks/usePlantPoints';

interface Task {
  id: number;
  title: string;
  priority: string;
  dueDate: string;
  completed: boolean;
}

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTask, setSelectedTask] = useState('');

  const { addTimerPoints } = usePlantPoints();

  const [tasks, setTasks] = useState<Task[]>([]);
  const { addPlantPoint } = usePlantPoints();

  // Load tasks from localStorage (same as Priority Grid)
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
  }, []);

  // Periodically refresh tasks from localStorage to catch new additions
  useEffect(() => {
    const interval = setInterval(() => {
      const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      setTasks(savedTasks);
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  // Get uncompleted tasks grouped by priority
  const getUncompletedTasks = () => {
    return tasks.filter(task => !task.completed);
  };

  const buttonStyle = (color: string, disabled: boolean) => ({
    marginRight: "0.5rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    background: color,
    border: "none",
    borderRadius: "5px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1
  });

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    
    const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      addTimerPoints();
      
      // Save session data
      const selectedTaskData = tasks.find(t => t.id.toString() === selectedTask);
      const session = {
        id: Date.now().toString(),
        taskId: selectedTask,
        taskName: selectedTaskData?.title || 'Unknown Task',
        taskPriority: selectedTaskData?.priority || 'Unknown',
        startTime: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        endTime: new Date().toISOString(),
        duration: 25 * 60
      };
      
      const existingSessions = JSON.parse(localStorage.getItem('pomodoroSessions') || '[]');
      localStorage.setItem('pomodoroSessions', JSON.stringify([...existingSessions, session]));
    }

  }, [timeLeft, isRunning, selectedTask, addPlantPoint, tasks, addTimerPoints]);


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const uncompletedTasks = getUncompletedTasks();

  return (
    <section>
      <h2>⏳ Pomodoro Timer</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="task-select" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Which Task are we working on:
        </label>
        <select
          id="task-select"
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '300px'
          }}
        >
          <option value="">Choose a task...</option>
          {uncompletedTasks.length === 0 ? (
            <option disabled>No uncompleted tasks available</option>
          ) : (
            <>
              <optgroup label="Urgent & Important">
                {uncompletedTasks
                  .filter(task => task.priority === "Urgent & Important")
                  .map(task => (
                    <option key={task.id} value={task.id.toString()}>
                      {task.title} (Due: {task.dueDate})
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Not Urgent & Important">
                {uncompletedTasks
                  .filter(task => task.priority === "Not Urgent & Important")
                  .map(task => (
                    <option key={task.id} value={task.id.toString()}>
                      {task.title} (Due: {task.dueDate})
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Urgent & Not Important">
                {uncompletedTasks
                  .filter(task => task.priority === "Urgent & Not Important")
                  .map(task => (
                    <option key={task.id} value={task.id.toString()}>
                      {task.title} (Due: {task.dueDate})
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Not Urgent & Not Important">
                {uncompletedTasks
                  .filter(task => task.priority === "Not Urgent & Not Important")
                  .map(task => (
                    <option key={task.id} value={task.id.toString()}>
                      {task.title} (Due: {task.dueDate})
                    </option>
                  ))}
              </optgroup>
            </>
          )}
        </select>
        {uncompletedTasks.length === 0 && (
          <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Add some tasks in the Priority Grid first!
          </p>
        )}
      </div>

      <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '1rem 0' }}>
        {formatTime(timeLeft)}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button 
          onClick={() => selectedTask && setIsRunning(true)}
          disabled={isRunning || !selectedTask}
          style={buttonStyle("#bbf7d0", isRunning || !selectedTask)}
        >
          Start
        </button>
        <button 
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
          style={buttonStyle("#fca5a5", !isRunning)}
        >
          Stop
        </button>
        <button 
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(25 * 60);
          }}
          style={buttonStyle("#fbbf24", false)}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
