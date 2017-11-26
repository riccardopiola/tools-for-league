// @flow
import type { Action } from '../actions/Actions.flow';

export type GameState = {
  activeChampions: Array<ActiveChampionObj>,
  clickEnabled: boolean,
  displayAll: boolean,
}
export type ActiveChampionObj = {
  summonerName: string,
  championName: string,
  championId: string,
  spell1: SpellType,
  spell2: SpellType
}
export type SpellType = {
  spellId: string,
  spellName: string,
  spellColor: {
    color: string, // Background color for the timer
    txtColor: string // Text color for the timer
  },
  cooldown: number,
  endAt: number | null // Timestamp (seconds)
}

const defGameState = {
  activeChampions: [],
  clickEnabled: process.platform === 'darwin',
  displayAll: process.platform === 'darwin'
};

function game(state: GameState = defGameState, action: Action) {
  switch (action.type) {
    case 'NEW_ACTIVE_CHAMPIONS_ARRAY':
      return {
        ...state,
        activeChampions: action.activeChampions
      };
    case 'TOGGLE_ENABLE_CLICK':
      return {
        ...state,
        clickEnabled: !state.clickEnabled
      };
    case 'TOGGLE_DISPLAY_ALL':
      return {
        ...state,
        displayAll: !state.displayAll
      };
    case 'ACTIVATE_TIMER':
      return {
        ...state,
        activeChampions: state.activeChampions.map(champ => {
          if (champ.summonerName !== action.summonerName)
            return champ;
          const spell = { ...champ[action.spellName], endAt: action.endAt };
          return {
            ...champ,
            [action.spellName]: spell
          };
        })
      };
    case 'TERMINATE_TIMER':
      return {
        ...state,
        activeChampions: state.activeChampions.map(champ => {
          if (champ.summonerName !== action.summonerName)
            return champ;
          const spell = { ...champ[action.spellName], endAt: null };
          return {
            ...champ,
            [action.spellName]: spell
          };
        })
      };
    default:
      return state;
  }
}

export default game;
