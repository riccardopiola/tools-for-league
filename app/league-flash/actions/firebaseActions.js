// @flow
import type { GameData } from '../reducers/dataReducer';
import type { SpellType } from '../reducers/gameReducer';

export function uploadGameData(gameData: GameData) {
  return {
    type: 'UPLOAD_GAME_DATA',
    payload: gameData
  };
}

export function activateTimerFromFirebase(summonerName, spellName, endAt) {
  return (dispatch, getState) => {
    const spell: SpellType =
      getState().game.activeChampions.find(champ => champ.summonerName === summonerName)[spellName];
    // IF the timer is already present, discard
    if (spell.endAt)
      return;
    // Else if there is no active timer locally, activate it
    dispatch({
      type: 'ACTIVATE_TIMER',
      summonerName,
      spellName,
      endAt
    });
  };
}

export function terminateTimerFromFirebase(summonerName, spellName, ) {
  return (dispatch, getState) => {
    const spell: SpellType =
      getState().game.activeChampions.find(champ => champ.summonerName === summonerName)[spellName];
    // If the timer is present, remove it
    if (spell.endAt)
      dispatch({
        type: 'TERMINATE_TIMER',
        summonerName,
        spellName
      });
    // Else if there is no active timer locally, do nothing
  };
}
