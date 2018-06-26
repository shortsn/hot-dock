import { Middleware } from 'redux';
import { ElectronActions } from '../../app/store/communication/electron/actions';
import { shell } from 'electron';

export const createElectronApiMiddleware: () => Middleware = () =>
  store => next => (action: any) => {
    const dispatched = next(action);

    ElectronActions.match<any, any>({

      ELECTRON_OPEN_EXTERNAL: url =>
        store.dispatch(
          shell.openExternal(url)
            ? ElectronActions.ELECTRON_OPEN_EXTERNAL_SUCCESS(url)
            : ElectronActions.ELECTRON_OPEN_EXTERNAL_FAILURE(url)
          )

    }, () => { })(action);

    return dispatched;
  };



