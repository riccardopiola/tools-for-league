/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import Ping from './components/Ping';
import Home from './components/Home';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/ping" component={Ping} />
    </Switch>
  </App>
);
