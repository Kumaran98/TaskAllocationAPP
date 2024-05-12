// TaskForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../actions/taskActions';

const TaskForm = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createTask({ description, status }));
    setDescription('');
    setStatus('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={e => setStatus(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
