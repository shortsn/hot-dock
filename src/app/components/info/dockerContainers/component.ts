import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { dispatch, select } from '@angular-redux/store';

import { LayoutActions } from '../../../store/controls/layout/actions';
import { Observable } from 'rxjs/Observable';
import { DockerActions } from '../../../store/data/docker/actions';
import { DockerContainer } from '../../../store/data/docker/model';
import { dockerContainerSelector } from '../../../store/data/docker/selectors';
import { QueryParams } from './model';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerContainersComponent implements OnInit {

  readonly queryParams$: Observable<QueryParams>;

  @select(dockerContainerSelector) readonly dockerContainers$: Observable<DockerContainer[]>;

  @dispatch() readonly fetchDockerContainers = () => DockerActions.DOCKER_FETCH_CONTAINERS({});
  @dispatch() readonly removeDockerContainer = (container: DockerContainer) =>
    DockerActions.DOCKER_REMOVE_CONTAINER(container.containerInfo)

  @dispatch() readonly setNavItems = () => LayoutActions.SET_NAV({
    subNav: [
      { key: 'images.nav', link: '/info/images' },
      { key: 'containers.nav', link: '/info/containers' }
    ],
    sideNav: []
  })

  constructor(route: ActivatedRoute) {
    this.queryParams$ = route.queryParams;
  }

  ngOnInit() {
    this.setNavItems();
    this.fetchDockerContainers();
  }

}
