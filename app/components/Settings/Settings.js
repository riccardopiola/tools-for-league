// @flow
import React from 'react';
import Divider from 'material-ui/Divider';

import FolderSelection from './API/FolderSelection';
import SettingsSection from './API/SettingsSection';
import DropDownSetting from './API/DropDownSetting';
import TextFieldSetting from './API/TextFieldSetting';

import type { SettingsType } from '../../store/initialState';
import * as validate from './validate';

type Props = { settings: SettingsType };

const SettingsContent = (props: Props) => {
  return (
    <div>
      <SettingsSection title="General">
        <FolderSelection
          paths={['general', 'lolFolder']}
          value={props.settings.general.lolFolder}
          validateFunctionAsync={validate.lolFolder}
        />
        <Divider style={{ margin: '-1px 24px 0px 24px', marginLeft: '24px' }} />
        <DropDownSetting
          message="Preferred region"
          possibleValues={['EUW', 'EUNE', 'NA', 'OCE', 'LAN']}
          paths={['general', 'preferredServer']}
          value={props.settings.general.preferredServer}
        />
      </SettingsSection>
      <SettingsSection title="Ping">
        <TextFieldSetting
          message="Inteval between pings (milliseconds)"
          name="pingInterval"
          paths={['ping', 'interval']}
          value={props.settings.ping.interval}
          validateFunctionSync={validate.intervalPing}
        />
      </SettingsSection>
    </div>
  );
};

export default SettingsContent;
