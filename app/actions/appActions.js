// @flow
export const CHANGE_SUBAPP = 'CHANGE_SUBAPP';
export const CAN_CHANGE_SUBAPP = 'CAN_CHANGE_SUBAPP';

export function changeSubApp(e: {}, value: string) {
  return {
    type: CHANGE_SUBAPP,
    value
  };
}

export function canChangeSubApp(value) {
  return {
    type: CAN_CHANGE_SUBAPP,
    value
  }
}