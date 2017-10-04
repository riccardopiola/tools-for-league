import fs from 'fs';
import type { Action, Dispatch, GetState } from './Actions.flow';
import { changePermissionToExit } from './appActions';

/**
 * General purpoise method to update controlled components
 * @param {string|boolean} newValue The new value
 * @param {Array<string>} paths An array of paths in the redux store
 * @param {number} index The index of the stagedChanges to insert the newValue into, if its -1 it will push()
 */
export function handleChange(newValue: string | boolean, paths: string[], index: number): Action {
  if (paths.length !== 2)
    throw new Error('Too few/many arguments, 2 paths required');
  const stagedChange = { newValue, paths };
  // Eventually dispatch the newState
  return {
    type: 'SETTING_CHANGED',
    stagedChange,
    index
  };
}
/**
 * Gets called inside a component
 * @param {number} index Index of the stagedChange to delete
 */
export function discardChange(index: number): Action {
  return { type: 'SETTING_DISCARD_CHANGE', index };
}
/**
 * Discard all changes
 */
export function discardAllChanges(): Action {
  return { type: 'SETTING_DISCARD_ALL_CHANGES' };
}
/**
 * Function to save the staged settings changes to the disk
 */
export function saveSettings() {
  return (dispatch: Dispatch, getState: GetState) => {
    const settingsStore = getState().settings;
    if (settingsStore.exitDialogOpen) // Close the dialog if open
      dispatch(openCloseExitDialog(false));
    const stagedChanges = settingsStore.stagedChanges;
    const newSettings = stagedChanges.reduce(
      (obj: Object, change: { newValue: string | boolean, paths: string[] } | typeof undefined) => {
        if (typeof change === 'undefined')
          return obj;
        return {
          ...obj,
          [change.paths[0]]: {
            ...obj[change.paths[0]],
            [change.paths[1]]: change.newValue
          }
        };
      }, { ...settingsStore.local });
    console.log(newSettings);
    fs.writeFile(`${settingsStore.local.general.dataPath}/settings.json`, JSON.stringify(newSettings), err => {
      if (err)
        console.error(err);
      else {
        dispatch(changePermissionToExit(true));
        dispatch({ type: 'SETTINGS_SAVED', newSettings });
      }
    });
  };
}
/**
 * Function useful for implementing the "Are you sure you want to exit?"
 * @param {boolean} dialogOpen The Dialog is open
 */
export function openCloseExitDialog(dialogOpen: boolean): Action {
  return {
    type: 'SETTING_OPEN_CLOSE_DIALOG',
    dialogOpen
  };
}

