// @flow
import initialState from '../store/initialState';
import type { Action } from '../actions/Actions.flow';

export type ConfigState = {
  +savedConfigurations: [],
  +tempConfigurations: []
};

function config(state: ConfigState = initialState.config, action: Action): ConfigState {
  switch (action.type) {
    case 'REFRESH_SAVED_CONFIGS':
      return {
        ...state,
        savedConfigurations: action.value
      };
    case 'REFRESH_TEMP_CONFIGS':
      return {
        ...state,
        tempConfigurations: action.value
      };
    default:
      return state;
  }
}

export default config;
