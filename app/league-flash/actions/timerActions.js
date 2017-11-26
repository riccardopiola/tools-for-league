// @flow
import type { ActiveChampionObj } from '../reducers/gameReducer';
import type { TimerState, SpellsEnum } from '../reducers/timerReducer';

type ActiveChampions = Array<ActiveChampionObj>;

// WIll become useful with firebase
export function initiateTimers(activeChampions: ActiveChampions) {
  const initialState = activeChampions.reduce((newState, champ) => {
    return {
      ...newState,
      [champ.summonerName]: new Map()
    };
  }, {});
  return {
    type: 'INITIATE_TIMERS',
    initialState
  };
}

export function timerTick() {
  return (dispatch, getState) => {
    const oldTimers: TimerState = getState().timers;
    // Loop over each player
    const newTimers = Object.keys(oldTimers).reduce((obj: TimerState, summonerName: string) => {
      // Create a new Map with the updated timers
      const updatedMap: Map<SpellsEnum, number> = new Map();
      oldTimers[summonerName].forEach((timeout: number, spellName: SpellsEnum) => {
        // Remove a timer if it has run out (dispatching directly to bypass firebase upload)
        if (timeout === 0) {
          dispatch({
            type: 'TERMINATE_TIMER',
            summonerName,
            spellName
          });
        } else {
          // Update a timer
          updatedMap.set(spellName, timeout - 1);
        }
      });
      return {
        ...obj,
        [summonerName]: updatedMap
      };
    }, {});
    dispatch({
      type: 'NEW_TICK',
      newTimers
    });
  };
}
