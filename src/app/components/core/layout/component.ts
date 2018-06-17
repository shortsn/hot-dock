import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { INavItem } from '../../../store/controls/layout/model';
import { subNavSelector } from '../../../store/controls/layout/selectors';

@Component({
  selector: 'app-layout',
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

  @select(subNavSelector) subNav$: Observable<INavItem[]>;

}
