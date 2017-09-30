// @flow
import { REFRESHING_PING, NEW_PING, END_LOADING, CHANGE_READY_STATE, RESET_PING } from '../actions/pingActions';

export type pingStateType = {
  completed?: number,
  ping?: number,
  ready?: boolean
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
      };
    case END_LOADING:
      return {
        ...state,
        completed: 0
      };
    case CHANGE_READY_STATE:
      return {
        ...state,
        ready: action.value
      };
    case RESET_PING:
      return {
        ...state,
        ping: -2,
        completed: 1000
      };
    default:
      return state;
  }
}
