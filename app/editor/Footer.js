// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import type { TooltipSettings, SelectorsStore } from './types';

import styles from './Editor.css';

type Props = {
  tooltipSettings: TooltipSettings,
  activeSelector: string,
  selectorIdsArray: Array<string>,
  selectors: SelectorsStore,
  changeActiveSelector: (selId: string) => void,
  changeSelectorProp: (key: string, val: number) => void,
  changeTooltipSettings: (key: string, val: any) => void,
  onRequestDialogOpen: () => void
}
type State = {
  exitDialog: boolean
}

export default class Editor extends Component<Props, State> {
  state = {
    exitDialog: false
  }
  handleChangeActiveSelector = (e, i: number) => {
    this.props.changeActiveSelector(this.props.selectorIdsArray[i]);
  }
  handleChangeSelectorProp = (prop: string, newValue: string) => {
    this.props.changeSelectorProp(prop, Number.parseInt(newValue, 10));
  }
  handleChangeTooltipPosition = () => {
    const newPos = (this.props.tooltipSettings.position === 'left') ? 'right' : 'left';
    this.props.changeTooltipSettings('position', newPos);
  }
  handleFinished = () => {
    ipcRenderer.send('mapping-done', JSON.stringify(this.props.selectors));
  }
  render() {
    const activeSelId = this.props.activeSelector;
    return (
      <Paper zDepth={3} className={styles.footer}>
        <div className={styles.actionBar}>
          <SelectField
            floatingLabelText="Selected box"
            value={this.props.selectorIdsArray.indexOf(activeSelId)}
            onChange={this.handleChangeActiveSelector}
            className={styles.footerDropDownName}
            disabled
          >
            {
              this.props.selectorIdsArray.map((selId, i) => (
                <MenuItem
                  key={i}
                  value={i}
                  primaryText={selId.replace(':', ' ')}
                />
              ))
            }
          </SelectField>
          <TextField
            className={styles.footerSelectorCoord}
            floatingLabelText="x"
            value={this.props.selectors[activeSelId].x}
            type="number"
            onChange={(e, n) => this.handleChangeSelectorProp('x', n)}
          />
          <TextField
            className={styles.footerSelectorCoord}
            floatingLabelText="y"
            value={this.props.selectors[activeSelId].y}
            type="number"
            onChange={(e, n) => this.handleChangeSelectorProp('y', n)}
          />
          <TextField
            className={styles.footerSelectorCoord}
            floatingLabelText="width"
            value={this.props.selectors[activeSelId].width}
            type="number"
            onChange={(e, n) => this.handleChangeSelectorProp('width', n)}
          />
          <TextField
            className={styles.footerSelectorCoord}
            floatingLabelText="height"
            value={this.props.selectors[activeSelId].height}
            type="number"
            onChange={(e, n) => this.handleChangeSelectorProp('height', n)}
          />
          <RaisedButton
            style={{ flex: '1.5 0 150px' }}
            label={`tooltip: ${this.props.tooltipSettings.position}`.toUpperCase()}
            onClick={this.handleChangeTooltipPosition}
          />
          <FlatButton
            icon={<InfoIcon />}
            style={{ flex: '0.5 0 70px', margin: '0 10px' }}
            onClick={this.props.onRequestDialogOpen}
          />
        </div>
        <div className={styles.endButton}>
          <RaisedButton
            primary
            label="FINISHED"
            onClick={this.setState({ exitDialog: true })}
          />
        </div>
        <Dialog
          title="Save the current settings?"
          modal={false}
          open={this.state.exitDialog}
          onRequestClose={this.setState({ exitDialog: false })}
          autoScrollBodyContent={true}
          actions={[
            <RaisedButton
              label="Cancel"
              onClick={this.setState({ exitDialog: false })}
            />,
            <RaisedButton
              primary
              label="OK"
              onClick={this.handleFinished}
            />
          ]}
        />
      </Paper>
    );
  }
}
