import { BrowserWindow, Menu } from 'electron';

type LeagueAppSettings = {

};

export function createLeagueAppWin(settings: LeagueAppSettings) {
  const win = new BrowserWindow({
    show: false,
    width: 250,
    height: 150,
    frame: false,
    transparent: true,
    hasShadow: false,
    alwaysOnTop: true,
    useContentSize: true,
    skipTaskbar: true,
    title: 'League Flash',
    x: 0,
    y: 0
  });

  win.loadURL(`file://${__dirname}/league-flash.html`);

  win.webContents.once('did-finish-load', () => {
    if (!win) {
      throw new Error('"win" is not defined');
    }
    win.show();
    win.focus();
    win.webContents.send('settings', JSON.stringify(settings));
    win.webContents.openDevTools();
  });
  return win;
}

type ScraperSettings = {
  preloadedScript: string,
  showBrowserWindow: boolean,
};

export function createScraperWin(settings: ScraperSettings, parentWin: BrowserWindow) {
  const win = new BrowserWindow({
    alwaysOnTop: true,
    show: false,
    width: 1024,
    height: 728,
    skipTaskbar: true,
    webPreferences: {
      webSecurity: false,
      allowRunningInsecureContent: true,
      preload: settings.preloadedScript,
      nodeIntegration: false
    }
  });

  win.webContents.once('did-finish-load', () => {
    parentWin.webContents.send('scraper-finished-loading');
    win.webContents.send('did-finish-load');
    if (settings.showBrowserWindow) {
      win.show();
      win.focus();
    }
  });

  return win;
}


export function createEditorWindow(settings: string) {
  const win = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    fullscreen: true,
    title: 'Screenshot editor'
  });

  win.loadURL(`file://${__dirname}/../editor/editor.html`);

  win.webContents.once('did-finish-load', () => {
    if (!win) {
      throw new Error('"win" is not defined');
    }
    win.show();
    win.focus();
    win.webContents.send('settings', settings);
  });
  const template = [
    {
      label: 'File',
      submenu: [
        { role: 'togglefullscreen' },
        { role: 'minimize' },
        { role: 'close' },
        { role: 'quit' }
      ]
    },
    { role: 'editMenu' },
    {
      label: 'Zoom',
      submenu: [
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' }
      ]
    }
  ];
  if (process.env.NODE_ENV === 'development')
    template[0].submenu.push({ role: 'toggledevtools' });
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  return win;
}
