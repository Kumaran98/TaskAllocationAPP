import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskService from './services/TaskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    TaskService.getAllTasks()
      .then(response => setTasks(response.data.data)) // Updated to response.data.data
      .catch(error => console.error('Error fetching tasks:', error));
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  const handleTaskCreate = (task) => {
    TaskService.createTask(task)
      .then(response => {
        setTasks([...tasks, response.data]);
        setSelectedTask(null);
      })
      .catch(error => console.error('Error creating task:', error));
  };

  const handleTaskUpdate = (id, updatedTask) => {
    TaskService.updateTask(id, updatedTask)
      .then(() => {
        setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
        setSelectedTask(null);
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const handleTaskDelete = (id) => {
    TaskService.deleteTask(id)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <Router>
      <div className="App">
        <div className="top-bar" style={{ backgroundColor: 'blue', padding: '10px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '60px', position: 'fixed', top: 0, left: 0 }}>
          <h1 style={{ margin: '0' }}>Task Management System</h1>
          <Link to="/dashboard" style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: 'white', color: 'blue', borderRadius: '5px', cursor: 'pointer', textDecoration: 'none' }}>Dashboard</Link>
        </div>
        <div className="content" style={{ paddingTop: '20px', overflowY: 'auto', maxHeight: 'calc(100vh - 70px)' }}>
          <div className="container" style={{ marginTop: '80px' }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={  
                <div className="row">
                  <div className="col">
                    <TaskList
                      tasks={tasks}
                      onTaskSelect={handleTaskSelect}
                      onDelete={handleTaskDelete}
                    />
                  </div>
                  <div className="col">
                    <TaskForm
                      task={selectedTask}
                      onCreate={handleTaskCreate}
                      onUpdate={handleTaskUpdate}
                      onCancel={() => setSelectedTask(null)}
                    />
                  </div>
                </div>
              } />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: '#333', color: 'white', padding: '15px', textAlign: 'center'}}>
      Task Management System &copy; {new Date().getFullYear()}
    </footer>
  );
}

export default App;
export { Footer };
