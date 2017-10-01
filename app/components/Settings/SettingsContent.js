import React from 'react';
import Divider from 'material-ui/Divider';

import FolderSelection from './components/FolderSelection';
import SettingsSection from './components/SettingsSection';
import DropDownSelection from './components/DropDownSelection';
import TextFieldSelection from './components/TextFieldSelection';

type Props = {
  handleChange: (string, string, string | boolean) => void, // section, title, newValue
  general: {
    lolFolder: string,
    preferredServer: string
  },
  ping: {
    interval: string
  }
};

const SettingsContent = (props: Props) => {
  return (
    <div>
      <SettingsSection title="General">
        <FolderSelection
          section="general"
          title="lolFolder"
          folder={props.general.lolFolder}
          onChange={props.handleChange}
        />
        <Divider style={{ margin: '-1px 24px 0px 24px', marginLeft: '24px' }} />
        <DropDownSelection
          handleChange={props.handleChange}
          value={props.general.preferredServer}
          possibleValues={['EUW', 'EUNE', 'NA', 'OCE', 'LAN']}
          message="Preferred region"
        />
      </SettingsSection>
      <SettingsSection title="Ping">
        <TextFieldSelection
          message="Inteval between pings (milliseconds)"
          name="pingInterval"
          value={props.ping.interval}
          handleChange={props.handleChange}
        />
      </SettingsSection>
    </div>
  );
};

export default SettingsContent;
