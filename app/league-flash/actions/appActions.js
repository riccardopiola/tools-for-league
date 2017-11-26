// @flow
import { ipcRenderer } from 'electron';

export function changeRoute(route: string, message?: string = '') {
  return (dispatch, getState) => {
    if (route === 'game') {
      ipcRenderer.send('enter-game-mode');
      if (getState().game.clickEnabled === true)
        ipcRenderer.send('set-focusable', 'drop-focus');
    } else if (getState().app.route === 'game') {
      ipcRenderer.send('leave-game-mode');
    }
    dispatch({
      type: 'CHANGE_ROUTE',
      route,
      message
    });
  };
}
