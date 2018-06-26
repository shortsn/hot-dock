import { unionize, ofType } from 'unionize';

export const ElectronActions = unionize({

    ELECTRON_OPEN_EXTERNAL: ofType<string>(),
    ELECTRON_OPEN_EXTERNAL_FAILURE: ofType<string>(),
    ELECTRON_OPEN_EXTERNAL_SUCCESS: ofType<string>(),

}, 'type', 'payload');
