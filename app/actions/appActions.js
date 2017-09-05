// @flow
export const CHANGE_SUBAPP = 'CHANGE_SUBAPP';

export function changeSubApp(e: {}, value: string) {
  return {
    type: CHANGE_SUBAPP,
    value
  };
}
