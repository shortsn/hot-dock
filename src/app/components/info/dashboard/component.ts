import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { dispatch } from '@angular-redux/store';

import { LayoutActions } from '../../../store/controls/layout/actions';
import subNav from '../subNav';

@Component({
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  @dispatch() readonly setNavItems = () => LayoutActions.SET_NAV({
    subNav,
    sideNav: []
  })

  ngOnInit() {
    this.setNavItems();
  }

}
