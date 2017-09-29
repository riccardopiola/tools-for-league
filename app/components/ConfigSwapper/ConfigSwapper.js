// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import ArrowDownwardIcon from 'material-ui/svg-icons/navigation/arrow-downward';
import AddIcon from 'material-ui/svg-icons/content/add';
import fs from 'fs';

import styles from './ConfigSwapper.css';

const buttonStyles = {
  width: '200px',
};

class ConfigSwapper extends Component {
  props: {
    dataPath: string
  }
  state: {
    selectedConfiguration: string,
    savedConfigurations: Array,
    temporaryConfigurations: Array
  }
  constructor(props) {
    super(props);
    this.getLocalData = this.getLocalData.bind(this);
    const configurations = this.getLocalData();
    this.state = {
      ...configurations
    };
  }
  getLocalData(): Object {
    let configurations = {};
    try {
      const savedArray = fs.readdirSync(`${this.props.dataPath}/savedConfigurations`);
      const savedConfigurations = savedArray.reduce((prev, name, i) => {
        prev.push((
          <ListItem
            key={i}
            leftCheckbox={<Checkbox onCheck={(e, check) => this.handleCheck('saved', name, check)} />}
            primaryText={name}
          />
        ));
        return prev;
      }, []);
      configurations = { savedConfigurations };
    } catch (error) {
      console.error(error);
      configurations = { savedConfigurations: [] };
    }
    try {
      const tempArray = fs.readdir(`${this.props.dataPath}/temporaryConfigurations`);
      const temporaryConfigurations = tempArray.reduce((prev, name, i) => {
        prev.push((
          <ListItem
            key={i}
            leftCheckbox={<Checkbox onCheck={(e, check) => this.handleCheck('temp', name, check)} />}
            primaryText={name}
          />
        ));
        return prev;
      }, []);
      configurations = { ...configurations, temporaryConfigurations };
    } catch (error) {
      console.error(error);
      configurations = { ...configurations, temporaryConfigurations: [] };
    }
    return configurations;
  }
  handleCheck = (name: string, check: boolean) => {
    if (check) {
      this.setState({ selectedConfiguration: name });
    }
  }
  render() {
    return (
      <div className={styles.configSwapperContainer}>
        <AppBar
          showMenuIconButton={false}
          title="ConfigSwapper"
          className={styles.AppBar}
        />
        <div className={styles.buttonsContainer}>
          <RaisedButton
            label="ADD CONFIG"
            icon={<AddIcon />}
            buttonStyle={buttonStyles}
            className={styles.buttons}
            primary={true}
          />
          <RaisedButton
            label="INJECT CONFIG"
            icon={<ArrowDownwardIcon />}
            primary={true}
            buttonStyle={buttonStyles}
            className={styles.buttons}
          />
        </div>
        <div className={styles.listsContainer}>
          <Subheader>Saved Configurations</Subheader>
          <List>
            {this.state.savedConfigurations}
          </List>
          <Subheader>Temporary configurations</Subheader>
          <List>
            {this.state.temporaryConfigurations}
          </List>
        </div>
      </div>
    );
  }
}

export default ConfigSwapper;
