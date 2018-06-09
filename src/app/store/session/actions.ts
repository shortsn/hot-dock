import { unionize, ofType } from 'unionize';
import { Language } from './model';

export const LanguageActions = unionize({
    SET_LANGUAGE: ofType<Language>()
}, 'type', 'payload');
