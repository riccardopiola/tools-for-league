// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

import IconButton from 'material-ui/IconButton';
import FolderIcon from 'material-ui/svg-icons/file/folder-open';

import { changePermissionToExit } from '../../../actions/appActions';
import { handleChange, discardChange } from '../../../actions/settingsActions';

import styles from './Settings.css';

function mapStateToProps(state) {
  return {
    stagedChangesLength: state.settings.stagedChanges.length,
    permissionToExit: state.app.permissionToExit,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ handleChange, discardChange, changePermissionToExit },
    dispatch);
}

type Props = {
  value: string,
  paths: string[],
  permissionToExit: boolean,
  stagedChangesLength: number,
  validateFunctionAsync: (path: string) => Promise<boolean>,
  handleChange: (newValue: string | boolean, paths: string[], index: number) => void,
  changePermissionToExit: (canChange: boolean) => void,
  discardChange: (index: number) => void
};
type State = {
  valid: boolean,
  value: string,
  stagedChangesIndex: number
};

class FolderSelection extends Component<Props, State> {
  defaultProps = {
    validateFunctionAsync: () => true
  }
  state = {
    valid: true,
    value: this.props.value,
    stagedChangesIndex: -1
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.valid === false) {
      if (this.props.permissionToExit === false && nextProps.permissionToExit === true)
        this.setState({ stagedChangesIndex: -1 });
    }
  }
  requestOpenFolderDialog = () => {
    ipcRenderer.send('open-select-directory');
    ipcRenderer.on('folder-selected', (event: Object, dirPathArr: string[]) => {
      let newState = {};
      const { value, stagedChangesIndex } = this.state;
      if (this.props.value === value) {
        // Do nothing if its the same value
        if (stagedChangesIndex >= -1) {
          this.props.discardChange(stagedChangesIndex);
          newState.stagedChangesIndex = -1;
        }
      } else if (dirPathArr[0].length > 1) {
        this.props.validateFunctionAsync(value)
          .then(() => {
            newState = { ...newState, valid: true, value: dirPathArr[0] };
            this.props.handleChange(value, this.props.paths, stagedChangesIndex);
            newState.stagedChangesIndex = this.props.stagedChangesLength;
            this.props.changePermissionToExit(false);
          })
          .catch((error: Error) => {
            console.error(error);
            newState = { ...newState, valid: false, value: dirPathArr[0] };
          });
      } else { // if the user quit or didnt select any folder
        console.error('Select a folder, please');
      }
      this.setState(newState);
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
          {this.state.value}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FolderSelection);
