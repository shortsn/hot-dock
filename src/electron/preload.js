const electron = require('electron');

window.ipcRenderer = electron.ipcRenderer;
window.getCurrentWindow = electron.remote.getCurrentWindow;
