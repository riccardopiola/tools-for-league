// @flow

// Initial Redux store
export default {
  app: {
    permissionToExit: true,
    wannaGoTo: '/home'
  },
  ping: {
    display: 'GO',
    completed: true,
    pingsArray: []
  },
  settings: {
    local: 'loading', // fetching from disk happens asyncronously will be 'SettingsType'
    stagedChanges: [],
    openExitDialog: false
  },
  config: {
    savedConfigurations: [],
    tempConfigurations: []
  }
};

export type SettingsType = {
  general: {
    lolFolder: string,
    dataPath: string,
    preferredServer: 'EUW' | 'EUNE' | 'NA' | 'OCE' | 'LAN'
  },
  ping: {
    interval: string, // Has to be parsed into INT
  }
};

export const defaultLocalSettings = {
  general: {
    // 2 path settings
    preferredServer: 'EUW'
  },
  ping: {
    interval: '1000'
  }
};
