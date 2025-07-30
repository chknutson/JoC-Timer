import AddTaskForm from './AddTaskForm';

export default function PriorityGrid() {

  return (
    <section>
      <div className="grid-header">
        <h2>🟨 Priority Grid</h2>
        <AddTaskForm/>
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
