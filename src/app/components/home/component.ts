import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { IAppState } from '../../store/model';
import { routerSelector } from '../../store/location/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class HomeComponent implements OnInit {

  @select(routerSelector)
  router$: Observable<string>;

  constructor() { }

  ngOnInit() {
  }

}
