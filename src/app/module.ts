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
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { IAppState } from './store/model';
import rootReducer from './store/reducer';
import { compose, applyMiddleware } from 'redux';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { routerSelector } from './store/location/selectors';
import { SessionEpics } from './store/session/epics';
import { createEpicMiddleware } from 'redux-observable';
import { forwardToMain, getInitialStateRenderer, replayActionRenderer } from '../ipc/redux/renderer';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
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
    ngRedux: NgRedux<IAppState>, ngReduxRouter: NgReduxRouter, devTools: DevToolsExtension,
    sessionEpics: SessionEpics, translate: TranslateService
  ) {

    let enhancers = [];

    if (devTools.isEnabled()) {
      enhancers = [ ...enhancers, devTools.enhancer() ];
    }

    const middlewares = [
      forwardToMain, // IMPORTANT! This goes first,
      createEpicMiddleware(sessionEpics.setLanguage)
    ];

    const initialState = getInitialStateRenderer<IAppState>();
    ngRedux.configureStore(rootReducer, initialState, middlewares, enhancers);
    replayActionRenderer(ngRedux);
    translate.setDefaultLang(initialState.session.language);
    ngReduxRouter.initialize(routerSelector);
  }
}
