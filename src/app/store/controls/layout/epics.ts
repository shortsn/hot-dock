import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { TranslateService } from '@ngx-translate/core';

import { timer } from 'rxjs/observable/timer';
import { filter, startWith, map, flatMap } from 'rxjs/operators';
import { isErrorAction, ErrorAction } from '../../../../ipc/redux/isAction';
import { LayoutActions } from './actions';
import { IAlert } from './model';

import { v4 as uuid } from 'uuid';

@Injectable()
export class LayoutEpics {
  constructor(private translate: TranslateService) {}

  showError = (action$: ActionsObservable<any>) =>
    action$
      .pipe(
        filter(action => isErrorAction(action)),
        flatMap(error => this.getAlert(error)),
        flatMap(alert =>
          timer(20000).pipe(
            map(_ => LayoutActions.REMOVE_ALERT(alert.id)),
            startWith(LayoutActions.ADD_ALERT(alert))
          )
        ),
    )

  private async getAlert(action: ErrorAction): Promise<IAlert> {
    const errorCode = action.payload.code;

    const message = errorCode === undefined
      ? JSON.stringify(action.payload)
      : await this.translate.get(`error.code.${errorCode}`).toPromise();

    return {
      id: uuid(),
      type: 'danger',
      message
    };
  }
}
