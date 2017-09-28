import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { configureStore, history } from './league-flash/store/configureStore';
import getInitialState from './league-flash/store/initialState';
import Root from './league-flash/containers/Root';
import './app.global.css';

const store = configureStore(getInitialState());


render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./league-flash/containers/Root', () => {
    const NextRoot = require('./league-flash/containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
