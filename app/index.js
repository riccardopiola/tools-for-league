import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import { configureStore, history } from './store/configureStore';
import initialState from './store/initialState';
import Root from './containers/Root';
import './app.global.css';

const store = configureStore(initialState);
const modifications = {
  palette: {
    primary1Color: '#c9aa71',
    primary2Color: '#c9aa71',
    primary3Color: '#c9aa71',
    accent1Color: '#896c3d',
    accent2Color: '#896c3d',
    accent3Color: '#896c3d',
    textColor: '#eae0d8',
    secondaryTextColor: '#f1e6d0'
  }
};
const customTheme = getMuiTheme(darkBaseTheme, modifications);

render(
  <MuiThemeProvider muiTheme={customTheme}>
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>
  </MuiThemeProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
