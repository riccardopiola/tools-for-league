// @flow
import React from 'react';

type Props = {
  onClick: (any) => void,
  label?: string,
  children?: any,
  classesArray?: string[],
  active?: boolean
}

const activeStyles = {
  backgroundColor: '#d5d5d5'
};

const Button = (props: Props) => {
  // $FlowFixMe
  const classes = ['top-button', ...props.classesArray];
  const styles = (props.active) ? activeStyles : {};
  return (
    <button
      style={styles}
      className={classes.join(' ')}
      onClick={props.onClick}
    >
      {props.label || props.children}
    </button>
  );
};

Button.defaultProps = {
  label: '',
  children: null,
  classesArray: [],
  active: false
};

export default Button;
