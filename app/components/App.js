// @flow
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import HomeIcon from 'material-ui/svg-icons/action/home';
import PingIcon from 'material-ui/svg-icons/image/timelapse';
import SwapIcon from 'material-ui/svg-icons/action/swap-horiz';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import type { appStateType } from '../reducers/appReducer';
import PingPage from '../containers/PingPage';
import ConfigSwapperPage from '../containers/ConfigSwapperPage';
import Home from './Home/Home';
import SettingsPage from '../containers/SettingsPage';
import { darkModifications, lightModifications } from '../themes';

const darkTheme = getMuiTheme(darkBaseTheme, darkModifications);
const lightTheme = getMuiTheme(lightBaseTheme, lightModifications);

const selectedStyle = { backgroundColor: 'rgba(0,0,0,0.4)' };
const menuStyle = { width: '250px', fontSize: '17px' };

export default class App extends Component {
  props: {
    changeSubApp: ({ }, string) => void,
    appState: appStateType
  };
  renderSubApp() {
    switch (this.props.appState.selectedSubApp) {
      case 'Ping':
        return <PingPage />;
      case 'ConfigSwapper':
        return <ConfigSwapperPage />;
      case 'Settings':
        return <SettingsPage />;
      default:
        return <Home />;
    }
  }
  render() {
    const subApp = this.renderSubApp();
    return (
      <div className="app-container">
        <MuiThemeProvider muiTheme={darkTheme}>
          <Paper className="navigation-container" zDepth={4}>
            <AppBar
              showMenuIconButton={false}
              title="League Tools"
            />
            <Menu
              value={this.props.appState.selectedSubApp}
              selectedMenuItemStyle={selectedStyle}
              menuItemStyle={menuStyle}
              onChange={this.props.changeSubApp}
            >
              <MenuItem value="Home" leftIcon={<HomeIcon />}>Home</MenuItem>
              <MenuItem value="Ping" leftIcon={<PingIcon />}>Pingtest</MenuItem>
              <MenuItem value="ConfigSwapper" leftIcon={<SwapIcon />}>Config Swapper</MenuItem>
              <MenuItem value="Settings" leftIcon={<SettingsIcon />}>Settings</MenuItem>
            </Menu>
          </Paper>
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={lightTheme}>
          <Paper className="app-space">
            {subApp}
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}
