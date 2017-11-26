// @flow
import React, { Component } from 'react';
import type { SelectorObj, TooltipSettings } from './types';

import styles from './Editor.css';

const selectedInlineStyles = {
  color: 'blue'
}

type Props = {
  selectorData: SelectorObj,
  tooltipSettings: TooltipSettings,
  changeTooltipSettings: (key: any, value: any) => void,
  onChangePos: (direction: 'up' | 'down' | 'left' | 'right') => void,
  onChangeSize: (direction: 'width+' | 'width-' | 'height+' | 'height-') => void,
}
type State = {
  coordinates: SelectorObj
}

class Tooltip extends Component<Props, State> {
  componentWillMount() {
    this.setState({ coordinates: this.props.selectorData });
  }
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.tooltipSettings.locked === false) {
      if (this.state.coordinates !== nextProps.selectorData)
        this.setState({ coordinates: nextProps.selectorData });
    }
  }
  calculateToolTipCoordinates = () => {
    if (this.props.tooltipSettings.position === 'right')
      return {
        top: `${this.props.selectorData.y - 20}px`,
        left: `${this.props.selectorData.x + 40}px`,
      };
    return {
      top: `${this.props.selectorData.y - 20}px`,
      left: `${this.props.selectorData.x - 200}px`,
    };
  }
  render() {
    const { mode } = this.props.tooltipSettings;
    const coordinates = this.calculateToolTipCoordinates();
    return (
      <div
        className={styles.tooltipContainer}
        style={coordinates}
      >
        <div className={styles.tolltipSettingsTop}>
          <div className={styles.tooltipLockedSetting}>
            <label
              htmlFor="lock"
              className={styles.lockTooltipLabel}
            >lock tooltip</label>
            <input
              id="lock"
              type="checkbox"
              value={this.props.tooltipSettings.locked}
              onChange={() => this.props.changeTooltipSettings('locked', !this.props.tooltipSettings.locked)}
            />
          </div>
          <div className={styles.tooltipModeSettingsContainer}>
            <div
              className={styles.tooltipModeSetting}
              style={(mode === 'position') ? selectedInlineStyles : {}}
              onClick={() => this.props.changeTooltipSettings('mode', 'position')}
            >
              Position
            </div>
            <div
              className={styles.tooltipModeSetting}
              style={(mode === 'size') ? selectedInlineStyles : {}}
              onClick={() => this.props.changeTooltipSettings('mode', 'size')}
            >
              Box Size
            </div>
          </div>
        </div>
        {(mode === 'position') ? (
          <PositionCommands onChange={this.props.onChangePos} />
        ) : <SizeCommands onChange={this.props.onChangeSize} />}
      </div>
    );
  }
}

const PositionCommands = (props: { onChange: (any) => void }) => (
  <div className={styles.tooltipCommands}>
    <div
      className={styles.tooltipArrow}
      onClick={() => props.onChange('up')}
    >
      <span>⇧</span>
    </div>
    <div
      className={styles.tooltipArrow}
      onClick={() => props.onChange('left')}
    >
      <span>⇦</span>
    </div>
    <div
      className={styles.tooltipArrow}
      onClick={() => props.onChange('right')}
    >
      <span>⇨</span>
    </div>
    <div
      className={styles.tooltipArrow}
      onClick={() => props.onChange('down')}
    >
      <span>⇩</span>
    </div>
  </div>
);

const SizeCommands = (props: { onChange: (any) => void }) => (
  <div className={styles.tooltipCommands}>
    <div
      className={styles.tooltipArrow}
      onClick={() => props.onChange('width+')}
    >
      <span>⬄ + </span>
    </div>
    <div
      className={styles.tooltipArrow}
      onClick={() => props.onChange('width-')}
    >
      <span>⬄ - </span>
    </div>
    <div
      className={styles.tooltipArrow}
      onClick={() => props.onChange('height+')}
    >
      <span>⇳ + </span>
    </div>
    <div
      className={styles.tooltipArrow}
      onClick={() => props.onChange('height-')}
    >
      <span>⇳ - </span>
    </div>
  </div>
);

export default Tooltip;
