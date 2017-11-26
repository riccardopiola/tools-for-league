// @flow
import React, { Component } from 'react';
import Toggle from 'material-ui/Toggle';

import BaseSetting from './BaseSetting';
import type { SpecificSetting } from './BaseSetting';
import styles from './Settings.css';

type Props = {
  message: string,
  name: string,
  // Passing down
  value: boolean,
  paths: string[],
};
type State = {
  isChecked: boolean
};

class SwitchSettings extends Component<Props, State> implements SpecificSetting {
  state = {
    newValue: this.props.value
  }
  onToggle = (event: Object, isChecked: boolean) => {
    this.setState({ newValue: isChecked });
  }
  render() {
    return (
      <div className={styles.singleSettingContainer}>
        <div className={styles.selectText}>{this.props.message}</div>
        <Toggle
          name={this.props.name}
          toggled={this.state.newValue}
          onToggle={this.onToggle}
          className={styles.toggle}
        />
        <BaseSetting
          {...this.props}
          newValue={this.state.newValue}
        />
      </div>
    );
  }
}

export default SwitchSettings;
