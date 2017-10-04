// @flow
import { push } from 'react-router-redux';
import { openCloseExitDialog } from './settingsActions';

import type { Action, ThunkAction, Dispatch, GetState } from './Actions.flow';

/**
 * Simple wrapper to change location alternative to <Link>
 * @param {string} route The URL to go to
 */
export function changeRoute(route: string): ThunkAction {
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
export function changePermissionToExit(canChange: boolean): Action {
  return {
    type: 'PERMISSION_TO_EXIT',
    canChange
  };
}

