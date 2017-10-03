// This file contains all the action types and payloads
import type { SettingsType } from '../store/initialState';

export type Actions =
/** ROUTER */
  | { type: 'LOCATION_CHANGE', payload: any }
/** SETTINGS */
  | {
    type: 'SETTING_CHANGED',
    stagedChange: {
      newValue: string | boolean,
      paths: string[]
    },
    index: number
  }
  | { type: 'SETTINGS_SAVED', newSettings: SettingsType }
  | { type: 'SETTING_DISCARD_CHANGE', index: number }
  | { type: 'SETTING_DISCARD_ALL_CHANGES' }
  | { type: 'OPEN_CLOSE_DIALOG', dialogOpen: boolean }
  | { type: 'INIT_LOCAL_SETTINGS', payload: SettingsType }
/** APP */
  | { type: 'PERMISSION_TO_EXIT', canChange: boolean }
/** PING */
  | { type: 'START_PING' }
  | { type: 'DISPLAY_GRAPH' }
  | { type: 'RESET_PING' }
  | { type: 'NEW_PING', value: Array<{ ms: number, index: number, timestamp: number }>}
  | { type: 'END_PING' }
/** CONFIG */
  | { type: 'REFRESH_SAVED_CONFIGS' }
  | { type: 'REFRESH_TEMP_CONFIGS' };
