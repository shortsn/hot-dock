import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';

import { LayoutActions } from '../../../store/controls/layout/actions';
import { dockerContainerInfosSelector } from '../../../store/data/docker/selectors';
import { Observable } from 'rxjs/Observable';
import { ContainerInfo } from 'dockerode';
import { DockerActions } from '../../../store/data/docker/actions';

@Component({
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerContainersComponent implements OnInit {

  @select(dockerContainerInfosSelector) readonly dockerContainers$: Observable<ContainerInfo[]>;

  @dispatch() readonly fetchDockerContainers = () => DockerActions.FETCH_DOCKER_CONTAINERS({});

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
