// @flow
import initialState from '../store/initialState';
import type { Action } from '../actions/Actions.flow';

export type AppState = {
  +permissionToExit: boolean,
  wannaGoTo?: string
};

function app(state: AppState = initialState.app, action: Action): AppState {
  switch (action.type) {
    case 'PERMISSION_TO_EXIT':
      return {
        ...state,
        permissionToExit: action.canChange
      };
    case 'WANNA_GO_TO':
      return {
        ...state,
        wannaGoTo: action.path
      };
    default:
      return state;
  }
}

export default app;
