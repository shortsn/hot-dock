import { dispatch, select } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LayoutActions } from '../../../store/controls/layout/actions';
import subNav from '../subNav';
import { QueryParams } from './model';
import { dockerRecentEventsSelector } from '../../../store/data/docker/selectors';
import { DockerEvent } from '../../../store/data/docker/model';
import { ClrDatagridSortOrder } from '@clr/angular';

@Component({
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentDockerEventsComponent implements OnInit {

  readonly descSort = ClrDatagridSortOrder.DESC;
  readonly queryParams$: Observable<QueryParams>;

  @select(dockerRecentEventsSelector) readonly dockerEvents$: Observable<DockerEvent[]>;

  @dispatch() readonly setNavItems = () => LayoutActions.SET_NAV({
    subNav,
    sideNav: []
  })

  @dispatch() readonly unSubscribeData = () => LayoutActions.DISPATCH_ON_REFRESH([]);

  constructor(route: ActivatedRoute) {
    this.queryParams$ = route.queryParams;
  }

  ngOnInit() {
    this.setNavItems();
    this.unSubscribeData();
  }

}
