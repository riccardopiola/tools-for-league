// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import type { Children } from 'react';

import FolderSelection from './FolderSelection';
import styles from './Settings.css';

class Settings extends Component {
  props: {
    settings: {
      lolFolder: string,
      preferredServer: string
    }
  }
  state: {
    lolFolder: string,
    preferredServer: string,
    stagedChanges: boolean
  }
  constructor(props) {
    super(props);
    const { lolFolder, preferredServer } = props.settings;
    this.state = {
      lolFolder,
      preferredServer,
      stagedChanges: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(title: string, newValue: string | boolean) {
    this.setState({ [title]: newValue, stagedChanges: true });
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
