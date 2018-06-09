import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

// Redux
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { IAppState } from './store/model';
import rootReducer from './store/reducer';
import { compose } from 'redux';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, HomeComponent, WebviewDirective],
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, ngReduxRouter: NgReduxRouter) {

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

    const enhancer = composeEnhancers();
    // applyMiddleware(...middleware),

    // other store enhancers if any

    ngRedux.configureStore(rootReducer, enhancer);
    ngReduxRouter.initialize(
      state => state.location.router
    );
  }
}
