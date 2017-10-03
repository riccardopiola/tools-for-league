import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import app from './appReducer';
import ping from './pingReducer';
import settings from './settingsReducer';
import config from './configReducer';

const rootReducer = combineReducers({
  router,
  app,
  ping,
  settings,
  config
});

export default rootReducer;
