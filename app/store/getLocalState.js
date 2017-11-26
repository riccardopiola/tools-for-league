import fse from 'fs-extra';
import path from 'path';
import { push } from 'react-router-redux';

import { defaultLocalSettings } from './initialState';

export default function init() {
  return (dispatch) => {
    getLocalState()
      .then(localSettings => {
        dispatch({
          type: 'INIT_LOCAL_SETTINGS',
          payload: localSettings
        });
        dispatch(push('/home'));
      })
      .catch(e => {
        // Have to decide what to do with it
        console.error(e);
      });
  };
}

async function getLocalState() {
  // Get the path to the App
  const AppDataFolder = (process.platform === 'darwin') ?
  '/Applications/Tools for Lol.app/Contents' :              // Mac path
  `${process.env.APPDATA}/../Local/Programs/tools-for-lol`; // Win path
  // Get the path to the data folder
  const dataPath = path.join(AppDataFolder, 'data');
  // Create 'data', 'temporaryConfigurations' and 'savedConfigurations' if dont exist
  const tempConfigs = fse.ensureDir(`${dataPath}/temporaryConfigurations`);
  const savedConfigs = fse.ensureDir(`${dataPath}/savedConfigurations`);
  await Promise.all([tempConfigs, savedConfigs]);
  // Get the localsettings from the settings.json or create the file with standard settings
  const defaultSettings = getDefaultSettings(dataPath);
  let newSettings = defaultSettings;
  if (await fse.pathExists(`${dataPath}/settings.json`)) {
    try {
      const savedSettings = await fse.readJson(`${dataPath}/settings.json`);
      newSettings = updateLocalSettings(defaultSettings, savedSettings);
    } catch (e) {
      newSettings = defaultSettings;
    }
  }
  fse.writeJson(`${dataPath}/settings.json`, newSettings);
  return newSettings;
}

function updateLocalSettings(defaultSettings, savedSettings) {
  Object.keys(defaultSettings).forEach(key => {
    if (savedSettings[key]) {
      Object.keys(defaultSettings[key]).forEach(smallerKey => {
        if (!savedSettings[key][smallerKey])
          savedSettings[key][smallerKey] = defaultSettings[key][smallerKey];
      });
    } else {
      savedSettings[key] = defaultSettings[key];
    }
  });
  return savedSettings;
}

function getDefaultSettings(dataPath) {
  let lolFolder;
  if (process.platform === 'darwin') {
    lolFolder = `${process.env.HOME}/Applications/League of Legends.app/Contents/LoL`;
  } else {
    lolFolder = 'C:/Riot Games/League of Legends';
  }
  return {
    ...defaultLocalSettings,
    general: {
      ...defaultLocalSettings.general,
      lolFolder,
      dataPath,
    }
  };
}
