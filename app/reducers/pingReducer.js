// @flow
import { START_PING, NEW_PING, END_PING, RESET_PING, DISPLAY_GRAPH } from '../actions/pingActions';

export type pingStateType = {
  display?: 'GO' | 'LOADING' | 'GRAPH',
  compelted?: boolean,
  pingsArray?: Array
};

type actionType = {
  type: string,
  value?: any
};

export default function ping(state: pingStateType = {}, action: actionType) {
  switch (action.type) {
    case START_PING: {
      return {
        ...state,
        display: 'LOADING',
        completed: false
      };
    }
    case DISPLAY_GRAPH: {
      return {
        ...state,
        display: 'GRAPH'
      };
    }
    case RESET_PING: {
      return {
        ...state,
        display: 'GO',
        completed: true,
        pingsArray: []
      };
    }
    case NEW_PING: {
      return {
        ...state,
        pingsArray: [...state.pingsArray, action.value]
      };
    }
    case END_PING: {
      return {
        ...state,
        completed: true
      };
    }
    default:
      return state;
  }
}
