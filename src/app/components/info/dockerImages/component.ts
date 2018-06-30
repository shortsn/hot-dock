import { dispatch, select } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LayoutActions } from '../../../store/controls/layout/actions';
import { DockerActions } from '../../../store/data/docker/actions';
import { DockerImage } from '../../../store/data/docker/model';
import { dockerImagesSelector } from '../../../store/data/docker/selectors';
import subNav from '../subNav';
import { QueryParams } from './model';

@Component({
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerImagesComponent implements OnInit {

  readonly queryParams$: Observable<QueryParams>;

  @select(dockerImagesSelector) readonly dockerImages$: Observable<DockerImage[]>;

  @dispatch() readonly removeDockerImage = (image: DockerImage) => DockerActions.DOCKER_REMOVE_IMAGE(image.imageInfo);
  @dispatch() readonly createDockerContainer = (image: DockerImage) =>
    DockerActions.DOCKER_CREATE_CONTAINER({ imageId: image.imageInfo.Id })

  @dispatch() readonly setNavItems = () => LayoutActions.SET_NAV({
    subNav,
    sideNav: []
  })

  @dispatch() readonly subscribeData = () => LayoutActions.DISPATCH_ON_REFRESH([
    DockerActions.DOCKER_FETCH_IMAGES({})
  ])

  constructor(route: ActivatedRoute) {
    this.queryParams$ = route.queryParams;
  }

  ngOnInit() {
    this.setNavItems();
    this.subscribeData();
  }

}
