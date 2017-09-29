import fs from 'fs';
import path from 'path';

export default function getInitialState() {
  return {
    app: {
      home: true
    }
  }
}

function fetchLocalSettings() {
  const AppDataFolder = (process.platform === 'darwin') ?
    '/Applications/Tools for Lol.app/Contents' :           // Mac path
    `${process.env.APPDATA}/../Local/Programs/tools-for-lol`; // Win path
  const settingsPath = path.join(AppDataFolder, 'data', 'settings.json');
  let settingsJSON;
  if (fs.readdirSync(AppDataFolder).some(name => name === 'data')) {
    settingsJSON = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
  } else {
    settingsJSON = getDefaultSettings(settingsPath);
    fs.mkdirSync(`${AppDataFolder}/data`);
    fs.writeFileSync(settingsPath, JSON.stringify(settingsJSON));
  }
  return settingsJSON;
}

function getDefaultSettings(settingsPath) {
  let lolFolder;
  if (process.platform === 'darwin') {
    lolFolder = `${process.env.HOME}/Applications/League of Legends.app/Contents/LoL`;
  } else {
    lolFolder = 'C:/Riot Games/League of Legends';
  }
  return {
    general: {
      lolFolder,
      settingsPath,
      preferredServer: 'EUW'
    }
  };
}
