import { dispatch, select } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LayoutActions } from '../../../store/controls/layout/actions';
import { DockerActions } from '../../../store/data/docker/actions';
import { dockerInfoSelector } from '../../../store/data/docker/selectors';
import subNav from '../subNav';
import { DockerSystemInfo } from '../../../store/data/docker/model';

@Component({
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  @select(dockerInfoSelector) readonly dockerSystemInfo$: Observable<DockerSystemInfo>;

  @dispatch() readonly setNavItems = () => LayoutActions.SET_NAV({
    subNav,
    sideNav: []
  })

  @dispatch() readonly subscribeData = () => LayoutActions.DISPATCH_ON_REFRESH([
    DockerActions.DOCKER_FETCH_SYSTEM_INFO({})
  ])

  ngOnInit() {
    this.setNavItems();
    this.subscribeData();
  }

}
