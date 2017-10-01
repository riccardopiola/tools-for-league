import fs from 'fs';
import path from 'path';

import defaultSettings from '../components/Settings/settingsFile';

const initialState = {
  app: {
    selectedSubApp: 'Home',
    canChangeSubApp: true,
    openExitDialog: false
  },
  ping: {
    display: 'GO',
    completed: true,
    pingsArray: []
  },
  // settings: fetchLocalSettings(),
  config: {
    savedConfigurations: [],
    tempConfigurations: []
  }
};

export default function getInitialState() {
  const AppDataFolder = (process.platform === 'darwin') ?
    '/Applications/Tools for Lol.app/Contents' :              // Mac path
    `${process.env.APPDATA}/../Local/Programs/tools-for-lol`; // Win path
  const dataPath = path.join(AppDataFolder, 'data');
  initializeFolders(dataPath);
  const localSettings = fetchLocalSettings(dataPath);
  return {
    ...initialState,
    settings: localSettings
  }
}

function initializeFolders(dataPath) {
  if (!fs.readdirSync(`${dataPath}/..`).includes('data'))
    fs.mkdirSync(dataPath);
  if (!fs.readdirSync(dataPath).includes('temporaryConfigurations'))
    fs.mkdirSync(`${dataPath}/temporaryConfigurations`);
  if (!fs.readdirSync(dataPath).includes('savedConfigurations'))
    fs.mkdirSync(`${dataPath}/savedConfigurations`);
}

function fetchLocalSettings(dataPath) {
  let settingsJSON;
  if (fs.readdirSync(dataPath).includes('settings.json')) {
    settingsJSON = JSON.parse(fs.readFileSync(`${dataPath}/settings.json`, 'utf-8'));
  } else {
    settingsJSON = getDefaultSettings(dataPath);
    fs.writeFileSync(`${dataPath}/settings.json`, JSON.stringify(settingsJSON));
  }
  return settingsJSON;
}

function getDefaultSettings(dataPath) {
  let lolFolder;
  if (process.platform === 'darwin') {
    lolFolder = `${process.env.HOME}/Applications/League of Legends.app/Contents/LoL`;
  } else {
    lolFolder = 'C:/Riot Games/League of Legends';
  }
  return {
    ...defaultSettings,
    general: {
      lolFolder,
      dataPath,
    }
  };
}
