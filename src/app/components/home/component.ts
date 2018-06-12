import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select, dispatch } from '@angular-redux/store';
import { IAppState } from '../../store/model';
import { routerSelector } from '../../store/location/selectors';
import { Language } from '../../store/session/model';
import { LanguageActions } from '../../store/session/actions';

@Component({
  selector: 'app-home',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class HomeComponent implements OnInit {

  @select(routerSelector)
  router$: Observable<string>;

  @dispatch() changeLanguage = (language: Language) => LanguageActions.SET_LANGUAGE(language);

  constructor() { }

  ngOnInit() {
  }

}
