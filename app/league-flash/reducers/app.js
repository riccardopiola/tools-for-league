import { appActionsTypes } from '../actions/appActions';

export default function appReducer(state = {}, action) {
  switch (action.type) {
    case appActionsTypes.SHOW_HOME:
      return {
        ...state,
        home: action.value
      };
    default:
      return state;
  }
}
