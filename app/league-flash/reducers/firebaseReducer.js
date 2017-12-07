// @flow
import firebase from 'firebase';
import type { Action } from '../actions/Actions.flow';
import type GameData from './gameReducer';

export type FirebaseState = {
  firebaseEnabled: boolean,
  db: any,
  gameId?: string
}

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAwOp-WVRoDszpsUOKEqO4r3oqcaSPwmsw',
  authDomain: 'ilic-bot.firebaseapp.com',
  databaseURL: 'https://ilic-bot.firebaseio.com',
  projectId: 'ilic-bot',
  storageBucket: 'ilic-bot.appspot.com',
  messagingSenderId: '819831706596'
};
firebase.initializeApp(config);

const defaultState = {
  firebaseEnabled: true,
  db: firebase.database()
};

function firebaseReducer(state: FirebaseState = defaultState, action: Action) {
  if (!state.firebaseEnabled)
    return state;
  switch (action.type) {
    case 'UPLOAD_GAME_DATA':
      db
        .ref('leagueFlash')
        .child(action.payload.timestamp)
        .child('gameData')
        .transaction(currentValue => {
          if (currentValue === null)
            return action.payload;
          console.log('Game already uploaded');
        });
      return {
        ...state,
        gameId: action.payload.timestamp
      };
    case 'ACTIVATE_TIMER':
      db
        .ref('leagueFlash')
        .child(state.gameId)
        .child('timers')
        .child(`${action.summonerName}::${action.spellName}`)
        .transaction(currentValue => {
          if (currentValue === null)
            return {
              summonerName: action.summonerName,
              spellName: action.spellName,
              endAt: action.endAt
            };
          console.log('Timer already set');
        });
      break;
    case 'TERMINATE_TIMER':
      db
        .ref('leagueFlash')
        .child(state.gameId)
        .child('timers')
        .child(`${action.summonerName}::${action.spellName}`)
        .remove();
      break;
    default:
      return state;
  }
  return state;
}

export default firebaseReducer;
