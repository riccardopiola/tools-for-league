import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { configureStore, history } from './store/configureStore';
import initialState from './store/initialState';
import getLocalState from './store/getLocalState';
import Root from './containers/Root';
import './app.global.css';

const store = configureStore(initialState);
store.dispatch(getLocalState());

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
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
