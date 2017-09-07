import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import LinearProgress from 'material-ui/LinearProgress';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

import styles from './Ping.css';

class Ping extends Component {
  props: {
    startLoading: (number) => void,
    calculatePing: () => void,
    completed: number,
    ping?: number
  }
  defaultProps: {
    completed: 0
  }
  constructor(props) {
    super(props);
    this.state = {
      mode: 2,
      max: 6000,
      firstTime: true,
      server: 'EUW'
    };
    this.changeMode = this.changeMode.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleChangeServer = this.handleChangeServer.bind(this);
  }
  changeMode(mode) {
    let max;
    switch (mode) {
      case 1:
        max = 3000;
        break;
      case 2:
        max = 6000;
        break;
      case 3:
        max = 10000;
        break;
      default:
        max = 6000;
    }
    this.setState({ mode, max, firstTime: true });
  }
  handleStart() {
    this.props.startLoading();
    this.props.calculatePing(this.state.max, this.state.server);
    this.setState({ firstTime: false });
  }
  handleChangeServer(e, key, value) {
    this.setState({ server: value, firstTime: true });
  }
  render() {
    let buttonStyles;
    let buttonMessage;
    if (this.props.completed === 0 && this.state.firstTime) {
      buttonStyles = { backgroundColor: '#896c3d', cursor: 'pointer', color: '#ffffff' };
      buttonMessage = 'GO';
    } else if (this.props.ping === -2) {
      buttonStyles = { backgroundColor: '#000000', color: '#ffffff' };
      buttonMessage = 'FAIL';
    } else if (this.props.completed === 0 && this.props.ping !== -1) {
      buttonMessage = `${this.props.ping} ms`;
      if (this.props.ping < 75)
        buttonStyles = { backgroundColor: 'green', color: '#ffffff' };
      else if (this.props.ping >= 75 && this.props.ping < 150)
        buttonStyles = { backgroundColor: 'yellow', color: '#000000' };
      else if (this.props.ping >= 150 && this.props.ping < 250)
        buttonStyles = { backgroundColor: 'orange', color: '#000000' };
      else
        buttonStyles = { backgroundColor: 'red', color: '#ffffff' };
    } else {
      buttonMessage = 'PINGING';
      buttonStyles = { backgroundColor: 'rgba(0,0,0,0.4)', color: '#ffffff' };
    }
    return (
      <div className={styles.pingContainer}>
        <AppBar
          className={styles.AppBar}
          showMenuIconButton={false}
          title="Ping"
          iconElementRight={
            <DropDownMenu
              value={this.state.server}
              onChange={this.handleChangeServer}
              labelStyle={{ color: '#c9aa71' }}
            >
              <MenuItem value="EUW" primaryText="EUW" />
              <MenuItem value="EUNE" primaryText="EUNE" />
              <MenuItem value="NA" primaryText="NA" />
              <MenuItem value="OCE" primaryText="OCE" />
              <MenuItem value="LAN" primaryText="LAN" />
            </DropDownMenu>
          }
        />
        <div className={styles.durationButtons}>
          <RaisedButton
            key={1}
            onClick={() => this.changeMode(1)}
            primary={(this.state.mode === 1)}
            label="QUICK TEST"
          />
          <RaisedButton
            key={2}
            onClick={() => this.changeMode(2)}
            primary={(this.state.mode === 2)}
            label="NORMAL TEST"
          />
          <RaisedButton
            key={3}
            onClick={() => this.changeMode(3)}
            primary={(this.state.mode === 3)}
            label="LONG TEST"
          />
        </div>
        <div className={styles.pingTest}>
          <Paper
            className={styles.circleButton}
            zDepth={2}
            style={buttonStyles}
            onClick={(this.props.completed === 0) ? this.handleStart : null}
          >
            <span className={styles.circleButtonWord}>{buttonMessage}</span>
          </Paper>
          <LinearProgress
            color="#896c3d"
            mode="determinate"
            max={this.state.max}
            min={0}
            value={this.props.completed}
          />
        </div>
        <div className={styles.footNotes}>
          <span className={styles.footNotesSpan}>
            *This is an indicative measure. Actual values may vary +-10ms
          </span>
        </div>
      </div>
    );
  }
}

export default Ping;
