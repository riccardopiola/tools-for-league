// @flow
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

import PingGraphContainer from './PingGraphContainer';
import styles from './Ping.css';

const modeEnum = [6000, 20000, 60000]; // The varius lengths of the pingTests (in ms)

class Ping extends Component {
  props: {
    preferredServer: string,
    display: 'GO' | 'LOADING' | 'GRAPH',
    startPing: () => void,
    completed: boolean,
    getPings: (number) => void
  }
  state = {
    mode: 1,
    max: 20000,
    server: this.props.preferredServer,
    pingInterval: this.props.pingInterval
  }
  changeMode = (mode: number) => {
    const max = modeEnum[mode];
    this.setState({ mode, max });
  }
  handleStart = () => {
    this.props.startPing();
    this.props.getPings(this.state.max, this.state.server);
  }
  handleChangeServer = (e: Event, key, value) => {
    this.setState({ server: value });
  }
  render() {
    let centerPart;
    if (this.props.display === 'GRAPH')
      centerPart = <PingGraphContainer />;
    else {
      const isLoading = (this.props.display === 'LOADING');
      const backgroundColor = (isLoading) ? 'grey' : '#896c3d';
      const color = (isLoading) ? '#000000' : '#ffffff';
      const text = (isLoading) ? 'LOADING' : 'GO';
      centerPart = (
        <div className={styles.pingTest}>
          <Paper
            className={styles.circleButton}
            zDepth={2}
            onClick={this.handleStart}
            style={{ backgroundColor, cursor: 'pointer', color }}
          >
            <span className={styles.circleButtonWord}>{text}</span>
          </Paper>
        </div>
      );
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
            key={0}
            onClick={() => this.changeMode(0)}
            primary={(this.state.mode === 0)}
            label="QUICK TEST"
            disabled={!this.props.completed}
          />
          <RaisedButton
            key={1}
            onClick={() => this.changeMode(1)}
            primary={(this.state.mode === 1)}
            label="NORMAL TEST"
            disabled={!this.props.completed}
          />
          <RaisedButton
            key={2}
            onClick={() => this.changeMode(2)}
            primary={(this.state.mode === 2)}
            label="LONG TEST"
            disabled={!this.props.completed}
          />
        </div>
        {centerPart}
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
