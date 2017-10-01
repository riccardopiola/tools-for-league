import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import styles from '../Settings.css';

class DropDownSelection extends Component {
  props: {
    handleChange: (string, string, string | boolean) => void, // section, title, newValue
    value: string,
    possibleValues: [string],
    message: string
  }
  render() {
    return (
      <div className={styles.singleSettingContainer}>
        <div className={styles.selectText}>{this.props.message}</div>
        <DropDownMenu
          value={this.props.value}
          onChange={(e, i, value) => this.props.handleChange('general', 'preferredServer', value)}
          className={styles.selectMenu}
        >
          {
            this.props.possibleValues.map(val => <MenuItem value={val} primaryText={val} key={val} />)
          }
        </DropDownMenu>
      </div>
    );
  }
}

export default DropDownSelection;
