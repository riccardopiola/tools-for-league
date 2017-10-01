// @flow
export const CAN_CHANGE_SUBAPP = 'CAN_CHANGE_SUBAPP';
export const OPEN_CLOSE_DIALOG = 'OPEN_CLOSE_DIALOG';

import { push } from 'react-router-redux'

export function changeRoute(route: string) {
  return dispatch => {
    dispatch(push(route));
  };
}

export function changeCanChangeSubApp(value: boolean) {
  return {
    type: CAN_CHANGE_SUBAPP,
    value
  }
}

export function openCloseDialog(value: boolean) {
  return {
    type: OPEN_CLOSE_DIALOG,
    value
  }
}
