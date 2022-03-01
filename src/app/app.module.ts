import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { EffectsModule } from '@ngrx/effects';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CookieModule } from 'ngx-cookie';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ERROR_MESSAGES_MAPPING } from './config/app-config';
import { DirectivesModule } from './directives/directives.module';
import { ErrorMessageInterceptor } from './interceptors/error.interceptor';
import { LoginTokenInterceptor } from './interceptors/login-token.interceptor';
import { LoginModule } from './pages/login/login.module';
import { SearchResultsModule } from './pages/search-results/search-results.module';
import { SignupFormModule } from './pages/signup/signup-form/signup-form.module';
import { LayoutModule } from './shared-ui-modules/layout/layout.module';
import { appStoreEffects } from './store/app.effects';
import { appReducersMap } from './store/app.reducers';
import { TestComponentModule } from './test/test-component/test-component.module';
import { GtagModule } from 'angular-gtag';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    TestComponentModule,
    LoginModule,
    SignupFormModule,
    SearchResultsModule,
    DirectivesModule,
    ErrorTailorModule.forRoot(ERROR_MESSAGES_MAPPING),
    StoreModule.forRoot(appReducersMap),
    StoreRouterConnectingModule.forRoot(),
    TransferHttpCacheModule,
    GtagModule.forRoot({
      trackingId: environment.GTAG_ID,
      trackPageviews: false,
    }),
    CookieModule.forRoot({
      httpOnly: false,
    }),
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorMessageInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
