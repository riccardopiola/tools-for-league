import fs from 'fs';

import { CAN_CHANGE_SUBAPP, OPEN_CLOSE_DIALOG } from './appActions';

export function saveSettings(state: Object) {
  return (dispatch, getState) => {
    const newSettings = getState().settings;
    Object.keys(state).forEach(section => {
      Object.assign(newSettings[section], state[section]);
    });
    fs.writeFile(`${newSettings.general.dataPath}/settings.json`,
      JSON.stringify(newSettings), err => {
        if (err)
          console.error(err);
        else
          dispatch({ type: CAN_CHANGE_SUBAPP, value: true });
        dispatch({ type: OPEN_CLOSE_DIALOG, value: false });
      });
  };
}

