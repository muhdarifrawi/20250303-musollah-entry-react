const { app, BrowserWindow } = require('electron');
const path = require('path');
require('dotenv').config();
console.log('TOKEN from main:', process.env.GITHUB_TOKEN);

import { installExtension, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
console.log('\u001b[34m'+'NODE_ENV:', process.env.NODE_ENV + '\u001b[0m');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // mainWindow.loadURL(`${MAIN_WINDOW_WEBPACK_ENTRY}#/`);

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: ws: wss:"
        ],
      },
    });
  });

  mainWindow.webContents.once("did-finish-load", () => {
    mainWindow.webContents.executeJavaScript(`
      if (!window.location.hash || window.location.hash === "#") {
        window.location.replace("#/");
      }
    `);
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  // electron-devtools: https://github.com/MarshallOfSound/electron-devtools-installer
  // loads only in development mode. `npm start`.
  if (process.env.NODE_ENV === 'development') {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((ext) => {
        console.log(`\u001b[34mAdded Extension:  ${ext.name}\u001b[0m`);
        setTimeout(() => {
          BrowserWindow.getAllWindows().forEach(win => win.reload());
        }, 1000);
      })
      .catch((err) => console.log('An error occurred: ', err));
  }

  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
