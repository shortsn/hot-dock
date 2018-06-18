import { Component, ChangeDetectionStrategy } from '@angular/core';
import { select, dispatch } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { INavItem, IAlert } from '../../../store/controls/layout/model';
import {
  subNavSelector, hasSubNavSelector,
  sideNavSelector, hasSideNavSelector, alertsSelector, hasAlertsSelector
} from '../../../store/controls/layout/selectors';
import { LanguageActions } from '../../../store/session/actions';
import { LayoutActions } from '../../../store/controls/layout/actions';
import { Action } from 'redux';

@Component({
  selector: 'app-layout',
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

  @select(subNavSelector) subNav$: Observable<INavItem[]>;
  @select(hasSubNavSelector) hasSubNav$: Observable<boolean>;

  @select(sideNavSelector) sideNav$: Observable<INavItem[]>;
  @select(hasSideNavSelector) hasSideNav$: Observable<boolean>;

  @select(alertsSelector) alerts$: Observable<IAlert>;
  @select(hasAlertsSelector) hasAlerts$: Observable<boolean>;

  @dispatch() langGer = () => LanguageActions.SET_LANGUAGE('de');
  @dispatch() langEn = () => LanguageActions.SET_LANGUAGE('en');

  @dispatch() dismissAlert = (alert: IAlert) => LayoutActions.REMOVE_ALERT(alert.id);

  @dispatch() dismissAndDispatch = (alert: IAlert) => {
    this.dismissAlert(alert);
    return alert.action.value;
  }

}
