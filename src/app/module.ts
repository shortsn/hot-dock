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
import { compose, applyMiddleware } from 'redux';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { routerSelector } from './store/location/selectors';
import { SessionEpics } from './store/session/epics';
import { createEpicMiddleware } from 'redux-observable';

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
    ngRedux: NgRedux<IAppState>, ngReduxRouter: NgReduxRouter,
    sessionEpics: SessionEpics, translate: TranslateService
  ) {

    const composeEnhancers = typeof window === 'object' && (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            features: {
              pause: false, // start/pause recording of dispatched actions
              lock: false, // lock/unlock dispatching actions and side effects
              persist: false, // persist states on page reloading
              export: false, // export history of actions in a file
              import: false, // 'custom', // import history of actions from a file
              jump: false, // jump back and forth (time travelling)
              skip: false, // skip (cancel) actions
              reorder: false, // drag and drop actions in the history list
              dispatch: false, // dispatch custom actions or action creators
              test: false, // generate tests for the selected actions
            }
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
      : compose;

    const enhancer = composeEnhancers(
      applyMiddleware(
        createEpicMiddleware(sessionEpics.setLanguage)
      )
    );

    ngRedux.configureStore(rootReducer, enhancer);
    const initialState = ngRedux.getState();
    translate.setDefaultLang(initialState.session.language);

    ngReduxRouter.initialize(routerSelector);
  }
}
