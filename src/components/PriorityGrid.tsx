import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import "./PriorityGrid.css";

interface Task {
  id: number;
  title: string;
  priority: string;
  dueDate: string;
  completed: boolean;
}

// ===== Constants =====
const MAX_TASKS_TOTAL = 10;
const MAX_TASKS_PER_CATEGORY = 2;

const celebrateMessages = [
  "🎉 Woohoo! Another one bites the dust!",
  "💪 You crushed it!",
  "🌟 Boom! Done and dusted!",
  "🔥 On fire! Keep going!",
  "🍪 Cookie time — you earned it!"
];

const priorities = [
  { key: "Urgent & Important", className: "urgent-important" },
  { key: "Not Urgent & Important", className: "not-urgent-important" },
  { key: "Urgent & Not Important", className: "urgent-not-important" },
  { key: "Not Urgent & Not Important", className: "not-urgent-not-important" }
];

const PriorityGrid: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(priorities[0].key);
  const [dueDate, setDueDate] = useState("");

  // ===== Load tasks =====
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
  }, []);

  // ===== Save tasks =====
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ===== Computed booleans =====
  const categoryFull =
    tasks.filter(t => t.priority === priority && !t.completed).length >= MAX_TASKS_PER_CATEGORY;

  // ===== Add task =====
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    if (tasks.length >= MAX_TASKS_TOTAL) return;
    if (categoryFull) {
      toast.error(`You can only have ${MAX_TASKS_PER_CATEGORY} active tasks in "${priority}"`);
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      priority,
      dueDate,
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
    setTitle("");
    setPriority(priorities[0].key);
    setDueDate("");
  };

  // ===== Delete task =====
  const handleDeleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // ===== Complete/Undo task =====
  const handleToggleComplete = (id: number) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          const nowCompleted = !task.completed;
          if (nowCompleted) {
            const message = celebrateMessages[Math.floor(Math.random() * celebrateMessages.length)];
            toast.success(message, {
              duration: 2500,
              style: { background: "#4caf50", color: "#fff", fontWeight: "bold" }
            });
          }
          return { ...task, completed: nowCompleted };
        }
        return task;
      })
    );
  };

  // ===== Render tasks for a given priority =====
  const renderTasksForPriority = (priorityLabel: string) =>
    tasks
      .filter(task => task.priority === priorityLabel && !task.completed)
      .map(task => (
        <div key={task.id} className="task-card">
          <div>
            <strong>{task.title}</strong>
            <div className="task-date">{task.dueDate}</div>
          </div>
          <div className="task-actions">
            <button onClick={() => handleToggleComplete(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>❌</button>
          </div>
        </div>
      ));

  return (
    <>
      {/* ===== Add Task Form ===== */}
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={tasks.length >= MAX_TASKS_TOTAL}
          maxLength={140}
        />
        <div className="char-info">
          Limit: 140 characters ({140 - title.length} remaining)
        </div>

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          disabled={tasks.length >= MAX_TASKS_TOTAL}
        >
          {priorities.map(p => (
            <option key={p.key}>{p.key}</option>
          ))}
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          disabled={tasks.length >= MAX_TASKS_TOTAL}
        />

        <button type="submit" disabled={tasks.length >= MAX_TASKS_TOTAL || categoryFull}>
          Add Task
        </button>

        {tasks.length >= MAX_TASKS_TOTAL && (
          <p className="limit-warning">Task limit reached (max {MAX_TASKS_TOTAL} tasks)</p>
        )}
        {categoryFull && (
          <p className="limit-warning">
            Max {MAX_TASKS_PER_CATEGORY} active tasks allowed in this category
          </p>
        )}
      </form>

      {/* ===== Priority Grid ===== */}
      <section>
        <div className="grid-header">
          <h2>🟨 Priority Grid</h2>
        </div>
        <div className="priority-grid">
          {priorities.map(p => (
            <div key={p.key} className={`card ${p.className}`}>
              <h3>{p.key}</h3>
              <div className="task-placeholder">{renderTasksForPriority(p.key)}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default PriorityGrid;