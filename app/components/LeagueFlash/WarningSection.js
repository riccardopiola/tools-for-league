// @flow
import React from 'react';
import WarningIcon from 'material-ui/svg-icons/alert/warning';

import styles from './LeagueFlash.css';

type Props = {
  mapping?: boolean,
  patch?: boolean
}

const WarningSection = (props: Props) => {
  let message = '';
  if (props.mapping)
    message = 'No mapping found: Please create one with the Editor or generate one';
  else if (props.patch)
    message = 'No patch found: Please perform an update';
  else
    return null;
  return (
    <div className={styles.warningContainer}>
      <WarningIcon
        style={{ margin: '5px', marginLeft: '15px' }}
      />
      <p>
        {message}
      </p>
    </div>
  );
}

export default WarningSection;
