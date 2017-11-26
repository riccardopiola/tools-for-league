// @flow
import React from 'react';
import { Provider } from 'react-redux';
import AppPage from './AppPage';

type RootType = {
  store: {}
};

export default function Root({ store }: RootType) {
  return (
    <Provider store={store}>
      <AppPage />
    </Provider>
  );
}
