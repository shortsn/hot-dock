import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './routing.module';

// NG Translate
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './component';
import { HomeComponent } from './components/home/component';

// Redux
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { IAppState } from './store/model';
import rootReducer from './store/reducer';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { routerSelector } from './store/location/selectors';
import { SessionEpics } from './store/session/epics';
import { createEpicMiddleware } from 'redux-observable';
import { initializeStore } from '../environments/environment';

import { ClarityModule } from '@clr/angular';

import { ClarityIcons } from '@clr/icons';
import { ClrShapeFloppy } from '@clr/icons/shapes/technology-shapes';
import { LayoutComponent } from './components/layout/component';

ClarityIcons.add({
  floppy: ClrShapeFloppy
});

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgReduxModule,
    NgReduxRouterModule.forRoot()
  ],
  providers: [
    SessionEpics
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<IAppState>, ngReduxRouter: NgReduxRouter,
    sessionEpics: SessionEpics, translate: TranslateService
  ) {

    const middlewares = [
      createEpicMiddleware(sessionEpics.setLanguage)
    ];

    const initialState = initializeStore(ngRedux, rootReducer, middlewares, []);

    translate.setDefaultLang(initialState.session.language);
    ngReduxRouter.initialize(routerSelector);
  }
}
