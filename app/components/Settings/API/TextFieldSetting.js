// @flow
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import styles from '../Settings.css';

type Props = {
  handleChange: (string, string, string | boolean) => void, // section, title, newValue
  value: string,
  message: string,
  name: string
};

class DropDownSelection extends Component<Props> {
  render() {
    return (
      <div className={styles.singleSettingContainer}>
        <div className={styles.selectText}>{this.props.message}</div>
        <TextField
          name={this.props.name}
          className={styles.textFieldNumber}
          value={this.props.value}
          onChange={(e, newValue) => this.props.handleChange('ping', 'interval', newValue)}
        />
      </div>
    );
  }
}

export default DropDownSelection;
