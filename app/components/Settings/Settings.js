// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import SettingsContent from './SettingsContent';
import { validateChanges } from './utils';
import styles from './Settings.css';

class Settings extends Component {
  props: {
    settings: {
      general: {
        lolFolder: string,
        preferredServer: string
      },
      ping: {
        interval: string
      }
    },
    canChangeSubApp: boolean,
    changeCanChangeSubApp: (boolean) => void,
    changeSubApp: ({ }, string) => void,
    openCloseDialog: (boolean) => void,
    saveSettings: (Object) => void,
    openExitDialog: boolean
  }
  state: {
    general: {
      lolFolder: string,
      preferredServer: string
    },
    ping: {
      interval: string
    }
  }
  state = {
    general: {
      lolFolder: this.props.settings.general.lolFolder,
      preferredServer: this.props.settings.general.preferredServer
    },
    ping: {
      interval: this.props.settings.ping.interval
    }
  }
  // General purpoise method to update controlled components
  handleChange = (section: string, title: string, newValue: string | boolean): void => {
    const newSection = Object.assign({}, this.state[section], { [title]: newValue });
    this.setState({ [section]: newSection });
    this.props.changeCanChangeSubApp(false);
  }
  save = () => {
    if (!validateChanges(this.state))
      return;
    this.props.saveSettings(this.state);
    this.props.changeCanChangeSubApp(true);
    this.props.openCloseDialog(false);
  }
  handleCloseDialog = () => {
    this.props.openCloseDialog(false);
  }
  handleDiscardChanges = () => {
    this.props.openCloseDialog(false);
    this.props.changeCanChangeSubApp(true);
    this.props.changeSubApp({}, 'Home');
  }
  render() {
    return (
      <div className={styles.settingsContainer}>
        <AppBar
          showMenuIconButton={false}
          title="Settings"
          iconElementRight={
            <RaisedButton
              primary={true}
              label="SAVE"
              onClick={this.save}
              disabled={this.props.canChangeSubApp}
            />
          }
        />
        <SettingsContent
          handleChange={this.handleChange}
          {...this.state}
        />
        <Dialog
          actions={[
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleCloseDialog}
            />,
            <FlatButton
              label="Discard"
              primary={true}
              onClick={this.handleDiscardChanges}
            />,
            <RaisedButton
              label="SAVE"
              primary={true}
              onClick={this.save}
            />
          ]}
          modal={true}
          open={this.props.openExitDialog}
          onRequestClose={this.handleCloseDialog}
        >
          Discard changes?
        </Dialog>
      </div>
    );
  }
}

export default Settings;
