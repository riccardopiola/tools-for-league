// @flow
import type { Action } from '../actions/Actions.flow';

export type SingleEnemyData = {
  championName: string, // Yasuo
  name: string, // TSM Bjergsen
  spell1: string, // SummonerFlash
  spell2: string, // SummonerHaste
}

export type GameData = {
  enemyTeam: 'Team-100' | 'Team-200',
  timestamp: string, // Timestamp accurate to the second
  enemies: Array<SingleEnemyData>
}

export type DataState = {
  progressbar: {
    progress: number,
    message: string
  },
  currentPatch?: string,
  gameData?: GameData
}

const defaultState = {
  progressbar: {
    progress: 0,
    message: ''
  }
};

function data(state: DataState = defaultState, action: Action) {
  switch (action.type) {
    case 'UPDATE_PROGRESS_BAR':
      return {
        ...state,
        progressbar: {
          progress: action.progress,
          message: action.message
        }
      };
    case 'NEW_SCRAPPED_DATA':
      return {
        ...state,
        gameData: action.data
      };
    case 'SET_CURRENT_PATCH':
      return {
        ...state,
        currentPatch: action.currentPatch
      };
    default:
      return state;
  }
}

export default data;
