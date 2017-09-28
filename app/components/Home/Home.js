import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { ipcRenderer } from 'electron';

import styles from './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <AppBar
          showMenuIconButton={false}
          title="Home"
        />
        Work in progress
        <button onClick={() => ipcRenderer.send('launch-league-app')}>START</button>
      </div>
    );
  }
}

export default Home;
