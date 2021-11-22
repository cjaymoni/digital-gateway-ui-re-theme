import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './shared-ui-modules/layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponentComponent } from './test/test-component/test-component.component';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { userAuthReducer } from './store/reducers/user-auth.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducersMap } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { appStoreEffects } from './store/app.effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, TestComponentComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    StoreModule.forRoot(appReducersMap),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot(appStoreEffects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      features: {
        pause: false,
        lock: true,
        persist: true,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
