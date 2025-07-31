import AddTaskForm from './AddTaskForm';
import Card from './Card/Card';

export default function PriorityGrid() {

  return (
    <section>
      <div className="grid-header">
        <h2>🟨 Priority Grid</h2>
        <AddTaskForm/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', padding: '16px' }}>
        <Card 
          title="Urgent + Important" 
          subtitle="Do First"
          meta="High priority tasks"
        >
          <p>Tasks that need immediate attention and are crucial for your goals.</p>
        </Card>
        
        <Card 
          title="Not Urgent + Important" 
          subtitle="Schedule"
          meta="Strategic planning"
        >
          <p>Important tasks that can be planned and scheduled for later.</p>
        </Card>
        
        <Card 
          title="Urgent + Not Important" 
          subtitle="Delegate"
          meta="Time management"
        >
          <p>Urgent tasks that don't contribute to your long-term goals.</p>
        </Card>
        
        <Card 
          title="Not Urgent + Not Important" 
          subtitle="Eliminate"
          meta="Productivity"
        >
          <p>Tasks that waste time and should be eliminated or minimized.</p>
        </Card>
      </div>
    </section>
  );
}
