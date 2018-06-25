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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  @select(dockerInfoSelector) readonly dockerSystemInfo$: Observable<DockerSystemInfo>;

  @dispatch() readonly fetchDockerInfo = () => DockerActions.DOCKER_FETCH_SYSTEM_INFO({});
  @dispatch() readonly setNavItems = () => LayoutActions.SET_NAV({
    subNav,
    sideNav: []
  })

  ngOnInit() {
    this.setNavItems();
    this.fetchDockerInfo();
  }

}
