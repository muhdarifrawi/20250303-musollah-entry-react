const { app, BrowserWindow } = require('electron');
const path = require('node:path');
require('dotenv').config();
console.log(`\u001b[34mTOKEN from main: ${process.env.GITHUB_TOKEN} \u001b[0m`);

import { installExtension, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
console.log(`\u001b[34mNODE_ENV: ${process.env.NODE_ENV} \u001b[0m`);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // width: 800,
    // height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  console.log(`\u001b[32m\u001b[1mWEBPACK MAIN ENTRY: ${MAIN_WINDOW_WEBPACK_ENTRY}\u001b[0m`);
  console.log(`\u001b[32m\u001b[1mWEBPACK PRELOAD ENTRY: ${MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY}\u001b[0m`);
  
  mainWindow.maximize();

  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: ws: wss:;connect-src 'self' https://github.com/muhdarifrawi/;"
        ],
      },
    });
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

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

const { ipcMain } = require('electron');
const axios = require('axios');

ipcMain.handle('push-json-to-github', async (event, jsonData, sha) => {
  try {
    console.log("MAIN JS PUSH TO GITHUB >>> ", jsonData, sha);
    const TOKEN = process.env.GITHUB_TOKEN;
    const URL = process.env.GITHUB_FILE_URL;
    const PATH = process.env.GITHUB_PATH;
    const OWNER = process.env.GITHUB_OWNER;
    const REPO = process.env.GITHUB_REPO;
    console.log("\u001b[34m[main.js > push to github] GITHUB TOKEN\u001b[0m", TOKEN);
    console.log("\u001b[34m[main.js > push to github] GITHUB URL\u001b[0m", URL);
    console.log("\u001b[34m[main.js > push to github] GITHUB PATH\u001b[0m", PATH);
    console.log("\u001b[34m[main.js > push to github] GITHUB PATH\u001b[0m", OWNER);
    console.log("\u001b[34m[main.js > push to github] GITHUB PATH\u001b[0m", REPO);

    const res = await axios({
      method: 'put',
      url: URL,
      headers: {
        Authorization: `token ${TOKEN}`,
        'Content-Type': 'application/json',
        Accept: "application/vnd.github+json"
      },
      data: {
        owner: OWNER,
        repo: REPO,
        path: PATH,
        message: 'Update from Electron app',
        content: Buffer.from(JSON.stringify(jsonData)).toString('base64'),
        sha: sha,
      },
    });
    return { success: true, res: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data || err.message };
  }
});

ipcMain.handle('pull-json-from-github', async (event) => {
  try {
    const TOKEN = process.env.GITHUB_TOKEN;
    const URL = process.env.GITHUB_FILE_URL;
    console.log("\u001b[34m[main.js > pull from github] GITHUB TOKEN\u001b[0m", TOKEN);
    console.log("\u001b[34m[main.js > pull from github] GITHUB URL\u001b[0m", URL);

    const res = await axios.get(
        URL,
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                Accept: 'application/vnd.github+json',
            },
        }
    );

    return { success: true, res: res.data };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

