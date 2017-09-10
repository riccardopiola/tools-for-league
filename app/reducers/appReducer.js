// @flow
import { CHANGE_SUBAPP, CAN_CHANGE_SUBAPP, OPEN_CLOSE_DIALOG } from '../actions/appActions';

export type appStateType = {
  selectedSubApp?: string,
  canChangeSubApp?: boolean,
  openExitDialog?: boolean
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
      return {
        ...state,
        openExitDialog: true
      };
    }
    case CAN_CHANGE_SUBAPP: {
      if (action.value === true) {
        return {
          ...state,
          canChangeSubApp: action.value
        };
      }
      return {
        ...state,
        canChangeSubApp: action.value
      };
    }
    case OPEN_CLOSE_DIALOG:
      return {
        ...state,
        openExitDialog: action.value
      }
    default:
      return state;
  }
}
