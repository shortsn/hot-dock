import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { TranslateService } from '@ngx-translate/core';

import { timer } from 'rxjs/observable/timer';
import { filter, startWith, map, flatMap } from 'rxjs/operators';
import { isErrorAction, ErrorAction } from '../../../../ipc/redux/isAction';
import { LayoutActions } from './actions';
import { IAlert, IAlertAction } from './model';

import { v4 as uuid } from 'uuid';

@Injectable()
export class LayoutEpics {
  constructor(private translate: TranslateService) {}

  showError = (action$: ActionsObservable<any>) =>
    action$
      .pipe(
        filter(action => isErrorAction(action)),
        flatMap(error => this.getAlert(error)),
        map(LayoutActions.ADD_ALERT)
      )

  private async getAlert(errorAction: ErrorAction): Promise<IAlert> {

    const i18nKey = `error.${errorAction.type}`;
    const message = await this.translate.get(i18nKey, { ...errorAction.payload }).toPromise();

    const action: IAlertAction = errorAction.meta && errorAction.meta.originalAction
      ? { key: 'alert.retry', value: errorAction.meta.originalAction }
      : undefined;

    return {
      id: uuid(),
      type: 'danger',
      message,
      action
    };
  }
}
