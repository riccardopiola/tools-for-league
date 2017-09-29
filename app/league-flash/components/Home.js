// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

export default class App extends Component {
  props: {
    showHome: (boolean) => void
  }
  render() {
    return (
      <div className="app-container">
        <div className="home-container">
          <button
            className="launch-button"
            onClick={() => this.props.showHome(false)}
          >
            START
          </button>
        </div>
        <div className="close-button-container">
          <button onClick={() => ipcRenderer.send('close-league-flash')}>CLOSE LEAGUE FLASH</button>
        </div>
      </div>
    );
  }
}
