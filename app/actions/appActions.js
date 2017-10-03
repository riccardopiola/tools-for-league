// @flow
import { push } from 'react-router-redux';
import {
  typeof dispatch as Dispatch,
  typeof getState as GetState
} from 'redux-thunk';
import { openCloseExitDialog } from './settingsActions';

type changePermissionToExitAction = {
  type: 'PERMISSION_TO_EXIT',
  canChange: boolean
};

/**
 * Simple wrapper to change location alternative to <Link>
 * @param {string} route The URL to go to
 */
export function changeRoute(route: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    if (!getState().app.permissionToExit) {
      dispatch(openCloseExitDialog(true));
      return;
    }
    dispatch(push(route));
  };
}
/**
 * Function useful for implementing the "Are you sure you want to exit?"
 * @param {boolean} canChange Can leave the current plugin
 */
export function changePermissionToExit(canChange: boolean): changePermissionToExitAction {
  return {
    type: 'PERMISSION_TO_EXIT',
    canChange
  };
}

