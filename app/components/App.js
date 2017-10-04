// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
// import { Link } from 'react-router-dom';
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

import { darkModifications, lightModifications } from '../themes';
// import styles from './App.css';

const darkTheme = getMuiTheme(darkBaseTheme, darkModifications);
const lightTheme = getMuiTheme(lightBaseTheme, lightModifications);

const selectedStyle = { backgroundColor: 'rgba(0,0,0,0.4)' };
const menuStyle = { width: '250px', fontSize: '17px' };

type Props = {
  children: Node,
  changeRoute: (string) => void,
  routerLocation: string
}

export default class App extends Component<Props> {
  handleChange = (event: Object, value: string) => {
    this.props.changeRoute(value);
  }
  render() {
    return (
      <div className="app-container">
        <MuiThemeProvider muiTheme={darkTheme}>
          <Paper className="navigation-container" zDepth={4}>
            <AppBar
              showMenuIconButton={false}
              title="League Tools"
            />
            <Menu
              value={this.props.routerLocation}
              selectedMenuItemStyle={selectedStyle}
              menuItemStyle={menuStyle}
              onChange={this.handleChange}
            >
              <MenuItem value="/home" leftIcon={<HomeIcon />}>
                Home
              </MenuItem>
              <MenuItem value="/ping" leftIcon={<PingIcon />}>
                Pingtest
              </MenuItem>
              <MenuItem value="/config-swapper" leftIcon={<SwapIcon />}>
                Config Swapper
              </MenuItem>
              <MenuItem value="/settings" leftIcon={<SettingsIcon />}>
                Settings
              </MenuItem>
            </Menu>
          </Paper>
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={lightTheme}>
          <Paper className="app-space">
            <div></div>
            {this.props.children}
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}
