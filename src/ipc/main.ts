import { ipcMain, BrowserWindow, IpcMain } from 'electron';
import { getRendererResponseChannels, getResponseChannels } from './util';

/**
 * based on https://github.com/sindresorhus/electron-better-ipc
 */
export interface BetterIpc {
  callRenderer<TIn, TOut>(window: BrowserWindow, channel: string, data: TIn): Promise<TOut>;
  /**
   * @example
   * ipc.answerRenderer('test.log', (data: string) => {
   *   console.log(data);
   *   return 'logged on main';
   * });
   * @param channel
   * @param callback
   */
  answerRenderer<TIn, TOut>(channel: string, callback: (data: TIn, window: BrowserWindow) => TOut): void;
  sendToRenderers<TData>(channel: string, data: TData): void;
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
