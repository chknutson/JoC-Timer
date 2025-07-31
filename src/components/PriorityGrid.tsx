import React from 'react';
import './PriorityGrid.css';

const PriorityGrid: React.FC = () => {
  return (
    <div className="priority-container">
      <h2 className="priority-heading">Priority Tasks</h2>
      <div className="priority-grid">
        <div className="grid-container">
        {/* Urgent & Important */}
        <div className="grid-item urgent-important">
          <h3>Urgent & Important</h3>
          <div className="task-placeholder">
            <p>Add tasks here...</p>
          </div>
        </div>

        {/* Not Urgent & Important */}
        <div className="grid-item not-urgent-important">
          <h3>Not Urgent & Important</h3>
          <div className="task-placeholder">
            <p>Add tasks here...</p>
          </div>
        </div>

        {/* Urgent & Not Important */}
        <div className="grid-item urgent-not-important">
          <h3>Urgent & Not Important</h3>
          <div className="task-placeholder">
            <p>Add tasks here...</p>
          </div>
        </div>

        {/* Not Urgent & Not Important */}
        <div className="grid-item not-urgent-not-important">
          <h3>Not Urgent & Not Important</h3>
          <div className="task-placeholder">
            <p>Add tasks here...</p>
          </div>
                 </div>
       </div>
     </div>
   </div>
 );
};

export default PriorityGrid;
