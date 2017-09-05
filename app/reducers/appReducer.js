// @flow
import { CHANGE_SUBAPP } from '../actions/appActions';

export type appStateType = {
  selectedSubApp?: string
};

type actionType = {
  type: string,
  value?: string
};

export default function app(state: appStateType = {}, action: actionType) {
  switch (action.type) {
    case CHANGE_SUBAPP:
      return {
        ...state,
        selectedSubApp: action.value
      };
    default:
      return state;
  }
}
