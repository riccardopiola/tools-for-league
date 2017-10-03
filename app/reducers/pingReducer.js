// @flow
import initialState from '../store/initialState';
import type { Action } from '../actions/Actions.flow';

export type pingState = {
  +display: 'GO' | 'LOADING' | 'GRAPH',
  +completed: boolean,
  +pingsArray: Array<{ ms: number, index: number, timestamp: number }>
};

function ping(state: pingState = initialState.ping, action: Action): pingState {
  switch (action.type) {
    case 'START_PING': {
      return {
        ...state,
        display: 'LOADING',
        completed: false
      };
    }
    case 'DISPLAY_GRAPH': {
      return {
        ...state,
        display: 'GRAPH'
      };
    }
    case 'RESET_PING': {
      return {
        ...state,
        display: 'GO',
        completed: true,
        pingsArray: []
      };
    }
    case 'NEW_PING': {
      return {
        ...state,
        pingsArray: [...state.pingsArray, action.value]
      };
    }
    case 'END_PING': {
      return {
        ...state,
        completed: true
      };
    }
    default:
      return state;
  }
}

export default ping;
