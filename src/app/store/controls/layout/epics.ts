import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { Action } from 'redux';
import { TranslateService } from '@ngx-translate/core';

import { timer } from 'rxjs/observable/timer';
import { filter, switchMap, startWith, map, flatMap } from 'rxjs/operators';
import { isErrorAction, ErrorAction } from '../../../../ipc/redux/isAction';
import { LayoutActions } from './actions';

@Injectable()
export class LayoutEpics {
  constructor(private translate: TranslateService) {}

  showError = (action$: ActionsObservable<any>) =>
    action$
      .pipe(
        filter(action => isErrorAction(action)),
        flatMap(error => this.getErrorMessage(error)),
        switchMap(message =>
          timer(5000).pipe(
            map(_ => LayoutActions.SET_ERROR_MESSAGE('')),
            startWith(LayoutActions.SET_ERROR_MESSAGE(message))
          )
        ),
    )

  private async getErrorMessage(action: ErrorAction): Promise<string> {
    const errorCode = action.payload.code;
    if (errorCode === undefined) {
      return JSON.stringify(action.payload);
    }
    return await this.translate.get(`error.code.${errorCode}`).toPromise();
  }
}
