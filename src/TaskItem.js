// TaskItem.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../actions/taskActions';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div>
      <h3>{task.description}</h3>
      <p>Status: {task.status}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
