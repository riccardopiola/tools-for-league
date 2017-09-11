// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import type { Children } from 'react';

import FolderSelection from './FolderSelection';
import styles from './Settings.css';

class Settings extends Component {
  props: {
    settings: {
      general: {
        lolFolder: string,
        preferredServer: string,
        settingsPath: string
      }
    },
    canChangeSubApp: boolean,
    changeCanChangeSubApp: (boolean) => void,
    changeSubApp: ({}, string) => void,
    openCloseDialog: (boolean) => void,
    saveSettings: (Object) => void,
    openExitDialog: boolean
  }
  state: {
    general: {
      lolFolder:string,
      preferredServer: string
    }
  }
  state = {
    general: {
      lolFolder: this.props.settings.general.lolFolder,
      preferredServer: this.props.settings.general.preferredServer
    }
  }
  handleChange = (section: string, title: string, newValue: string | boolean): void => {
    const newSection = Object.assign({}, this.state[section], { [title]: newValue });
    this.setState({ [section]: newSection });
    this.props.changeCanChangeSubApp(false);
  }
  save = () => {
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
        />
        <SettingsSection title="General">
          <FolderSelection
            section="general"
            title="lolFolder"
            folder={this.state.general.lolFolder}
            onChange={this.handleChange}
          />
          <Divider style={{ margin: '-1px 24px 0px 24px', marginLeft: '24px' }} />
          <div className={styles.singleSettingContainer}>
            <div className={styles.selectText}>Preferred server</div>
            <DropDownMenu
              value={this.state.general.preferredServer}
              onChange={(e: Object, i: number, value: string) => this.handleChange('general', 'preferredServer', value)}
              className={styles.selectMenu}
            >
              <MenuItem value={'EUW'} primaryText="EUW" />
              <MenuItem value={'EUNE'} primaryText="EUNE" />
              <MenuItem value={'NA'} primaryText="NA" />
              <MenuItem value={'OCE'} primaryText="OCE" />
              <MenuItem value={'LAN'} primaryText="LAN" />
            </DropDownMenu>
          </div>
        </SettingsSection>
        <footer className={styles.footer}>
          <RaisedButton
            primary={true}
            label="SAVE"
            onClick={this.save}
            disabled={this.props.canChangeSubApp}
          />
        </footer>
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

type SettingsSectionProps = {
  children: Children,
  title: string
};

const SettingsSection = (props: SettingsSectionProps) => {
  return (
    <div className={styles.settingsSection}>
      <div className={styles.sectionHeader}>
        {props.title}
      </div>
      {props.children}
    </div>
  );
};

export default Settings;
