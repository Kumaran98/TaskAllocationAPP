import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './TaskForm.css';
import EditTaskPopup from './EditTaskPopup';
import './EditTaskPopup.css';

const TaskForm = ({ onCreate, onUpdate, onDelete, onCancel }) => {
  const [tasks, setTasks] = useState([]);
  const [teamMemberName, setTeamMemberName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');
  const [formErrors, setFormErrors] = useState({ teamMemberName: '', description: '', status: '', createdDate: '', updatedDate: '' });
  const [statusFilter, setStatusFilter] = useState('all');
  const [teamMemberFilter, setTeamMemberFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const fetchAllTasks = useCallback(async () => {
    try {
      let url = 'http://localhost:1725/api/v1/task/get-all';
      const params = {};
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      if (teamMemberFilter) {
        params.teamMember = teamMemberFilter;
      }
      const response = await axios.get(url, { params });
      setTasks(response.data.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [statusFilter, teamMemberFilter]);

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const taskData = { teamMembers: { name: teamMemberName }, description, status, createdDate, updatedDate };

      try {
        await axios.post('http://localhost:1725/api/v1/task', taskData);
        setSuccessMessage('Your Task added successfully');
        fetchAllTasks();
      } catch (error) {
        setErrorMessage('Error adding task');
        console.error('Error creating task:', error);
      }

      setTeamMemberName('');
      setDescription('');
      setStatus('');
      setCreatedDate('');
      setUpdatedDate('');
    }
  };

  const validateForm = () => {
    let errors = { teamMemberName: '', description: '', status: '', createdDate: '', updatedDate: '' };
    let isValid = true;

    if (!teamMemberName.trim()) {
      errors.teamMemberName = 'Team Member Name is required';
      isValid = false;
    }

    if (!description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    }

    if (!status.trim()) {
      errors.status = 'Please select a status';
      isValid = false;
    }

    if (!createdDate.trim()) {
      errors.createdDate = 'Created Date is required';
      isValid = false;
    }

    if (!updatedDate.trim()) {
      errors.updatedDate = 'Updated Date is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:1725/api/v1/task/delete/${taskId}`);
      setSuccessMessage('Task deleted successfully');
      fetchAllTasks();
    } catch (error) {
      setErrorMessage('Error deleting task');
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = async (task) => {
    try {
      const updatedTaskData = { teamMembers: { name: teamMemberName }, description, status, createdDate, updatedDate };
      await axios.put(`http://localhost:1725/api/v1/task/${task.id}`, updatedTaskData);
      setSuccessMessage('Task updated successfully');
      fetchAllTasks();
    } catch (error) {
      setErrorMessage('Error updating task');
      console.error('Error updating task:', error);
    }
  };

  const handleClear = () => {
    setTeamMemberName('');
    setDescription('');
    setStatus('');
    setCreatedDate('');
    setUpdatedDate('');
  };

  const handleEditCancel = () => {
    setEditedTask(null);
    setShowEditPopup(false);
  };

  return (
  <div className="task-form-container">
    {successMessage && <div className="success-message">{successMessage}</div>}
    {errorMessage && <div className="error-message">{errorMessage}</div>}
    <h2 className="task-form-title">Add Task</h2>
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label className="form-label">Team Member Name:</label>
        <input type="text" value={teamMemberName} onChange={(e) => setTeamMemberName(e.target.value)} className="form-input" />
        {formErrors.teamMemberName && <span className="error">{formErrors.teamMemberName}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-textarea" />
        {formErrors.description && <span className="error">{formErrors.description}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
          <option value="">Please select</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        {formErrors.status && <span className="error">{formErrors.status}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Created Date:</label>
        <input type="date" value={createdDate} onChange={(e) => setCreatedDate(e.target.value)} className="form-input" />
        {formErrors.createdDate && <span className="error">{formErrors.createdDate}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Updated Date:</label>
        <input type="date" value={updatedDate} onChange={(e) => setUpdatedDate(e.target.value)} className="form-input" />
        {formErrors.updatedDate && <span className="error">{formErrors.updatedDate}</span>}
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">Add Task</button>
        <button type="button" onClick={handleClear} className="btn btn-secondary">Clear</button>
      </div>
    </form>

    <div className="filter-controls">
      <div className="filter-item">
        <label htmlFor="statusFilter">Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="teamMemberFilter">Team Member:</label>
        <input
          id="teamMemberFilter"
          type="text"
          value={teamMemberFilter}
          onChange={(e) => setTeamMemberFilter(e.target.value)}
          placeholder="Filter by team member..."
          className="filter-input"
        />
      </div>
    </div>

    <div className="task-list-container">
      <h2 className="task-list-title">All Tasks</h2>
      <ul className="task-list">
        {tasks.length === 0 ? (
          <li className="empty-task">No tasks available.</li>
        ) : (
          tasks.map(task => (
            <li key={task.id} className="task-item">
              <div className="task-details">
                <p className="task-label">Assign Team Member Name:</p>
                <p>{task.teamMembers.name}</p>
                <p className="task-label">Description:</p>
                <p style={{ textAlign: 'justify' }}>{task.description}</p>
                <p className="task-label">Status:</p>
                <p className={`task-status ${task.status.toLowerCase()}`}>{task.status}</p>
                <p className="task-label">Created Date:</p>
                <p>{task.createdDate}</p> {/* Add created date */}
                <p className="task-label">Updated Date:</p>
                <p>{task.updatedDate}</p> {/* Add updated date */}
              </div>
              <div className="task-actions">
                <button
                  type="button"
                  onClick={() => {
                    setEditedTask(task);
                    setShowEditPopup(true);
                  }}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(task.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>

    {showEditPopup && (
      <EditTaskPopup
        task={editedTask}
        onUpdate={(updatedTask) => {
          handleEditCancel();
          onUpdate(updatedTask);
        }}
        onCancel={handleEditCancel}
      />
    )}
  </div>
)}
export default TaskForm;