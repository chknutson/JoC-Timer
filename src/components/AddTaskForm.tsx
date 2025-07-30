import React, { useState } from 'react';
//import './AddTaskForm.css';

function AddTaskForm() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');

  const resetForm = () => {
    setTitle('');
    setPriority('');
    setDueDate('');
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log({ title, priority, dueDate });
    resetForm();
    setShowForm(false);
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  return (
    <div className="add-task-container">
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : '+ Add Task'}
      </button>

      {showForm && (
        <form className="add-task-form" onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="title">Task Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="">Select priority</option>
              <option value="Urgent & Important">Urgent & Important</option>
              <option value="Not Urgent & Important">Not Urgent & Important</option>
              <option value="Urgent & Not Important">Urgent & Not Important</option>
              <option value="Not Urgent & Not Important">Not Urgent & Not Important</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit">Save Task</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddTaskForm;