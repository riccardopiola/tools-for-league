/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. It starts renderer processes
 * and communcates with them with them via IPC
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import MenuBuilder from './menu';

let mainWindow = null;

/**
 * INITAIALIZATION
 */

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')(); // eslint-disable-line
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  // $FlowFixMe
  require('module').globalPaths.push(p); // eslint-disable-line
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer'); // eslint-disable-line
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  app.quit();
});

/**
 * CREATE THE MAIN WINDOW
 */
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

ipcMain.on('open-select-directory', (event, mode) => {
  const properties = [];
  if (mode === 'dir')
    properties.push('openDirectory');
  else if (mode === 'file')
    properties.push('openFile');
  dialog.showOpenDialog(mainWindow, {
    title: 'Select League of Legends folder',
    properties
  }, dirPath => {
    event.sender.send('folder-selected', dirPath);
  });
});

/**
 * RUN THE CODE FOR THE LEAGUE FLASH EXTENSION
 */
require('./league-flash/leagueFlashMain.js');

ipcMain.on('mapping-done', (e, selectors) => {
  mainWindow.webContents.send('mapping-done', selectors);
});
