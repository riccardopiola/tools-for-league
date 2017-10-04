// @flow
import initialState from '../store/initialState';
import type { Action } from '../actions/Actions.flow';

export type AppState = {
  +permissionToExit: boolean
};

function app(state: AppState = initialState.app, action: Action): AppState {
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
