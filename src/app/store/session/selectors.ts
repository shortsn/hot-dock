import { IAppState } from '../model';

export const languageSelector = (state: IAppState) => state.session.language;
