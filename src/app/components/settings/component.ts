import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Language } from '../../store/session/model';
import { SessionActions } from '../../store/session/actions';
import { dispatch, select } from '@angular-redux/store';
import { LayoutActions } from '../../store/controls/layout/actions';
import { Observable } from 'rxjs/Observable';
import { languageSelector } from '../../store/session/selectors';

@Component({
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {

  readonly languages = Object.values(Language).filter(value => typeof value === 'string') as string[];

  @select(languageSelector) readonly currentLanguage$: Observable<Language>;

  @dispatch() readonly changeLanguage = (language: Language) => SessionActions.SET_LANGUAGE(language);
  @dispatch() readonly setNavItems = () => LayoutActions.SET_NAV({ sideNav: [], subNav: [] });

  @dispatch() readonly unSubscribeData = () => LayoutActions.DISPATCH_ON_REFRESH([]);

  ngOnInit(): void {
    this.setNavItems();
    this.unSubscribeData();
  }

}
