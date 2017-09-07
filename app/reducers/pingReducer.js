// @flow
import { REFRESHING_PING, NEW_PING, RESET_PING } from '../actions/pingActions';

export type pingStateType = {
  completed?: number,
  ping?: number
};

type actionType = {
  type: string,
  value?: any
};

export default function ping(state: pingStateType = {}, action: actionType) {
  switch (action.type) {
    case REFRESHING_PING:
      return {
        ...state,
        completed: (state.completed + 1000)
      };
    case NEW_PING:
      return {
        ...state,
        ping: action.value,
        completed: 0
      };
    case RESET_PING:
      return {
        ...state,
        ping: -1
      };
    default:
      return state;
  }
}
