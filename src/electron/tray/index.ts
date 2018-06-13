import { platform as getPlatform } from 'os';
import * as path from 'path';
import { Tray, nativeImage, Menu, MenuItemConstructorOptions } from 'electron';

const iconFolder = path.join(__dirname, '..', '..', 'assets', 'tray');
const platform = getPlatform();

export const createTray = (...template: MenuItemConstructorOptions[]) => {
  let trayImage = 'tray.png';

  if (platform === 'win32') {
    trayImage = 'tray.png';
  }

  const tray = new Tray(path.join(iconFolder, trayImage));
  if (platform === 'darwin') {
    tray.setPressedImage(nativeImage.createFromPath(path.join(iconFolder, 'trayPressed.png')));
  }

  tray.setContextMenu(Menu.buildFromTemplate(template));
  return tray;
};
