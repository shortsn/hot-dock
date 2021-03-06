import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Action } from 'redux';
import { TranslateService } from '@ngx-translate/core';

import { filter, tap } from 'rxjs/operators';
import { SessionActions } from './actions';

@Injectable()
export class SessionEpics {
  constructor(private translate: TranslateService) {}

  setLanguage = (action$: ActionsObservable<Action>) =>
    action$
      .pipe(
        filter(SessionActions.is.SET_LANGUAGE),
        tap(action => this.translate.use(action.payload)),
        filter(_ => false),
      )
}
