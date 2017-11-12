// @flow
import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import BaseSetting from './BaseSetting';
import type { SpecificSetting } from './BaseSetting';
import styles from './Settings.css';

type Props = {
  possibleValues: string[],
  message: string,
  // Passing down
  value: string,
  paths: string[]
};
type State = {
  newValue: string,
  valid: boolean
};

class DropDownSetting extends Component<Props, State> implements SpecificSetting {
  state = {
    newValue: this.props.value,
    valid: true
  }
  onChange = (event: Object, i: number, newValue: string) => {
    this.setState({ newValue });
  }
  render() {
    return (
      <div className={styles.singleSettingContainer}>
        <div className={styles.selectText}>{this.props.message}</div>
        <DropDownMenu
          value={this.state.newValue}
          onChange={this.onChange}
          className={styles.selectMenu}
        >
          {
            this.props.possibleValues.map(val => <MenuItem value={val} primaryText={val} key={val} />) // eslint-disable-line
          }
        </DropDownMenu>
        <BaseSetting
          {...this.props}
          newValue={this.state.newValue}
          valid={this.state.valid}
        />
      </div>
    );
  }
}

export default DropDownSetting;
