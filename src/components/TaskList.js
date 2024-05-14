import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onTaskSelect, onDelete }) => {
  return (
    <div>
      <ul>
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onTaskSelect={onTaskSelect}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
