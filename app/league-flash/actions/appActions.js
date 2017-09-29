// @flow
export const appActionsTypes = {
  SHOW_HOME: 'SHOW_HOME'
};

export function showHome(home: boolean) {
  return {
    type: appActionsTypes.SHOW_HOME,
    value: home
  };
}
