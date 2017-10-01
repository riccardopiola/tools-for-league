// @flow
import React, { Component, Children } from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
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

import Home from './Home/Home';
import PingPage from '../containers/PingPage';
import ConfigSwapperPage from '../containers/ConfigSwapperPage';
import SettingsPage from '../containers/SettingsPage';

import type { appStateType } from '../reducers/appReducer';

import { darkModifications, lightModifications } from '../themes';
import styles from './App.css';

const darkTheme = getMuiTheme(darkBaseTheme, darkModifications);
const lightTheme = getMuiTheme(lightBaseTheme, lightModifications);

const selectedStyle = { backgroundColor: 'rgba(0,0,0,0.4)' };
const menuStyle = { width: '250px', fontSize: '17px' };

export default class App extends Component {
  props: {
    children: Children,
    changeRoute: (string) => void
  }
  state = {
    menuItem: '/'
  }
  handleChange = (event: Object, value: string) => {
    this.props.changeRoute(value);
    this.setState({ menuItem: value });
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
              value={this.state.menuItem}
              selectedMenuItemStyle={selectedStyle}
              menuItemStyle={menuStyle}
              onChange={this.handleChange}
            >
              <MenuItem value="/" leftIcon={<HomeIcon />}>
                <Link to="/" className={styles.link}>Home</Link>
              </MenuItem>
              <MenuItem value="/ping" leftIcon={<PingIcon />}>
                <Link to="/ping" className={styles.link}>Pingtest</Link>
              </MenuItem>
              <MenuItem value="/config-swapper" leftIcon={<SwapIcon />}>
                <Link to="/config-swapper" className={styles.link}>Config Swapper</Link>
              </MenuItem>
              <MenuItem value="/settings" leftIcon={<SettingsIcon />}>
                <Link to="/settings" className={styles.link}>Settings</Link>
              </MenuItem>
            </Menu>
          </Paper>
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={lightTheme}>
          <Paper className="app-space">
            {this.props.children}
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}
