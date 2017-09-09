import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import fs from 'fs';
import IconButton from 'material-ui/IconButton';
import FolderIcon from 'material-ui/svg-icons/file/folder-open';
import Snackbar from 'material-ui/Snackbar';

import styles from './Settings.css';

class FolderSelection extends Component {
  props: {
    folder: string,
    onChange: (string, string) => void,
    title: string
  }
  constructor(props) {
    super(props);
    this.state = {
      valid: true,
      folder: props.folder,
      snackBarOpen: false,
      snackBarMessage: ''
    };
  }
  requestOpenFolderDialog = () => {
    ipcRenderer.send('open-select-directory');
    ipcRenderer.on('folder-selected', (e, dirPathArr) => {
      if (dirPathArr[0].length > 1) {
        if (validate(this.props.title, dirPathArr[0])) {
          this.setState({
            valid: true, 
            folder: dirPathArr[0],
            snackBarOpen: true,
            snackBarMessage: 'Successfully updated League of Legends folder'
          });
          this.props.onChange(this.props.title, dirPathArr[0]);
        } else {
          this.setState({
            valid: false,
            folder: dirPathArr[0],
            snackBarOpen: true,
            snackBarMessage: 'Select a valid folder'
          });
        }
      }
    });
  }
  handleRequestClose = () => {
    this.setState({ snackBarOpen: false });
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
          {this.state.folder}
        </div>
        <Snackbar
          open={this.state.snackBarOpen}
          message={this.state.snackBarMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

function validate(title, thePath) {
  switch (title) {
    case 'lolFolder': {
      const files = fs.readdirSync(thePath);
      if (files.includes('Config') && files.includes('RADS'))
        return true;
      else
        return false;
    }
    default:
      return true;
  }
}

export default FolderSelection;
