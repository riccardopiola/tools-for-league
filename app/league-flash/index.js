import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ipcRenderer } from 'electron';

import configureStore from './store/configureStore';
import Root from './containers/Root';
import { setCurrentPatch } from './actions/dataActions';
import { changeRoute } from './actions/appActions';

import './styles/league-app.global.css';

const store = configureStore();

ipcRenderer.on('settings', (event, settingsString: string) => {
  const settings = JSON.parse(settingsString);
  store.dispatch({
    type: 'CHANGE_SETTINGS',
    payload: settings
  });
  store.dispatch(setCurrentPatch(settings.currentPatch));
  store.dispatch(changeRoute('home'));
});

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
