// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import AppPage from './AppPage';
import Routes from '../components/routes';

type RootType = {
  store: {},
  history: {}
};

export default function Root({ store, history }: RootType) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppPage>
          <Routes />
        </AppPage>
      </ConnectedRouter>
    </Provider>
  );
}
