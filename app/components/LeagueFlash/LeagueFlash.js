// @flow
import React, { Component } from 'react';
import fse from 'fs-extra';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { ipcRenderer } from 'electron';
import PatchSection from './PatchSection';
import MapSection from './MapSection';
import WarningSection from './WarningSection';

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
  hasMapping: boolean,
  canLaunch: boolean
}

export default class LeagueFlash extends Component<Props, State> {
  state = {
    hasMapping: true
  }
  componentWillMount() {
    fse.pathExists(`${this.props.generalSettings.dataPath}/mapping.json`)
      .then((exists: boolean) => {
        this.setState({ hasMapping: exists });
      });
  }
  handleLaunch = () => {
    const settingsToTransmit = {
      ...this.props.leagueFlashSettings,
      preferredServer: this.props.generalSettings.preferredServer,
      dataPath: this.props.generalSettings.dataPath
    };
    ipcRenderer.send('launch-league-app', JSON.stringify(settingsToTransmit));
  }
  render() {
    const warnings = [];
    if (!this.state.hasMapping)
      warnings.push(<WarningSection mapping key="mapping" />);
    if (this.props.leagueFlashSettings.currentPatch === '')
      warnings.push(<WarningSection patch key="patch" />);
    return (
      <div className={styles.container}>
        <AppBar
          showMenuIconButton={false}
          title="League Flash"
          className={styles.AppBar}
          iconElementRight={
            <RaisedButton
              primary
              disabled={warnings.length > 0}
              label="LAUNCH"
              onClick={this.handleLaunch}
            />}
        />
        <div className={styles.content}>
          {warnings}
          <PatchSection />
          <MapSection
            dataPath={this.props.generalSettings.dataPath}
            onNowHasMapping={() => this.setState({ hasMapping: true })}
          />
        </div>
      </div>
    );
  }
}
