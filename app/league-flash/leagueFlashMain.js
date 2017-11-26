import { ipcMain, Menu } from 'electron';
import { createLeagueAppWin, createScraperWin, createEditorWindow } from './createWindows';

let leagueAppWindow = null;
let scraperWin = null;
let editorWin = null;

/* LEAGUE FLASH */

ipcMain.on('launch-league-app', async (event, settingsString) => {
  const settings = JSON.parse(settingsString);
  leagueAppWindow = createLeagueAppWin(settings);

  leagueAppWindow.once('closed', () => {
    leagueAppWindow = null;
  });
});

ipcMain.on('close-league-flash', () => {
  if (leagueAppWindow)
    leagueAppWindow.close();
});
ipcMain.on('enter-game-mode', () => {
  leagueAppWindow.setBounds({
    x: 0,
    y: 0,
    width: 200,
    height: 300
  });
  if (process.platform === 'win32')
    leagueAppWindow.setFocusable(false);
});
ipcMain.on('leave-game-mode', () => {
  leagueAppWindow.setBounds({
    x: 0,
    y: 0,
    width: 250,
    height: 150
  });
  if (process.platform === 'win32')
    leagueAppWindow.setFocusable(true);
});

/* SCRAPER WINDOW */

type ScraperSettings1 = {
  showBrowserWindow: boolean,
  username: string,
  preferredServer: string
};

ipcMain.on('open-scraper-win', async (event, settingsString: string) => {
  const settings: ScraperSettings1 = JSON.parse(settingsString);

  if (!scraperWin) {
    const initSettings = {
      ...settings,
      preloadedScript: `${__dirname}/utils/scrapeOPGG`
    };
    scraperWin = createScraperWin(initSettings, leagueAppWindow);
  }

  const server = settings.preferredServer.toLowerCase();
  const url = `http://${server}.op.gg/summoner/userName=${settings.username}`;
  scraperWin.loadURL(url);

  scraperWin.once('closed', () => {
    scraperWin = null;
  });
});

ipcMain.on('finished-scraping-data', (e, message, data) => {
  if (!scraperWin.isVisible())
    scraperWin.close();
  leagueAppWindow.webContents.send('scraping-data', message, data);
  e.returnValue = null;
});

ipcMain.on('close-scraper', () => {
  if (scraperWin)
    scraperWin.close();
});

/* EDITOR WINDOW */

ipcMain.on('open-editor-window', (e, settings) => {
  editorWin = createEditorWindow(settings);

  editorWin.once('closed', () => {
    leagueAppWindow = null;
  });
  const menu = Menu.buildFromTemplate([
    { label: 'App' },
    {
      label: 'Zoom',
      submenu: [
        { role: 'zoomin' },
        { role: 'zoomout' }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
});
