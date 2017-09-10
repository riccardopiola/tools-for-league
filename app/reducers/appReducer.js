// @flow
import { CHANGE_SUBAPP, CAN_CHANGE_SUBAPP } from '../actions/appActions';

export type appStateType = {
  selectedSubApp?: string,
  canChangeSubApp?: boolean,
  wantToChangeSubApp?: boolean
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
        wantToChangeSubApp: true
      };
    }
    case CAN_CHANGE_SUBAPP: {
      if (action.value === true) {
        return {
          ...state,
          canChangeSubApp: action.value,
          wantToChangeSubApp: false
        };
      }
      return {
        ...state,
        canChangeSubApp: action.value
      };
    }
    default:
      return state;
  }
}
