import { useState, useEffect } from 'react';
import { usePlantPoints } from '../hooks/usePlantPoints';

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTask, setSelectedTask] = useState('');
  const { addPlantPoint } = usePlantPoints();
  
  const tasks = [
    { id: '1', name: 'Task 1' },
    { id: '2', name: 'Task 2' },
    { id: '3', name: 'Task 3' }
  ];

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
      addPlantPoint();
      
      // Save session data
      const session = {
        id: Date.now().toString(),
        taskId: selectedTask,
        taskName: tasks.find(t => t.id === selectedTask)?.name || 'Unknown Task',
        startTime: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        endTime: new Date().toISOString(),
        duration: 25 * 60
      };
      
      const existingSessions = JSON.parse(localStorage.getItem('pomodoroSessions') || '[]');
      localStorage.setItem('pomodoroSessions', JSON.stringify([...existingSessions, session]));
    }
  }, [timeLeft, isRunning, selectedTask, addPlantPoint]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
            width: '200px'
          }}
        >
          <option value="">Choose a task...</option>
          {tasks.map(task => (
            <option key={task.id} value={task.id}>{task.name}</option>
          ))}
        </select>
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
