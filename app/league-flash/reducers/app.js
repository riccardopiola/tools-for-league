// @flow
import type { Action } from '../actions/Actions.flow';

const defaultState = {
  route: '/',
  message: ''
};

function appReducer(state: {} = defaultState, action: Action) {
  switch (action.type) {
    case 'CHANGE_ROUTE':
      return {
        ...state,
        route: action.route,
        message: action.message
      };
    case 'CHANGE_SETTINGS':
      return {
        ...state,
        settings: action.payload
      };
    default:
      return state;
  }
}

export default appReducer;
