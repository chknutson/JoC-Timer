export default function PriorityGrid() {
  const handleAddTask = () => {
    console.log("Add Task clicked");
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
      <div>
        <p>Urgent + Important</p>
        <p>Not Urgent + Important</p>
        <p>Urgent + Not Important</p>
        <p>Not Urgent + Not Important</p>
      </div>
    </section>
  );
}