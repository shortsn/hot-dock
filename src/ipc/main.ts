import { ipcMain, BrowserWindow, IpcMain } from 'electron';
import { getRendererResponseChannels, getResponseChannels } from './util';

export interface BetterIpc {
  callRenderer(window, channel: string, data): Promise<{}>;
  answerRenderer(channel: string, callback: Function);
  sendToRenderers(channel: string, data);
}

const ipc: IpcMain & BetterIpc = ipcMain as any;

ipc.callRenderer = (window, channel, data) => new Promise((resolve, reject) => {
  const {sendChannel, dataChannel, errorChannel} = getRendererResponseChannels(window.id, channel);

  const cleanup = () => {
    ipc.removeAllListeners(dataChannel);
    ipc.removeAllListeners(errorChannel);
  };

  ipc.on(dataChannel, (event, result) => {
    cleanup();
    resolve(result);
  });

  ipc.on(errorChannel, (event, error) => {
    cleanup();
    reject(error);
  });

  if (window.webContents) {
    window.webContents.send(sendChannel, data);
  }
});

ipc.answerRenderer = (channel, callback) => {
  const {sendChannel, dataChannel, errorChannel} = getResponseChannels(channel);

  ipc.on(sendChannel, async (event, data) => {
    const window = BrowserWindow.fromWebContents(event.sender);

    const send = (chan, dat) => {
      if (!(window && window.isDestroyed())) {
        event.sender.send(chan, dat);
      }
    };

    try {
      send(dataChannel, await callback(data, window));
    } catch (error) {
      send(errorChannel, error);
    }
  });
};

ipc.sendToRenderers = (channel, data) => {
  for (const window of BrowserWindow.getAllWindows()) {
    if (window.webContents) {
      window.webContents.send(channel, data);
    }
  }
};

export default ipc;
