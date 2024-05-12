import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchTasks } from './actions/taskActions';
import { fetchTeamMembers } from './actions/teammembersActions';

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);
  const teamMembers = useSelector(state => state.teamMembers);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchTeamMembers());
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Management System</h1>
      </header>
      <main>
        <div className="Tasks">
          <h2>Tasks</h2>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>{task.description}</li>
            ))}
          </ul>
        </div>
        <div className="TeamMembers">
          <h2>Team Members</h2>
          <ul>
            {teamMembers.map(member => (
              <li key={member.id}>{member.name} - {member.role}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
