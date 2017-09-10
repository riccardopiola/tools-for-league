// @flow
export const CHANGE_SUBAPP = 'CHANGE_SUBAPP';
export const CAN_CHANGE_SUBAPP = 'CAN_CHANGE_SUBAPP';
export const OPEN_CLOSE_DIALOG = 'OPEN_CLOSE_DIALOG';

export function changeSubApp(e: {}, value: string) {
  return {
    type: CHANGE_SUBAPP,
    value
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