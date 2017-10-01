export type SettingsType = {
  general: {
    lolFolder: string,
    dataPath: string,
    preferredServer: 'EUW' | 'EUNE' | 'NA' | 'OCE' | 'LAN'
  },
  ping: {
    interval: string, //Has to be parsed into INT
  }
};

const defaultLocalSettings = {
  general: {
    // 2 path settings
    preferredServer: 'EUW'
  },
  ping: {
    interval: '1000'
  }
};

export default defaultLocalSettings;
