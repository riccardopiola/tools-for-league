// @flow
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import BaseSetting from './BaseSetting';
import type { SpecificSettingWithValidation } from './BaseSetting';
import styles from './Settings.css';

type Props = {
  message: string,
  name: string,
  // Passing down
  value: string,
  paths: string[],
  type: 'text' | 'number'
};
type State = {
  newValue: string,
  errorText: string
};

class TextFieldSetting extends Component<Props, State> implements SpecificSettingWithValidation {
  state = {
    newValue: this.props.value,
    errorText: ''
  }
  updateValid = (valid: boolean) => {
    if (valid)
      this.setState({ errorText: '' });
  }
  handleErrors = (error: Error) => {
    this.setState({ errorText: error.message });
  }
  onChange = (event: Object, newValue: string) => {
    this.setState({ newValue });
  }
  render() {
    return (
      <div className={styles.singleSettingContainer}>
        <div className={styles.selectText}>{this.props.message}</div>
        <TextField
          name={this.props.name}
          className={styles.textFieldNumber}
          value={this.state.newValue}
          onChange={this.onChange}
          type={this.props.type}
          errorText={this.state.errorText}
        />
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

export default TextFieldSetting;
