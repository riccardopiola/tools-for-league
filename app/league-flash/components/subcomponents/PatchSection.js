// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentPatch } from '../../actions/dataActions';

import styles from '../../styles/Home.css';

type Props = {
  toggleCanStart: (canStart: boolean) => void,
  setCurrentPatch: (currentPatch: string, writeData?: boolean) => void,
  currentPatch: string
};
type State = {
  fetchedPatch: string,
  buttonMessage: string
};

class PatchSection extends Component<Props, State> {
  state = {
    fetchedPatch: '',
    buttonMessage: 'loading'
  }
  componentWillMount() {
    this.checkCurrentPatch()
      .then(fetchedPatch => {
        if (fetchedPatch === this.props.currentPatch)
          this.setState({ buttonMessage: 'ok' });
        else
          this.setState({
            fetchedPatch,
            buttonMessage: 'update'
          });
      })
      .catch(e => {
        this.setState({ buttonMessage: 'error' });
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
    if (this.state.buttonMessage === 'update') {
      // Call the main process
    }
  }
  render() {
    const buttonStyles = {};
    let text = `Patch ${this.props.currentPatch.slice(0, -2)} `;
    switch (this.state.buttonMessage) {
      case 'error':
        buttonStyles.backgroundColor = 'red';
        break;
      case 'update':
        buttonStyles.backgroundColor = 'goldenrod';
        buttonStyles.cursor = 'pointer';
        text += `→ ${this.state.fetchedPatch.slice(0, -2)}`;
        break;
      case 'loading':
        buttonStyles.backgroundColor = 'grey';
        break;
      case 'updating':
        buttonStyles.backgroundColor = 'blue';
        break;
      case 'not-available':
        buttonStyles.backgroundColor = 'grey';
        break;
      default: // 'ok'
        buttonStyles.backgroundColor = 'green';
    }
    return (
      <section className={styles.patchSection}>
        <p>{text}</p>
        <button
          style={buttonStyles}
          className={styles.patchButton}
          onClick={this.updateStaticData}
        >
          {this.state.buttonMessage.toUpperCase()}
        </button>
      </section>
    );
  }
}

export default connect(
  (state) => ({
    currentPatch: state.data.currentPatch
  }),
  { setCurrentPatch }
)(PatchSection);
