// @flow
import { CHANGE_SUBAPP, CAN_CHANGE_SUBAPP } from '../actions/appActions';

export type appStateType = {
  selectedSubApp?: string,
  canChangeSubApp?: boolean
};

type actionType = {
  type: string,
  value?: any
};

export default function app(state: appStateType = {}, action: actionType) {
  switch (action.type) {
    case CHANGE_SUBAPP: {
      if (state.canChangeSubApp) {
        return {
          ...state,
          selectedSubApp: action.value
        };
      }
    }
    case CAN_CHANGE_SUBAPP:
      return {
        ...state,
        canChangeSubApp: action.value
      }
    default:
      return state;
  }
}
