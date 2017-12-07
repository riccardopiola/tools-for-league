// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

import styles from '../styles/Loading.css';
import composeChampionsArray from '../utils/composeChampionsArray';
import type { ActiveChampionObj } from '../reducers/gameReducer';
import type { GameData } from '../reducers/dataReducer';

type Props = {
  settings: {
    username: string,
    preferredServer: string,
    showBrowserWindow: boolean,
    currentPatch: string,
    dataPath: string
  },
  progressbar: {
    progress: number,
    message: string
  },
  activeChampions: Array<ActiveChampionObj>,
  updateProgressbar: (progress: number, message: string) => void,
  changeRoute: (route: string, message?: string) => void,
  saveData: (data: {}) => void,
  initiateActiveChampionsArray: () => void,
  initiateTimers: (championsArray: ActiveChampionObj[]) => void,
  uploadGameData: (gameData: GameData) => void
}

export default class Loading extends Component<Props> {
  componentDidMount() {
    this.scrapeData();
  }
  scrapeData = () => {
    const settingsString = JSON.stringify(this.props.settings);
    this.props.updateProgressbar(0.20, 'Loading OP.GG page');
    ipcRenderer.send('open-scraper-win', settingsString);
    // Register the progress events from scrapper
    ipcRenderer.on('scraper-finished-loading', () => {
      this.props.updateProgressbar(0.65, 'Page Loaded');
    });
    ipcRenderer.on('scraping-data', (e, status: string, data) => {
      this.props.updateProgressbar(0.85, 'Processing Data');
      switch (status) {
        case 'ok':
          this.props.saveData(JSON.parse(data));
          this.props.uploadGameData(JSON.parse(data));
          this.processData(JSON.parse(data));
          break;
        case 'not-playing':
          this.props.changeRoute('error', `summoner "${this.props.settings.username}" is not currently in a game`);
          break;
        case 'not-found':
          this.props.changeRoute('error', `summoner "${this.props.settings.username}" does not exist`);
          break;
        default:
          this.props.changeRoute('error');
      }
    });
  }
  processData = (gameData: GameData) => {
    composeChampionsArray(gameData, this.props.settings.currentPatch, this.props.settings.dataPath)
      .then(activeChampions => {
        this.props.initiateActiveChampionsArray(activeChampions);
        this.props.initiateTimers(activeChampions);
        this.props.changeRoute('game');
      })
      .catch(e => {
        this.props.changeRoute('error', e.message);
      });
  }
  render() {
    return (
      <div className="container">
        <div className="buttons-container">
          <button
            className="top-button"
            onClick={() => this.props.changeRoute('home')}
          >
            BACK
        </button>
        </div>
        <div className={styles.username}>
          {this.props.settings.username}
        </div>
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}>
            <div className={styles.bounce1} />
            <div className={styles.bounce2} />
            <div className={styles.bounce3} />
          </div>
          <div className={styles.waitMessage}>
            {this.props.progressbar.message}
          </div>
        </div>
      </div>
    );
  }
}
