import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';

import { LayoutActions } from '../../../store/controls/layout/actions';
import { Observable } from 'rxjs/Observable';
import { DockerActions } from '../../../store/data/docker/actions';
import { DockerContainer } from '../../../store/data/docker/model';
import { dockerContainerSelector } from '../../../store/data/docker/selectors';

@Component({
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerContainersComponent implements OnInit {

  @select(dockerContainerSelector) readonly dockerContainers$: Observable<DockerContainer[]>;

  @dispatch() readonly fetchDockerContainers = () => DockerActions.DOCKER_FETCH_CONTAINERS({});

  @dispatch() readonly setNavItems = () => LayoutActions.SET_NAV({
    subNav: [
      { key: 'images.nav', link: '/info/images' },
      { key: 'containers.nav', link: '/info/containers' }
    ],
    sideNav: []
  })

  ngOnInit() {
    this.setNavItems();
    this.fetchDockerContainers();
  }

}
