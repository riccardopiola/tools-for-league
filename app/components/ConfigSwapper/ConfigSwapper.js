// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import ArrowDownwardIcon from 'material-ui/svg-icons/navigation/arrow-downward';
import AddIcon from 'material-ui/svg-icons/content/add';
import TrashIcon from 'material-ui/svg-icons/action/delete';
import Toggle from 'material-ui/Toggle';

import styles from './ConfigSwapper.css';

const buttonStyles = {
  width: '200px',
};

class ConfigSwapper extends Component {
  props: {
    savedConfigurations: Array,
    tempConfigurations: Array,
    refreshConfigurations: () => void,
    saveConfiguration: (string) => void,
    eliminateConfiguration: (string) => void,
    injectConfiguration: (string) => void
  }
  state: {
    selectedConfig?: string,
    saveDialog: boolean,
    injectDialog: boolean,
    saveName: string,
    tempName: string,
    tempToggle: boolean
  }
  constructor(props) {
    super(props);
    this.props.refreshConfigurations();
    this.state = {
      saveDialog: false,
      injectDialog: false,
      saveName: '',
      tempName: '',
      tempToggle: false
    };
  }
  handleCheck = (name: string, check: boolean) => {
    if (check) {
      this.setState({ selectedConfig: name });
    }
  }
  openDialog = (dialogName: 'injectDialog' | 'saveDialog') => {
    this.setState({ [dialogName]: true });
  }
  closeDialog = (dialogName: 'injectDialog' | 'saveDialog') => {
    this.setState({ [dialogName]: false });
  }
  handleChangeText = (event, mode: 'temp' | 'save') => {
    this.setState({
      [`${mode}Name`]: event.target.value,
    });
  }
  handleSave = () => {
    if (this.state.saveName && this.state.saveName !== '')
      this.props.saveConfiguration(this.state.saveName);
    this.closeDialog('saveDialog');
  }
  handleInject = () => {
    if (this.state.selectedConfig)
      this.props.injectConfiguration(this.state.selectedConfig,
        this.state.tempToggle, this.state.tempName);
    this.closeDialog('injectDialog');
  }
  handleTempToggle = () => {
    this.setState({ tempToggle: !this.state.tempToggle });
  }
  render() {
    const savedConfigurations = this.props.savedConfigurations.map((name, i) => (
      <ListItem
        key={i}
        leftCheckbox={<Checkbox
          onCheck={(e, check) => this.handleCheck(name, check)}
          checked={this.state.selectedConfig === name} />} // eslint-disable-line
        primaryText={name}
      />
    ));
    const tempConfigurations = this.props.tempConfigurations.map((name, i) => (
      <ListItem
        key={i}
        leftCheckbox={<Checkbox
          onCheck={(e, check) => this.handleCheck(name, check)}
          checked={this.state.selectedConfig === name} />} // eslint-disable-line
        primaryText={name}
      />
    ));
    return (
      <div className={styles.configSwapperContainer}>
        <AppBar
          showMenuIconButton={false}
          title="Configurations Swapper"
          className={styles.AppBar}
        />
        <div className={styles.buttonsContainer}>
          <RaisedButton
            label="ADD CONFIG"
            icon={<AddIcon />}
            buttonStyle={buttonStyles}
            className={styles.buttons}
            primary={true}
            onClick={() => this.openDialog('saveDialog')}
          />
          <RaisedButton
            label="INJECT CONFIG"
            icon={<ArrowDownwardIcon />}
            primary={true}
            buttonStyle={buttonStyles}
            className={styles.buttons}
            onClick={() => this.openDialog('injectDialog')}
          />
          <RaisedButton
            label="ELIMINATE CONFIG"
            icon={<TrashIcon />}
            primary={true}
            buttonStyle={buttonStyles}
            className={styles.buttons}
            onClick={() => this.props.eliminateConfiguration(this.state.selectedConfig)}
          />
        </div>
        <div className={styles.listsContainer}>
          <Subheader>Saved Configurations</Subheader>
          <List>
            {savedConfigurations}
          </List>
          <Subheader>Temporary configurations</Subheader>
          <List>
            {tempConfigurations}
          </List>
        </div>
        <Dialog
          title="Save current settings"
          actions={[
            <FlatButton
              label="BACK"
              onClick={() => this.closeDialog('saveDialog')}
            />,
            <FlatButton
              label="OK"
              onClick={this.handleSave}
              primary={true}
            />
          ]}
          modal={false}
          open={this.state.saveDialog}
          onRequestClose={() => this.closeDialog('saveDialog')}
        >
          <TextField
            hintText="Name the configuration"
            value={this.state.saveName}
            onChange={(e) => this.handleChangeText(e, 'save')}
          />
        </Dialog>
        <Dialog
          title="Inject configuration"
          actions={[
            <FlatButton
              label="BACK"
              onClick={() => this.closeDialog('injectDialog')}
            />,
            <FlatButton
              label="OK"
              onClick={() => this.handleInject()}
              primary={true}
            />,
          ]}
          modal={false}
          open={this.state.injectDialog}
          onRequestClose={() => this.closeDialog('injectDialog')}
        >
          <Toggle
            label="Save current config"
            toggled={this.state.tempToggle}
            onToggle={this.handleTempToggle}
          />
          <TextField
            hintText="Name current config [temp]"
            value={this.state.tempName}
            onChange={(e) => this.handleChangeText(e, 'temp')}
            disabled={!this.state.tempToggle}
          />
        </Dialog>
      </div>
    );
  }
}

export default ConfigSwapper;
