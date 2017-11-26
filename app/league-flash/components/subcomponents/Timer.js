// @flow
import React from 'react';
import styles from '../../styles/Game.css';

type Props = {
  spellColor: {
    color: string,
    txtColor: string
  },
  timeout: number,
}

const Timer = (props: Props) => {
  const style = {
    backgroundColor: props.spellColor.color,
    color: props.spellColor.txtColor
  };
  return (
    <div
      className={styles.spellTimer}
      style={style}
    >
      {`${props.timeout}s`}
    </div>
  );
};

export default Timer;
