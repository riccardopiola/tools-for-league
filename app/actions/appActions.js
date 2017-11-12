// @flow
import { push } from 'react-router-redux';
import { openCloseExitDialog } from './settingsActions';

import type { Action, ThunkAction, Dispatch, GetState } from './Actions.flow';

/**
 * Simple wrapper to change location alternative to <Link>
 * @param {string} route The URL to go to
 * @param {boolean?} withCheck Whether perfor a check against permissionToExit (default: true)
 */
export function changeRoute(route: string, withCheck: boolean = true): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    if (withCheck) {
      if (!getState().app.permissionToExit) {
        dispatch(updateWannaGoTo(route));
        dispatch(openCloseExitDialog(true));
        return;
      }
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
/**
 * Saved the desired location change when it has been denied
 * @param {string} path Desired path
 */
export function updateWannaGoTo(path: string): Action {
  return {
    type: 'WANNA_GO_TO',
    path
  };
}

