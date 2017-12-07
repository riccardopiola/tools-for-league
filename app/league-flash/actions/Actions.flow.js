// @flow
import type { GameData } from '../reducers/dataReducer';
import type { ActiveChampionObj } from '../reducers/gameReducer';
import type { TimerState, SpellsEnum } from '../reducers/timerReducer';

export type Action =
| {|
  type: string,
  payload: any
|} | {
  type: 'CHANGE_ROUTE',
  route: string,
  message: string
} | {
  type: 'CHANGE_SETTINGS',
  payload: {}
} | {
  type: 'UPDATE_PROGRESS_BAR',
  progress: number,
  message: string
} | {
  type: 'NEW_SCRAPPED_DATA',
  data: GameData
} | {
  type: 'NEW_ACTIVE_CHAMPIONS_ARRAY',
  activeChampions: Array<ActiveChampionObj>
} | {
  type: 'SET_CURRENT_PATCH',
  currentPatch: string
} | {
  type: 'TOGGLE_ENABLE_CLICK'
} | {
  type: 'TOGGLE_DISPLAY_ALL'
} | {
  type: 'ACTIVATE_TIMER',
  summonerName: string,
  spellName: SpellsEnum,
  endAt: number
} | {
  type: 'TERMINATE_TIMER',
  summonerName: string,
  spellName: SpellsEnum
} | {
  type: 'INITIATE_TIMERS',
  initialState: TimerState
} | {
  type: 'NEW_TICK',
  newTimers: TimerState
} | {
  type: 'UPLOAD_GAME_DATA',
  payload: GameData
}
