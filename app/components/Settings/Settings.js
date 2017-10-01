// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import SettingsContent from './SettingsContent';
import { validateChanges } from './utils';
import styles from './Settings.css';

import type { SettingsType } from './settingsFile';

class Settings extends Component {
  props: {
    localSettings: SettingsType,
    newSettings: SettingsType,
    changeRoute: (string) => void,
    openCloseDialog: (boolean) => void,
    saveSettings: (Object) => void,
    openExitDialog: boolean
  };
  handleCloseDialog = () => {
    this.props.openCloseDialog(false);
  }
  handleDiscardChanges = () => {
    this.props.openCloseDialog(false);
    this.props.changeCanChangeSubApp(true);
    this.props.changeRoute('/');
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
