import { dispatch, select } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LayoutActions } from '../../../store/controls/layout/actions';
import { DockerActions } from '../../../store/data/docker/actions';
import { DockerContainer } from '../../../store/data/docker/model';
import { dockerContainerSelector } from '../../../store/data/docker/selectors';
import subNav from '../subNav';
import { QueryParams } from './model';
import { Port } from 'dockerode';
import { ClrDatagridStringFilterInterface } from '@clr/angular';

class ContainerStateFilter implements ClrDatagridStringFilterInterface<DockerContainer> {
  accepts(container: DockerContainer, search: string): boolean {
    const state = container.containerInfo.State;
    console.log(state);
    console.log(search);
    switch (search) {
      case '~running':
          return state === 'running' || state === 'restarting';
      case '~paused':
        return state === 'paused';
      case '~stopped':
        return state === 'exited' || state === 'created';
      default:
        return state.startsWith(search);
    }
  }
}

@Component({
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerContainersComponent implements OnInit {

  readonly containerStateFilter = new ContainerStateFilter();

  readonly queryParams$: Observable<QueryParams>;

  @select(dockerContainerSelector) readonly dockerContainers$: Observable<DockerContainer[]>;

  @dispatch() readonly removeDockerContainer = (container: DockerContainer) =>
    DockerActions.DOCKER_REMOVE_CONTAINER(container.containerInfo.Id)

  @dispatch() readonly startDockerContainer = (container: DockerContainer) =>
    DockerActions.DOCKER_START_CONTAINER(container.containerInfo.Id)

  @dispatch() readonly pauseDockerContainer = (container: DockerContainer) =>
    DockerActions.DOCKER_PAUSE_CONTAINER(container.containerInfo.Id)

  @dispatch() readonly unpauseDockerContainer = (container: DockerContainer) =>
    DockerActions.DOCKER_UNPAUSE_CONTAINER(container.containerInfo.Id)

  @dispatch() readonly stopDockerContainer = (container: DockerContainer) =>
    DockerActions.DOCKER_STOP_CONTAINER(container.containerInfo.Id)

  @dispatch() readonly killDockerContainer = (container: DockerContainer) =>
    DockerActions.DOCKER_KILL_CONTAINER(container.containerInfo.Id)

  @dispatch() readonly setNavItems = () => LayoutActions.SET_NAV({
    subNav,
    sideNav: []
  })

  @dispatch() readonly subscribeData = () => LayoutActions.DISPATCH_ON_REFRESH([
    DockerActions.DOCKER_FETCH_CONTAINERS({})
  ])

  constructor(route: ActivatedRoute) {
    this.queryParams$ = route.queryParams;
  }

  ngOnInit() {
    this.setNavItems();
    this.subscribeData();
  }

  buildUrl = (dockerPort: Port): string =>
    `http://${dockerPort.IP === '0.0.0.0' ? '127.0.0.1' : dockerPort.IP}:${dockerPort.PublicPort}`

}
