// @flow
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';

import styles from './LeagueFlash.css';

type Props = {
  status: 'error'|'update'|'loading'|'updating'|'ok',
  message: string,
  updateStaticData: () => void,
  revertPatch: () => void
};

const Box = (props: Props) => {
  let color = 'black';
  const buttonsArray = [];
  switch (props.status) {
    case 'ok':
      color = 'green';
      buttonsArray.push(<RevertButton onClick={props.revertPatch} />);
      break;
    case 'update':
      color = 'goldenrod';
      buttonsArray.push(<UpdateButton onClick={props.updateStaticData} />);
      break;
    case 'loading':
      color = 'grey';
      buttonsArray.push(<CircularProgress style={{ marginTop: '20px' }} />);
      break;
    case 'updating':
      color = 'rgb(201, 170, 113)';
      buttonsArray.push(<CircularProgress style={{ marginTop: '20px' }} />);
      break;
    default: // 'error'
      color = 'red';
      buttonsArray.push(<RevertButton onClick={props.revertPatch} />);      
      buttonsArray.push(<UpdateButton onClick={props.updateStaticData} />);      
  }
  if (props.message === 'No patch was found, please update')
    color = 'red';
  return (
    <div className={styles.messageBox}>
      <p style={{ color }}>
        {props.message}
      </p>
      <Divider />
      <div className={styles.patchActionsContainer}>
        {buttonsArray}
      </div>
    </div>
  );
};

const UpdateButton = ({ onClick }) => (
  <RaisedButton
    className={styles.patchButton}
    onClick={onClick}
  >
    UPDATE
  </RaisedButton>
);
const RevertButton = ({ onClick }) => (
  <RaisedButton
    style={{ backgroundColor: 'red' }}
    className={styles.patchButton}
    onClick={onClick}
  >
    REVERT
  </RaisedButton>
);

export default Box;
