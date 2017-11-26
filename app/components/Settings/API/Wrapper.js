// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import SettingsContent from '../Settings';
import styles from './Settings.css';

import type { SettingsType } from '../../../store/initialState';

type Props = {
  // local settings
  settings: SettingsType,
  // store
  permissionToExit: boolean,
  openExitDialog: boolean,
  stagedChanges: Array<{newValue: string|boolean, paths: string[]}>,
  wannaGoTo: string,
  // action creators
  changeRoute: (path: string, withCheck: boolean) => void,
  openCloseExitDialog: (open: boolean) => void,
  saveSettings: () => void,
  changePermissionToExit: (canChange: boolean) => void
};

/**
 * This is a wrapper component that handles the lifecycle of the Settings section
 *  - Handles opening and closing the dialog
 *  - Handles saving
 *  - Displays the basic UI
 */
class SettingsWrapper extends Component<Props> {
  handleCloseDialog = () => {
    this.props.openCloseExitDialog(false);
  }
  handleDiscardChanges = () => {
    this.props.openCloseExitDialog(false);
    this.props.changeRoute(this.props.wannaGoTo, false);
    this.props.changePermissionToExit(true);
  }
  render() {
    return (
      <div className={styles.settingsContainer}>
        <AppBar
          showMenuIconButton={false}
          title="Settings"
          className={styles.appbar}
          iconElementRight={
            <RaisedButton
              primary={true}
              label="SAVE"
              onClick={this.props.saveSettings}
              disabled={this.props.permissionToExit}
            />
          }
        />
        <SettingsContent
          {...this.props}
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
              onClick={this.props.saveSettings}
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

export default SettingsWrapper;
