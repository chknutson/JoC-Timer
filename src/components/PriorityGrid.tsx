import React, { useState } from 'react';
import AddTaskForm from './AddTaskForm'; // Adjust path as needed

export default function PriorityGrid() {
  const [showForm, setShowForm] = useState(false);

  const handleAddTask = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <section>
      <div className="grid-header">
        <h2>🟨 Priority Grid</h2>
        <button
          className="add-task-button"
          onClick={handleAddTask}
          aria-label="Add a new task"
        >
          + Add Task
        </button>
      </div>

      {showForm && <AddTaskForm onClose={handleCloseForm} />}

      <div>
        <p>Urgent + Important</p>
        <p>Not Urgent + Important</p>
        <p>Urgent + Not Important</p>
        <p>Not Urgent + Not Important</p>
      </div>
    </section>
  );
}
