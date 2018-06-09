import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { IAppState } from '../../store/model';

@Component({
  selector: 'app-home',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class HomeComponent implements OnInit {


  @select((state: IAppState) => state.location.router)
  router$: Observable<string>;

  constructor() { }

  ngOnInit() {
  }

}
