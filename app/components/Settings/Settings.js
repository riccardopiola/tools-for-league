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
      lolFolder: string,
      preferredServer: string
    },
    changeCanChangeSubApp: (boolean) => void,
    changeSubApp: (string) => void,
    wantToChangeSubApp: boolean
  }
  state: {
    lolFolder: string,
    preferredServer: string,
    stagedChanges: boolean,
    openDialog: boolean
  }
  constructor(props) {
    super(props);
    const { lolFolder, preferredServer } = props.settings;
    this.state = {
      lolFolder,
      preferredServer,
      stagedChanges: false,
      openDialog: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleDiscardChanges = this.handleDiscardChanges.bind(this);
  }
  componentWillReceiveProps() {
    if (this.props.wantToChangeSubApp) {
      this.setState({ openDialog: true });
    }
  }
  handleChange(title: string, newValue: string | boolean) {
    this.setState({ [title]: newValue, stagedChanges: true });
    this.props.changeCanChangeSubApp(false);
  }
  save() {
    // TODO: Implement actual saving
    this.props.changeCanChangeSubApp(true);
    this.setState({ stagedChanges: false });
  }
  handleCloseDialog() {
    this.setState({ openDialog: false });
  }
  handleDiscardChanges() {
    this.props.changeCanChangeSubApp(true);
    this.props.changeSubApp('Home');
  }
  render() {
    return (
      <div className={styles.settingsContainer}>
        <AppBar
          showMenuIconButton={false}
          title="Settings"
        />
        <SettingsSection title="General">
          <FolderSelection title="lolFolder" folder={this.state.lolFolder} onChange={this.handleChange} />
          <Divider style={{ margin: '-1px 24px 0px 24px', marginLeft: '24px' }} />
          <div className={styles.singleSettingContainer}>
            <div className={styles.selectText}>Preferred server</div>
            <DropDownMenu
              value={this.state.preferredServer}
              onChange={(e, i, value) => this.handleChange('preferredServer', value)}
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
            disabled={!this.state.stagedChanges}
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
          open={this.state.openDialog}
          onRequestClose={this.handleCloseDialog}
        >
          Discard changes?
        </Dialog>
      </div>
    );
  }
}

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

type SettingsSectionProps = {
  children: Children,
  title: string
};

export default Settings;
