import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './routing.module';

// NG Translate
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './component';

// Redux
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { IAppState } from './store/model';
import rootReducer from './store/reducer';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { routerSelector } from './store/location/selectors';
import { SessionEpics } from './store/session/epics';
import { createEpicMiddleware } from 'redux-observable';
import { initializeStore } from '../environments/environment';

import { CoreModule } from './components/core/module';
import { LayoutEpics } from './store/controls/layout/epics';
import { DockerContainersComponentEpics } from './store/controls/dockerContainers/epics';
import { DockerImagesComponentEpics } from './store/controls/dockerImages/epics';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
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
    SessionEpics,
    LayoutEpics,
    DockerContainersComponentEpics,
    DockerImagesComponentEpics,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<IAppState>, ngReduxRouter: NgReduxRouter,
    sessionEpics: SessionEpics, layoutEpics: LayoutEpics,
    containersComponentEpics: DockerContainersComponentEpics, imagesComponentEpics: DockerImagesComponentEpics,
    translate: TranslateService
  ) {

    const middlewares = [
      createEpicMiddleware(sessionEpics.setLanguage),
      createEpicMiddleware(layoutEpics.showError),
      createEpicMiddleware(containersComponentEpics.loadContainers),
      createEpicMiddleware(imagesComponentEpics.loadImages)
    ];

    const initialState = initializeStore(ngRedux, rootReducer, middlewares, []);

    translate.setDefaultLang(initialState.session.language.toString());
    ngReduxRouter.initialize(routerSelector);
  }
}
