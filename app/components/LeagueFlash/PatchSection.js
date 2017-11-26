// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cacheResources from './cacheResources';
import * as SettingsActions from '../../actions/settingsActions';

import Box from './Box';
import styles from './LeagueFlash.css';

type Props = {
  currentPatch: string,
  handleChange: (newValue: string | boolean, paths: string[], index: number) => void,
  saveSettings: () => void
};
type State = {
  fetchedPatch: string,
  status: 'error'|'update'|'loading'|'updating'|'ok',
  message: string
};

class PatchSection extends Component<Props, State> {
  state = {
    fetchedPatch: '',
    status: 'loading',
    message: 'Fetching the current patch'
  }
  componentWillMount() {
    this.checkCurrentPatch()
      .then(fetchedPatch => {
        if (this.props.currentPatch === '')
          this.setState({
            status: 'update',
            fetchedPatch,
            message: 'No patch was found, please update'
          });
        else if (fetchedPatch === this.props.currentPatch)
          this.setState({
            status: 'ok',
            message: 'Your app is up to date!',
            fetchedPatch
          });
        else
          this.setState({
            fetchedPatch,
            status: 'update',
            message: 'A new update is available'
          });
      })
      .catch(e => {
        this.setState({
          status: 'error',
          message: 'Couldn\'t find the live patch'
        });
        console.error(e);
      });
  }
  checkCurrentPatch = async () => {
    const response = await fetch('http://api.champion.gg/v2/general?&api_key=f396e2fdb819c63402101acc1c58e253');
    if (!response.ok)
      throw new Error(`Error: ${response.status}`);
    const body = await response.json();
    // $FlowFixMe
    return `${body[0].patch}.1`;
  }
  updateStaticData = () => {
    if (this.state.status === 'update') {
      this.setState({
        status: 'updating',
        message: 'Updating the app'
      });
      cacheResources(this.state.fetchedPatch)
        .then(() => {
          this.props.handleChange(
            this.state.fetchedPatch,
            ['leagueFlash', 'currentPatch'],
            0);
          this.props.saveSettings();
          this.setState({
            status: 'ok',
            message: 'Update successful. The app is now up to date!'
          });
        })
        .catch(e => {
          console.error(e);
          this.setState({
            status: 'error',
            message: 'Error saving the new patch'
          });
        });
    }
  }
  revertPatch = () => {
    // Change the savedPatch to the previous version
  }
  render() {
    let savedPatch = this.props.currentPatch.slice(0, -2);
    const patchStyles = {};
    if (this.props.currentPatch === '') {
      savedPatch = 'NO PATCH';
      patchStyles.color = 'red';
    }
    return (
      <section className={styles.patchSection}>
        <h4>
          <span>Patch </span>
          <span className={styles.savedPatch} style={patchStyles}>
            {`${savedPatch} `}
          </span>
          {(this.state.status === 'update') ?
            [
              <span>→ </span>,
              <span className={styles.fetchedPatch}>{this.state.fetchedPatch.slice(0, -2)}</span>
            ] : null
          }
        </h4>
        <Box
          status={this.state.status}
          message={this.state.message}
          updateStaticData={this.updateStaticData}
          revertPatch={this.revertPatch}
        />
      </section>
    );
  }
}

export default connect(
  (state) => ({
    currentPatch: state.settings.local.leagueFlash.currentPatch
  }),
  { ...SettingsActions }
)(PatchSection);
