// @flow
import { combineReducers } from 'redux';
import app from './app';
import data from './dataReducer';
import game from './gameReducer';
import timers from './timerReducer';
import firebase from './firebaseReducer';

const rootReducer = combineReducers({
  app,
  data,
  game,
  timers,
  firebase
});

export default rootReducer;
