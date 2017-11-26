// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import PatchSection from './subcomponents/PatchSection';

import styles from '../styles/Home.css';

type Props = {
  changeRoute: (route: string) => void
};
type State = {
  startButtonDisabled: boolean
}

export default class App extends Component<Props, State> {
  state = {
    startButtonDisabled: false
  }
  onStart = () => {
    if (!this.state.startButtonDisabled)
      this.props.changeRoute('loading');
  }
  render() {
    const disabledStyles = {
      backgroundColor: '#d5d5d5',
      opacity: 0.8
    };
    return (
      <div className="container">
        <header className="buttons-container">
          <button
            className="top-button"
            onClick={() => ipcRenderer.send('close-league-flash')}
          >
            CLOSE LEAGUE FLASH
          </button>
        </header>
        <main className={styles.centerContent}>
          <PatchSection
            toggleCanStart={(val) => this.setState({ startButtonDisabled: val })}
          />
          <section className={styles.startButtonSection}>
            <button
              style={(this.state.startButtonDisabled) ? disabledStyles : {}}
              className={styles.startButton}
              onClick={this.onStart}
            >
              START
            </button>
          </section>
        </main>
      </div>
    );
  }
}
