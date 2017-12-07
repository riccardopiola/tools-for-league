// @flow
import { ipcRenderer } from 'electron';
import type { SpellType, ActiveChampionObj } from '../reducers/gameReducer';
import type { SpellsEnum } from '../reducers/timerReducer';

export function initiateActiveChampionsArray(activeChampions: ActiveChampionObj[]) {
  return {
    type: 'NEW_ACTIVE_CHAMPIONS_ARRAY',
    activeChampions
  };
}

export function toggleEnableClick() {
  return (dispatch, getState) => {
    const isEnabled = getState().game.clickEnabled;
    ipcRenderer.send('set-focusable', (isEnabled) ? 'focus' : 'drop-focus');
    dispatch({
      type: 'TOGGLE_ENABLE_CLICK',
    });
  };
}

export function toggleDisplayAll() {
  return {
    type: 'TOGGLE_DISPLAY_ALL'
  };
}

export function toggleTimer(summonerName: string, spellName: SpellsEnum) {
  return (dispatch, getState) => {
    const spell: SpellType =
      getState().game.activeChampions.find(champ => champ.summonerName === summonerName)[spellName];
    // Useful variables
    // If we already have a timer on thisSpell: terminate it
    if (spell.endAt) {
      // Terminate the timer
      dispatch({
        type: 'TERMINATE_TIMER',
        summonerName,
        spellName
      });
    } else { // If we dont have a timer on thisSpell: initiate it
      // Calulate end value
      const endAt = Math.round(Date.now() / 1000) + spell.cooldown;
      // Set the timer
      dispatch({
        type: 'ACTIVATE_TIMER',
        summonerName,
        spellName,
        endAt
      });
    }
  };
}
