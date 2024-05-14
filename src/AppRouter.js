// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskForm from './TaskForm';
import Dashboard from './Dashboard';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TaskForm} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
