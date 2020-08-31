import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" isPrivate component={Dashboard} />
    </Switch>
  );
};

export default Routes;
