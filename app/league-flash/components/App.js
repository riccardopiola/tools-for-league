// @flow
import React, { Component } from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import HomePage from '../containers/HomePage';
import GamePage from '../containers/GamePage';
// import { darkModifications, lightModifications } from '../../themes';
import '../league-app.global.css';

// const darkTheme = getMuiTheme(darkBaseTheme, darkModifications);
// const lightTheme = getMuiTheme(lightBaseTheme, lightModifications);

export default class App extends Component {
  props: {
    home: boolean,
    showHome: (boolean) => void
  }
  render() {
    return (
        (this.props.home) ? <HomePage /> : <GamePage />
    );
  }
}
