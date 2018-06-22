import { Component, ChangeDetectionStrategy } from '@angular/core';
import { select, dispatch } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { INavItem, IAlert } from '../../../store/controls/layout/model';
import {
  subNavSelector, hasSubNavSelector,
  sideNavSelector, hasSideNavSelector, alertsSelector, hasAlertsSelector
} from '../../../store/controls/layout/selectors';
import { LayoutActions } from '../../../store/controls/layout/actions';
import { isDockerHealthySelector } from '../../../store/data/docker/selectors';

@Component({
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

  @select(isDockerHealthySelector) readonly isDockerHealthy$: Observable<boolean>;

  @select(subNavSelector) readonly subNav$: Observable<INavItem[]>;
  @select(hasSubNavSelector) readonly hasSubNav$: Observable<boolean>;

  @select(sideNavSelector) readonly sideNav$: Observable<INavItem[]>;
  @select(hasSideNavSelector) readonly hasSideNav$: Observable<boolean>;

  @select(alertsSelector) readonly alerts$: Observable<IAlert>;
  @select(hasAlertsSelector) readonly hasAlerts$: Observable<boolean>;

  @dispatch() readonly dismissAlert = (alert: IAlert) => LayoutActions.REMOVE_ALERT(alert.id);

  @dispatch() readonly dismissAndDispatch = (alert: IAlert) => {
    this.dismissAlert(alert);
    return alert.action.value;
  }

}
