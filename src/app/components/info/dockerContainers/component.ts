import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { dispatch } from '@angular-redux/store';

import { LayoutActions } from '../../../store/controls/layout/actions';

@Component({
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerContainersComponent implements OnInit {

  @dispatch() readonly setNavItems = () => LayoutActions.SET_NAV({
    subNav: [
      { key: 'images.nav', link: '/info/images' },
      { key: 'containers.nav', link: '/info/containers' }
    ],
    sideNav: []
  })

  ngOnInit() {
    this.setNavItems();
  }

}
