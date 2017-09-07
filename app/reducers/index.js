// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import app from './appReducer';
import ping from './pingReducer';

const rootReducer = combineReducers({
  router,
  app,
  ping
});

export default rootReducer;
