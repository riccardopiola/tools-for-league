import fs from 'fs';

import { CAN_CHANGE_SUBAPP, OPEN_CLOSE_DIALOG } from './appActions';

export const SETTING_CHANGED = 'SETTING_CHANGED';

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

// General purpoise method to update controlled components
export function handleChange (newValue: string, ...paths: [string]): void {
  return (dispatch, getState) => {
    length newSettings;
    if (paths.length === 1)
      newSettings = { [paths[0]]: newValue };
    else if (paths.length === 2)
      newSettings = { [paths[0]]: { [paths[1]]: newValue } };
    else if (paths.length === 3)
      newSettings = { [paths[0]]: { [paths[1]]: { [paths[2]]: newValue } } };
    else if (paths.length > 3)
      console.error('List of paths is too long (max length = 3');
    // Eventually dispatch the newState
    dispatch({
      type: SETTING_CHANGED,
      value: newSettings
    });
  }
}

// TODO
save = () => {
  if (!validateChanges(this.state))
    return;
  this.props.saveSettings(this.state);
  this.props.changeCanChangeSubApp(true);
  this.props.openCloseDialog(false);
}
