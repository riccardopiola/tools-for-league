// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { ipcRenderer } from 'electron';
import PatchSection from './PatchSection';
import MapSection from './MapSection';

import styles from './LeagueFlash.css';

type Props = {
  leagueFlashSettings: {
    username: string,
    currentPatch: string,
    showBrowserWindow: boolean
  },
  generalSettings: {
    preferredServer: string,
    dataPath: string
  }
};
type State = {

}

export default class LeagueFlash extends Component<Props, State> {
  handleLaunch = () => {
    const settingsToTransmit = {
      ...this.props.leagueFlashSettings,
      preferredServer: this.props.generalSettings.preferredServer
    };
    ipcRenderer.send('launch-league-app', JSON.stringify(settingsToTransmit));
  }
  render() {
    return (
      <div className={styles.container}>
        <AppBar
          showMenuIconButton={false}
          title="League Flash"
          className={styles.AppBar}
          iconElementRight={
            <RaisedButton
              primary
              label="LAUNCH"
              onClick={this.handleLaunch}
            />}
        />
        <div className={styles.content}>
          <PatchSection />
          <MapSection
            dataPath={this.props.generalSettings.dataPath}
          />
        </div>
      </div>
    );
  }
}
