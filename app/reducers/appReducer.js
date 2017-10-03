// @flow
import initialState from '../store/initialState';
import type { Action } from '../actions/Actions.flow';

export type appState = {
  +permissionToExit: boolean
};

function app(state: appState = initialState.app, action: Action): appState {
  switch (action.type) {
    case 'PERMISSION_TO_EXIT':
      return {
        ...state,
        permissionToExit: action.canChange
      };
    default:
      return state;
  }
}

export default app;
