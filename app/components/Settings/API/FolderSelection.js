// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import IconButton from 'material-ui/IconButton';
import FolderIcon from 'material-ui/svg-icons/file/folder-open';

import BaseSetting from './BaseSetting';
import type { SpecificSettingWithValidation } from './BaseSetting';

import styles from './Settings.css';

type Props = {
  paths: string[],
  // Passing down
  value: string
};
type State = {
  newValue: string,
  valid: boolean
};

class FolderSelection extends Component<Props, State> implements SpecificSettingWithValidation {
  state = {
    valid: true,
    newValue: this.props.value,
  }
  updateValid = (valid: boolean) => {
    this.setState({ valid });
  }
  handleErrors = (error: Error) => {
    console.error(error);
  }
  requestOpenFolderDialog = () => {
    ipcRenderer.send('open-select-directory');
    ipcRenderer.on('folder-selected', (event: Object, dirPathArr: string[]) => {
      if (dirPathArr[0].length > 1) // If the user selected a folder
        this.setState({ newValue: dirPathArr[0] });
      else // if the user quit or didnt select any folder
        console.error('Select a folder, please');
    });
  }
  render() {
    const pathStyle = {
      backgroundColor: (this.state.valid) ? 'rgba(0,0,0,0.3' : 'rgba(255,0,0,0.3)'
    };
    return (
      <div className={styles.singleSettingContainer}>
        <IconButton className={styles.folderIcon} onClick={this.requestOpenFolderDialog}>
          <FolderIcon />
        </IconButton>
        <div className={styles.folderSelectionText} style={pathStyle}>
          {this.state.newValue}
        </div>
        <BaseSetting
          {...this.props}
          newValue={this.state.newValue}
          updateValid={this.updateValid}
          handleErrors={this.handleErrors}
        />
      </div>
    );
  }
}

export default FolderSelection;
