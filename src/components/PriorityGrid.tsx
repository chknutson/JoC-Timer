import Card from './Card/Card';

import React from 'react';
import './PriorityGrid.css';

const PriorityGrid: React.FC = () => {
  return (
      <section>
        <div className="grid-header">
          <h2>🟨 Priority Grid</h2>
        </div>
        <div className="priority-grid">
        {/* Urgent & Important */}
        <div className="card urgent-important">
          <h3>Urgent & Important</h3>
          <div className="task-placeholder">
            <p>Add tasks here...</p>
          </div>
        </div>

        {/* Not Urgent & Important */}
        <div className="card not-urgent-important">
          <h3>Not Urgent & Important</h3>
          <div className="task-placeholder">
            <p>Add tasks here...</p>
          </div>
        </div>

        {/* Urgent & Not Important */}
        <div className="card urgent-not-important">
          <h3>Urgent & Not Important</h3>
          <div className="task-placeholder">
            <p>Add tasks here...</p>
          </div>
        </div>

        {/* Not Urgent & Not Important */}
        <div className="card not-urgent-not-important">
          <h3>Not Urgent & Not Important</h3>
          <div className="task-placeholder">
            <p>Add tasks here...</p>
          </div>
                 </div>
        </div>
      </section>
 );
};

export default PriorityGrid;

// export default function PriorityGrid() {

//   return (
//     <section>
//       <div className="grid-header">
//         <h2>🟨 Priority Grid</h2>
//         <AddTaskForm/>
//       </div>

//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', padding: '16px' }}>
//         <Card 
//           title="Urgent + Important" 
//           subtitle="Do First"
//           meta="High priority tasks"
//         >
//           <p>Tasks that need immediate attention and are crucial for your goals.</p>
//         </Card>
        
//         <Card 
//           title="Not Urgent + Important" 
//           subtitle="Schedule"
//           meta="Strategic planning"
//         >
//           <p>Important tasks that can be planned and scheduled for later.</p>
//         </Card>
        
//         <Card 
//           title="Urgent + Not Important" 
//           subtitle="Delegate"
//           meta="Time management"
//         >
//           <p>Urgent tasks that don't contribute to your long-term goals.</p>
//         </Card>
        
//         <Card 
//           title="Not Urgent + Not Important" 
//           subtitle="Eliminate"
//           meta="Productivity"
//         >
//           <p>Tasks that waste time and should be eliminated or minimized.</p>
//         </Card>
//       </div>
//     </section>
//   );
// }
