// @flow
import type { Action } from '../actions/Actions.flow';

export type TimerState = {
  [summonerName: string]: Map<SpellsEnum, number>
};
export type SpellsEnum = 'spell1'|'spell2';

function appReducer(state: TimerState = {}, action: Action) {
  switch (action.type) {
    case 'INITIATE_TIMERS':
      return { ...action.initialState };
    case 'NEW_TICK':
      return { ...action.newTimers };
    case 'ACTIVATE_TIMER':
      return {
        ...state,
        [action.summonerName]: new Map(state[action.summonerName])
          .set(action.spellName, action.endAt - Math.round(Date.now() / 1000))
      };
    case 'TERMINATE_TIMER':
      state[action.summonerName].delete(action.spellName);
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default appReducer;
