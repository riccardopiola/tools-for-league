import React, { Children } from 'react';

import styles from '../Settings.css';

type Props = {
  children: Children,
  title: string
};

const SettingsSection = (props: Props) => {
  return (
    <div className={styles.settingsSection}>
      <div className={styles.sectionHeader}>
        {props.title}
      </div>
      {props.children}
    </div>
  );
};

export default SettingsSection;
