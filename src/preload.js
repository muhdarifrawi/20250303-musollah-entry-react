// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

// Will show up on the browser terminal
console.log(`\u001b[34m\u001b[1mPRELOAD TRIGGERED \u001b[0m`);

contextBridge.exposeInMainWorld('env', {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    GITHUB_FILE_URL: process.env.GITHUB_FILE_URL
});

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
    // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('github', {
    pushJson: (jsonData, sha) => ipcRenderer.invoke('push-json-to-github', jsonData, sha),
    pullJson: () => ipcRenderer.invoke('pull-json-from-github'),
});
