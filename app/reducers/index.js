// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import app from './appReducer';
import ping from './pingReducer';
import settings from './settingsReducer';

const rootReducer = combineReducers({
  router,
  app,
  ping,
  settings
});

export default rootReducer;
