import fs from 'fs';
import path from 'path';

export default function getInitialState() {
  const localSettings = fetchLocalSettings();
  return {
    app: {
      selectedSubApp: 'Home',
      canChangeSubApp: true,
      openExitDialog: false
    },
    ping: {
      completed: 0,
      ping: -1,
      ready: true
    },
    settings: {
      lolFolder: localSettings.lolFolder,
      preferredServer: localSettings.preferredServer
    }
  };
}

function fetchLocalSettings() {
  const AppDataFolder = (process.platform === 'darwin') ?
    '/Applications/Tools for Lol.app/Contents' :           // Mac path
    `${process.env.APPDATA}/../Local/Programs/tools-for-lol`; // Win path
  const settingsPath = path.join(AppDataFolder, 'settings', 'settings.json');
  let settingsJSON;
  if (fs.readdirSync(AppDataFolder).some(name => name === 'settings')) {
    settingsJSON = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
  } else {
    settingsJSON = getDefaultSettings();
    fs.mkdirSync(`${AppDataFolder}/settings`);
    fs.writeFileSync(settingsPath, JSON.stringify(settingsJSON));
  }
  return settingsJSON;
}

function getDefaultSettings() {
  let lolFolder;
  if (process.platform === 'darwin') {
    lolFolder = `${process.env.HOME}/Applications/League of Legends.app/Contents/LoL`;
  } else {
    lolFolder = 'C:/Riot Games/League of Legends';
  }
  return {
    lolFolder,
    preferredServer: 'EUW'
  }
}
