import React, { useState } from 'react';
import './EditTaskPopup.css';
import axios from 'axios';

const EditTaskPopup = ({ task, onUpdate, onCancel, fetchAllTasks }) => {
  const [editedTask, setEditedTask] = useState({ ...task });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const updatedTaskData = { ...editedTask };
      await axios.put(`http://localhost:1725/api/v1/task/${editedTask.id}`, updatedTaskData);
      setSuccessMessage('Task updated successfully');
      onUpdate(updatedTaskData);
      fetchAllTasks();
      // Close the popup after successful update
      onCancel();
    } catch (error) {
      setErrorMessage('Error updating task');
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="edit-task-popup">
      <div className="edit-task-popup-content">
        <h2>Edit Task</h2>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <label> Team Member Name:</label>
        <input type="text" name="teamMemberName" value={editedTask.teamMemberName} onChange={handleChange} />
        <label>Title:</label>
        <input type="text" name="title" value={editedTask.title} onChange={handleChange} />
        <label>Description:</label>
        <textarea name="description" value={editedTask.description} onChange={handleChange} />
        <label>Status:</label>
        <select name="status" value={editedTask.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <div className="edit-task-popup-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskPopup;
