import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import app from './appReducer';
import ping from './pingReducer';
import settings from './settingsReducer';
import config from './configReducer';

import type { AppState } from './appReducer';
import type { PingState } from './pingReducer';
import type { SettingsState } from './settingsReducer';
import type { ConfigState } from './configReducer';

export type StateType = 
  AppState &
  PingState &
  SettingsState &
  ConfigState
;

const rootReducer = combineReducers({
  router,
  app,
  ping,
  settings,
  config
});

export default rootReducer;
