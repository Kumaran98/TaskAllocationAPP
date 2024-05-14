import React from 'react';

const Task = ({ task, onTaskSelect, onDelete }) => {
  return (
    <li onClick={() => onTaskSelect(task)}>
      <div>
        <p>Title: {task.title}</p>
        <p>Status: {task.status}</p>
        <p>Created Date: {task.createdDate}</p>
        <p>Updated Date: {task.updatedDate}</p>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}>Delete</button>
    </li>
  );
};

export default Task;