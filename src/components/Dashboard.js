import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ backgroundColor }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdateMessage, setStatusUpdateMessage] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:1725/api/v1/task/all');
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:1725/api/v1/task/${taskId}`, null, {
        params: { status: newStatus }
      });
      const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      });
      setTasks(updatedTasks);
      setStatusUpdateMessage('Status updated successfully');
      setTimeout(() => {
        setStatusUpdateMessage('');
      }, 3000); // Clear the message after 3 seconds
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
  
  const handleSubmit = (e, taskId) => {
    e.preventDefault();
    const newStatus = e.target.querySelector(`#status_${taskId}`).value;
    handleStatusChange(taskId, newStatus);
  };

  const toggleDescription = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, showDescription: !task.showDescription };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="dashboard-container" style={{ backgroundColor }}>
      <h1 className="dashboard-title">Task Dashboard</h1>
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <div className="task-details">
                <div className="task-info">
                  <p className="task-label">Assign Team Member Name:</p>
                  <p className="task-value">{task.teamMemberName}</p>
                  <p className="task-label">Title:</p>
                  <p className="task-value">{task.title}</p>
                  <div className="description-container">
                    <p className="task-label">Description:</p>
                    {task.showDescription ? (
                      <div>
                        <p style={{ textAlign: 'justify' }}>{task.description}</p>
                        <button
                          className="btn btn-show-more"
                          onClick={() => {
                            const updatedTasks = tasks.map(t => t.id === task.id ? { ...t, showDescription: false } : t);
                            setTasks(updatedTasks);
                          }}
                        >
                          Show Less
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p style={{ textAlign: 'justify' }}>{task.description.split(' ').slice(0, 55).join(' ')}</p>
                        {task.description.split(' ').length > 55 && (
                          <button
                            className="btn btn-show-more"
                            onClick={() => {
                              const updatedTasks = tasks.map(t => t.id === task.id ? { ...t, showDescription: true } : t);
                              setTasks(updatedTasks);
                            }}
                          >
                            Show More
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <form onSubmit={(e) => handleSubmit(e, task.id)}>
                  <div className="status-container">
                    <label htmlFor={`status_${task.id}`} className="task-label">Status:</label>
                    <select id={`status_${task.id}`} defaultValue={task.status} className="status-select">
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <button type="submit" className="submit-button">Update Status</button>
                  {statusUpdateMessage && <p className="status-update-message">{statusUpdateMessage}</p>}
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
