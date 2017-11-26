// @flow
import React, { Component } from 'react';
import Footer from './Footer';
import Selector from './Selector';
import Tooltip from './Tooltip';
import InstructionsDialog from './Instructions';
import type { TooltipSettings, SelectorsStore, SelectorObj } from './types';

import styles from './Editor.css';

type Props = {
  settings: {
    selectedFile: string,
    selectors: SelectorsStore
  }
}
type State = {
  activeSelector: string, // es. 'left:summoner5:spell1'
  tooltipSettings: TooltipSettings,
  selectors: SelectorsStore,
  dialogOpen: boolean
}

export default class Editor extends Component<Props, State> {
  state = {
    activeSelector: 'left:summoner1:spell1',
    tooltipSettings: {
      position: 'right',
      locked: true,
      mode: 'position'
    },
    dialogOpen: true,
    selectors: this.props.settings.selectors
  }
  handleIncrementalChangePos = (direction: 'up'|'down'|'left'|'right') => {
    const activeSelId = this.state.activeSelector;
    const selector: SelectorObj = this.state.selectors[activeSelId];
    switch (direction) {
      case 'up':
        selector.y -= 1;
        break;
      case 'down':
        selector.y += 1;
        break;
      case 'left':
        selector.x -= 1;
        break;
      case 'right':
        selector.x += 1;
        break;
      default:
        return;
    }
    const selectors = { ...this.state.selectors, [activeSelId]: selector };
    this.setState({ selectors });
  }
  handleIncrementalChangeSize = (direction: 'width+' | 'width-' | 'height+' | 'height-') => {
    const activeSelId = this.state.activeSelector;
    const selector: SelectorObj = this.state.selectors[activeSelId];
    switch (direction) {
      case 'width+':
        selector.width += 1;
        break;
      case 'width-':
        selector.width -= 1;
        break;
      case 'height+':
        selector.height += 1;
        break;
      case 'height-':
        selector.height -= 1;
        break;
      default:
        return;
    }
    const selectors = { ...this.state.selectors, [activeSelId]: selector };
    this.setState({ selectors });
  }
  onChangeSelectorProp = (key: string, val: number) => {
    const selector = this.state.selectors[this.state.activeSelector];
    selector[key] = val;
    this.setState({
      selectors: {
        ...this.state.selectors,
        [this.state.activeSelector]: selector
      }
    });
  }
  changeTooltipSettings = (key: any, value: any) => {
    const newSettings = { ...this.state.tooltipSettings };
    newSettings[key] = value;
    this.setState({ tooltipSettings: newSettings });
  }
  renderSelectors = () => {
    return Object.keys(this.state.selectors).map(selId => (
      <Selector
        key={selId}
        isActive={this.state.activeSelector === selId}
        data={this.state.selectors[selId]}
        onActivate={() => this.setState({ activeSelector: selId })}
      />
    ));
  }
  render() {
    return (
      <main className={styles.container}>
        <div className={styles.content}>
          <img src={this.props.settings.selectedFile} alt="Screenshot" />
        </div>
        <Footer
          activeSelector={this.state.activeSelector}
          changeActiveSelector={(selId) => this.setState({ activeSelector: selId })}
          tooltipSettings={this.state.tooltipSettings}
          selectorIdsArray={Object.keys(this.state.selectors)}
          selectors={this.state.selectors}
          changeSelectorProp={this.onChangeSelectorProp}
          changeTooltipSettings={this.changeTooltipSettings}
          onRequestDialogOpen={() => this.setState({ dialogOpen: true })}
        />
        {this.renderSelectors()}
        <Tooltip
          tooltipSettings={this.state.tooltipSettings}
          changeTooltipSettings={this.changeTooltipSettings}
          selectorData={this.state.selectors[this.state.activeSelector]}
          onChangePos={this.handleIncrementalChangePos}
          onChangeSize={this.handleIncrementalChangeSize}
        />
        <InstructionsDialog
          dialogOpen={this.state.dialogOpen}
          closeDialog={() => this.setState({ dialogOpen: false })}
        />
      </main>
    );
  }
}
