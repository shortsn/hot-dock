import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, dispatch } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { INavItem } from '../../../store/controls/layout/model';
import {
  subNavSelector, hasSubNavSelector,
  sideNavSelector, hasSideNavSelector, errorMessageSelector, hasErrorMessageSelector
} from '../../../store/controls/layout/selectors';
import { LanguageActions } from '../../../store/session/actions';

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

  @select(errorMessageSelector) errorMessage$: Observable<string>;
  @select(hasErrorMessageSelector) hasErrorMessage$: Observable<boolean>;

  @dispatch() langGer = () => LanguageActions.SET_LANGUAGE('de');
  @dispatch() langEn = () => LanguageActions.SET_LANGUAGE('en');

}
