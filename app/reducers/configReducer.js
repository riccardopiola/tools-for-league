// @flow
import { REFRESH_SAVED_CONFIGS, REFRESH_TEMP_CONFIGS } from '../actions/configActions';

export type configStateType = {
  savedConfigurations?: Array,
  tempConfigurations?: Array
};

type actionType = {
  type: string,
  value?: any
};

export default function config(state: configStateType = {}, action: actionType) {
  switch (action.type) {
    case REFRESH_SAVED_CONFIGS:
      return {
        ...state,
        savedConfigurations: action.value
      };
    case REFRESH_TEMP_CONFIGS:
      return {
        ...state,
        tempConfigurations: action.value
      };
    default:
      return state;
  }
}
