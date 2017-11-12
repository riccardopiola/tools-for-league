// @flow
import initialState from '../store/initialState';
import type { SettingsType } from '../store/initialState';
import type { Action } from '../actions/Actions.flow';

export type SettingsState = {
  +local: SettingsType | 'loading',
  +stagedChanges: Array<{ newValue: string | boolean, paths: string[]} | typeof undefined>
};

function settings(state: SettingsState = initialState.settings, action: Action): SettingsState {
  switch (action.type) {
    case 'INIT_LOCAL_SETTINGS':
      return {
        ...state,
        local: action.payload
      };
    case 'SETTING_CHANGED': {
      const newArray = [...state.stagedChanges];
      if (action.index === -1)
        newArray.push(action.stagedChange);
      else if (action.index >= 0)
        newArray[action.index] = action.stagedChange;
      else
        throw new Error('index has to be -1 or higher');
      return {
        ...state,
        stagedChanges: newArray
      };
    }
    case 'SETTINGS_SAVED':
      return {
        ...state,
        local: action.newSettings,
        stagedChanges: []
      };
    case 'SETTING_DISCARD_CHANGE': {
      const newStagedChanges = [...state.stagedChanges];
      delete newStagedChanges[action.index];
      return {
        ...state,
        stagedChanges: newStagedChanges
      };
    }
    case 'SETTING_DISCARD_ALL_CHANGES':
      return {
        ...state,
        stagedChanges: []
      };
    case 'SETTING_OPEN_CLOSE_DIALOG':
      return {
        ...state,
        openExitDialog: action.dialogOpen
      };
    default:
      return state;
  }
}

export default settings;
