import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select, dispatch } from '@angular-redux/store';
import { routerSelector } from '../../../store/location/selectors';
import { Language } from '../../../store/session/model';
import { LanguageActions } from '../../../store/session/actions';

import { DockerActions } from '../../../store/data/docker/actions';
import { dockerImagesSelector } from '../../../store/data/docker/selectors';
import { ImageInfo } from 'dockerode';
import { LayoutActions } from '../../../store/controls/layout/actions';

@Component({
  selector: 'app-home',
  templateUrl: './component.html',
})
export class HomeComponent implements OnInit {

  @select(routerSelector) router$: Observable<string>;
  @select(dockerImagesSelector) dockerImages$: Observable<ImageInfo>;

  @dispatch() changeLanguage = (language: Language) => LanguageActions.SET_LANGUAGE(language);
  @dispatch() fetchDockerImages = () => DockerActions.FETCH_DOCKER_IMAGES({});

  @dispatch() setNavItems = () => LayoutActions.SET_NAV({
    subNav: [
      { key: 'nav.images', link: '/info/images' },
      { key: 'nav.containers', link: '/info/containers' }
    ],
    sideNav: []
  })

  @dispatch() setSideNavItems = () => LayoutActions.SET_SIDENAV([]);

  constructor() { }

  ngOnInit() {
    this.setNavItems();
    this.fetchDockerImages();
  }

}
