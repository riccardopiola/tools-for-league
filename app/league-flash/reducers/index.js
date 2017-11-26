// @flow
import { combineReducers } from 'redux';
import app from './app';
import data from './dataReducer';
import game from './gameReducer';
import timers from './timerReducer';

const rootReducer = combineReducers({
  app,
  data,
  game,
  timers
});

export default rootReducer;
