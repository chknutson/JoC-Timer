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
