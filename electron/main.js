const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1400, height: 860, minWidth: 1100, minHeight: 700,
    backgroundColor: '#0b0d1a', title: 'SYNQ',
    icon: path.join(__dirname, '..', 'resources', 'icon.png'),
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, '..', 'www', 'index.html'));
  // запрет масштабирования
  win.webContents.on('did-finish-load', () => win.webContents.setVisualZoomLevelLimits(1, 1));
  win.webContents.on('before-input-event', (e, input) => {
    if ((input.control || input.meta) && ['+', '-', '=', '0'].includes(input.key)) e.preventDefault();
  });
  win.webContents.on('zoom-changed', () => win.webContents.setZoomFactor(1));
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
