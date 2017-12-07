// @flow
import React, { Component } from 'react';
import ChampionView from '../containers/ChampionViewContainer';
import type { ActiveChampionObj } from '../reducers/gameReducer';
import type { TimerState } from '../reducers/timerReducer';
import Button from './subcomponents/Button';
import LLHookManager from '../utils/LLMouseEvents';
import FirebaseListener from '../utils/FirebaseListener';

import LockOpen from '../styles/lock-open.svg';
import LockClosed from '../styles/lock-closed.svg';
import styles from '../styles/Game.css';

type Props = {
  activeChampions: Array<ActiveChampionObj>,
  clickEnabled: boolean,
  displayAll: boolean,
  timers: TimerState,
  changeRoute: (route: string) => void,
  toggleEnableClick: () => void,
  toggleDisplayAll: () => void,
  timerTick: () => void,
  // MouseManagerProps
  dispatch: Function,
  dataPath: string,
  enemyTeam: string,
  // Firebase
  firebaseEnabled: boolean,
  gameId: string,
  fireDB: any // Firebase DB instance
}

export default class Game extends Component<Props> {
  interval: any;
  MouseEventsManager: any;
  firebaseListener: any;
  componentWillMount() {
    if (process.platform === 'win32') {
      this.MouseEventsManager = new LLHookManager(this.props.dispatch, this.props.enemyTeam, this.props.dataPath);
      this.MouseEventsManager.start();
    }
    if (this.props.firebaseEnabled) {
      this.initiateFirebase();
    }
  }
  componentWillReceiveProps(nextProps: Props) {
    // Check if we have to do something with the interval
    const hasActiveTimers = Object.keys(nextProps.timers).some(username => {
      if (nextProps.timers[username].size === 0)
        return false;
      return true;
    });
    if (!hasActiveTimers && this.interval) {
      // If there are no timers active but the interval is going: terminate it
      clearInterval(this.interval);
      this.interval = null;
    } else if (hasActiveTimers && !this.interval) {
      // If there are timers active and there is no interval: start it
      this.interval = setInterval(this.props.timerTick, 1000);
      this.props.timerTick();
    }
    // else if there are/aren't timers and the interval is going/not going do nothing
  }
  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
    if (process.platform === 'win32') {
      this.MouseEventsManager.end();
      this.MouseEventsManager = null;
    }
    if (this.props.firebaseEnabled) {
      this.firebaseListener.removeListeners();
      this.firebaseListener = null;
    }
  }
  initiateFirebase = () => {
    this.firebaseListener = new FirebaseListener(this.props.fireDB, this.props.dispatch, this.props.gameId);
    this.firebaseListener.setupListeners();
  }
  renderClassic = () => {
    return this.props.activeChampions.map((user, i) => {
      if (this.props.timers[user.summonerName].size > 0 || this.props.displayAll) {
        return (
          <ChampionView
            info={user}
            key={user.summonerName}
            index={i}
          />
        );
      }
      return null;
    });
  }
  render() {
    return (
      <div className={styles.gameContainer}>
        <div className="buttons-container">
          <Button
            onClick={() => this.props.toggleEnableClick()}
            classesArray={[styles.inputActionBtn]}
            active={this.props.clickEnabled}
          >
            <img
              src={(this.props.clickEnabled) ? LockOpen : LockClosed}
              alt="Enable-Input icon"
            />
          </Button>
          <Button
            label="BACK"
            onClick={() => this.props.changeRoute('home')}
          />
          <Button
            onClick={this.props.toggleDisplayAll}
            label="SHOW-ALL"
            active={this.props.displayAll}
          />
        </div>
        <div className={styles.championsListContainer}>
          {this.renderClassic()}
        </div>
      </div>
    );
  }
}
