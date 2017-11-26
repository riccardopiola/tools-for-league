// @ƒlow
import React, { Component } from 'react';
import fse from 'fs-extra';
import RaisedButton from 'material-ui/RaisedButton';
import { ipcRenderer } from 'electron';
import { generateMapping, getImageSize } from '../../utils/leagueFlashUtils';
import type { SelectorsStore } from '../../editor/types';

import styles from './LeagueFlash.css';

type Props = {
  dataPath: string,
  onNowHasMapping: () => void
}
type State = {
  selectedFile?: string,
  screenDimensions?: { width: number, height: number },
  selectors: SelectorsStore
}

export default class MapSection extends Component<Props, State> {
  state = {
    selectedFile: 'NO SELECTION'
  }
  selectScreen = () => {
    ipcRenderer.send('open-select-directory', 'file');
    ipcRenderer.once('folder-selected', (event: Object, dirPathArr: string[] | null) => {
      if (Array.isArray(dirPathArr)) // If the user selected a folder
        this.setState({ selectedFile: dirPathArr[0] });
      else // if the user quit or didnt select any folder
        console.error('Select a folder, please');
    });
  }
  launchEditor = () => {
    getImageSize(this.state.selectedFile)
      .then(dimensions => {
        this.setState({ screenDimensions: dimensions });
        return generateMapping(dimensions);
      })
      .then((selectors: SelectorsStore) => {
        this.setState({ selectors });
        const settingsToTransmit = {
          selectedFile: this.state.selectedFile,
          selectors
        };
        ipcRenderer.send('open-editor-window', JSON.stringify(settingsToTransmit));
      })
      .catch(e => console.error(e));
    ipcRenderer.once('mapping-done', (e, selectorsStr: string) => {
      const selectors = JSON.parse(selectorsStr);
      fse.writeJson(`${this.props.dataPath}/mapping.json`, selectors);
      this.props.onNowHasMapping();
    });
  }
  render() {
    return (
      <section className={styles.mapSection}>
        <h3>Improve the accuracy the application by <span className={styles.fetchedPatch}>mapping</span> some elements of your UI</h3>
        <div className={styles.mapStepperContainer}>
          <h4>1. Take a screenshot</h4>
          <p>
            Take a screenshot of your entire screen while ingame and holding tab to see the scores
          </p>
        </div>
        <div className={styles.mapStepperContainer}>
          <h4>2. Select your screenshot</h4>
          <p>
            <button
              className={styles}
              onClick={this.selectScreen}
            >Select screenshot</button>
            <span className={styles.selectedFolder}>
              {this.state.selectedFile}
            </span>
          </p>
        </div>
        <div className={styles.mapStepperContainer}>
          <h4>3. Launch the editor and mark the points</h4>
          <div style={{ margin: '16px 0' }}>
            <RaisedButton
              disabled={this.state.selectedFile === 'NO SELECTION'}
              primary
              label="LAUNCH EDITOR"
              onClick={this.launchEditor}
            />
          </div>
        </div>
      </section>
    );
  }
}
