import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';
import { TranslateService } from '@ngx-translate/core';

import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { filter, startWith, map, flatMap, switchMap, auditTime } from 'rxjs/operators';
import { isErrorAction, ErrorAction } from '../../../../ipc/redux/isAction';
import { LayoutActions } from './actions';
import { IAlert, IAlertAction } from './model';

import { v4 as uuid } from 'uuid';
import { DockerActions } from '../../data/docker/actions';
import { SessionActions } from '../../session/actions';

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

  refresh = (action$: ActionsObservable<any>) =>
    action$.pipe(
      filter(LayoutActions.is.DISPATCH_ON_REFRESH),
      switchMap(
        action =>
          action.payload.length > 0
            ? action$.pipe(
                filter(a => DockerActions.is.DOCKER_EVENT(a) || SessionActions.is.DOCKER_SET_HEALTHY(a)),
                flatMap(_ => of(...action.payload)),
                auditTime(100),
                startWith(...action.payload)
              )
            : empty()
      )
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
