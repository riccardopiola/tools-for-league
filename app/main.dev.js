/* eslint global-require: 1, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import MenuBuilder from './menu';

let mainWindow = null;
let leagueAppWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); //eslint-disable-line
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path'); //eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p); //eslint-disable-line
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

ipcMain.on('open-select-directory', event => {
  dialog.showOpenDialog(mainWindow, {
    title: 'Select League of Legends folder',
    properties: ['openDirectory']
  }, dirPath => {
    event.sender.send('folder-selected', dirPath);
  });
});

ipcMain.on('launch-league-app', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  leagueAppWindow = new BrowserWindow({
    show: false,
    width: 250,
    height: 330,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    useContentSize: true,
    skipTaskbar: true,
    x: 0,
    y: 0
  });

  leagueAppWindow.loadURL(`file://${__dirname}/league-flash.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  leagueAppWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"leagueAppWindow" is not defined');
    }
    leagueAppWindow.show();
    leagueAppWindow.focus();
  });

  leagueAppWindow.on('closed', () => {
    leagueAppWindow = null;
  });
});

ipcMain.on('close-league-flash', () => {
  leagueAppWindow.close();
});
