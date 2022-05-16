import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { GtagModule } from 'angular-gtag';
import { CookieModule } from 'ngx-cookie';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  anchorErrorComponentFn,
  ERROR_MESSAGES_MAPPING,
} from './config/app-config';
import { DirectivesModule } from './directives/directives.module';
import { ErrorMessageInterceptor } from './interceptors/error.interceptor';
import { LoginTokenInterceptor } from './interceptors/login-token.interceptor';
import { LoginModule } from './pages/login/login.module';
import { SearchResultsModule } from './pages/search-results/search-results.module';
import { SignupFormModule } from './pages/signup/signup-form/signup-form.module';
import { LayoutModule } from './shared-ui-modules/layout/layout.module';
import { appStoreEffects } from './store/app.effects';
import { appReducersMap } from './store/app.reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    LoginModule,
    SignupFormModule,
    SearchResultsModule,
    DirectivesModule,
    ErrorTailorModule.forRoot({
      ...ERROR_MESSAGES_MAPPING,
      controlErrorComponentAnchorFn: anchorErrorComponentFn,
      blurPredicate(element) {
        return (
          element.tagName === 'INPUT' ||
          element.tagName === 'SELECT' ||
          element.tagName === 'TEXTAREA' ||
          element.tagName === 'P-FILEUPLOAD' ||
          element.tagName === 'P-AUTOCOMPLETE'
        );
      },
    }),
    StoreModule.forRoot(appReducersMap),
    StoreRouterConnectingModule.forRoot(),
    GtagModule.forRoot({
      trackingId: environment.GTAG_ID,
      trackPageviews: false,
    }),
    CookieModule.forRoot({
      httpOnly: false,
    }),
    EffectsModule.forRoot(appStoreEffects),
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

