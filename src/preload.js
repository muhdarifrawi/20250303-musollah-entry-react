// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('env', {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
});

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
    // we can also expose variables, not just functions
})

console.log("\u001b[34mPRELOAD: ", GITHUB_TOKEN + "\u001b[0m");