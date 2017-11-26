/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';

import Home from './Home/Home';
import PingPage from '../containers/PingPage';
import ConfigSwapperPage from '../containers/ConfigSwapperPage';
import LeagueFlashLauncher from '../containers/LeagueFlashLauncher';
import SettingsPage from '../containers/SettingsPage';

export default () => (
  <Switch>
    <Route path="/home" component={Home} />
    <Route path="/config-swapper" component={ConfigSwapperPage} />
    <Route path="/ping" component={PingPage} />
    <Route path="/league-flash" component={LeagueFlashLauncher} />
    <Route path="/settings" component={SettingsPage} />
  </Switch>
);
