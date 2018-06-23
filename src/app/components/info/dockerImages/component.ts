import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select, dispatch } from '@angular-redux/store';

import { DockerActions } from '../../../store/data/docker/actions';
import { dockerImagesSelector } from '../../../store/data/docker/selectors';
import { LayoutActions } from '../../../store/controls/layout/actions';
import { DockerImage } from '../../../store/data/docker/model';

@Component({
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerImagesComponent implements OnInit {

  @select(dockerImagesSelector) readonly dockerImages$: Observable<DockerImage[]>;

  @dispatch() readonly fetchDockerImages = () => DockerActions.DOCKER_FETCH_IMAGES({});
  @dispatch() readonly removeDockerImage = (image: DockerImage) => DockerActions.DOCKER_REMOVE_IMAGE(image.imageInfo);

  @dispatch() readonly setNavItems = () => LayoutActions.SET_NAV({
    subNav: [
      { key: 'images.nav', link: '/info/images' },
      { key: 'containers.nav', link: '/info/containers' }
    ],
    sideNav: []
  })

  ngOnInit() {
    this.setNavItems();
    this.fetchDockerImages();
  }

}
