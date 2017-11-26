// @flow
import React from 'react';
import type { SelectorObj } from './types';

import styles from './Editor.css';

type Props = {
  data: SelectorObj,
  isActive: boolean,
  onActivate: () => void
}

const Selector = (props: Props) => {
  const positionStyles = {
    top: `${props.data.y}px`,
    left: `${props.data.x}px`,
    height: `${props.data.height}px`,
    width: `${props.data.width}px`
  };
  const containerClass = (props.isActive) ?
    styles.selectorContainerActive :
    styles.selectorContainer;
  return (
    <div
      style={positionStyles}
      className={containerClass}
      onClick={props.onActivate}
    />
  );
}

export default Selector;
