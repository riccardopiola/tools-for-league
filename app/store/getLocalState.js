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
  let localSettings;
  if (await fse.ensureFile(`${dataPath}/settings.json`))
    localSettings = await fse.readJson(`${dataPath}/settings.json`);
  else {
    localSettings = getDefaultSettings(dataPath);
    fse.writeJson(`${dataPath}/settings.json`, localSettings);
  }
  // Return a promise
  return localSettings;
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
