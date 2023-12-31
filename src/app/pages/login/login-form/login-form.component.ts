import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import { NavigatorService } from 'src/app/services/navigator.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { selectQueryParam } from 'src/app/store/selectors/router.selectors';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  forgotPasswordMode = false;

  constructor(
    private fb: FormBuilder,
    private navigator: NavigatorService,
    private alert: AppAlertService,
    public loginService: LoginService,
    private gtag: GoogleAnalyticsService,
    private store: Store
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(5), Validators.email],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  onLoginSubmit() {
    if (this.forgotPasswordMode) {
      return this.requestOTPAndChangePassword();
    }

    if (this.loginForm.valid) {
      this.loginService
        .login(this.loginForm.value)
        .pipe(
          catchError(err => {
            // this.alert.showToast(err.message);
            if (err.status === 403) {
              console.log('403');

              // email not verified
              this.loginForm.setErrors({ emailNotVerified: true });
            }
            return of(null);
          })
        )
        .subscribe(success => {
          if (success) {
            this.alert.showToast(
              'Log in successful',
              PrimeNgAlerts.UNOBSTRUSIVE
            );

            this.gtag.Events.login();

            this.store
              .select(selectQueryParam('returnUrl'))
              .pipe(
                take(1),
                tap(_ => {
                  this.navigator.closeModal();
                  this.navigator.hidePanel();
                })
              )
              .subscribe(returnUrl => {
                if (!!returnUrl) {
                  this.navigator.router.navigateByUrl(returnUrl);
                }
              });
          } else if (success === false) {
            this.loginForm.setErrors({ invalid: true });
          }
        });
    }
  }

  goToSignup() {
    this.navigator.auth.goToSignUp();
  }

  toggleForgotPasswordMode() {
    this.forgotPasswordMode = !this.forgotPasswordMode;
  }

  resendVerification() {
    if (this.email?.valid)
      this.loginService
        .requestEmailVerification(this.email.value)
        .subscribe(success => {
          if (success) {
            this.alert.showToast(
              'Verification email sent. Please check your email.',
              PrimeNgAlerts.UNOBSTRUSIVE
            );
          }
          this.loginForm.setErrors(null);
        });
  }

  requestOTPAndChangePassword() {
    this.loginService
      .requestPasswordReset(this.email?.value)
      .subscribe(success => {
        if (success) {
          this.alert.showToast(
            'OTP sent. Please check your email.',
            PrimeNgAlerts.UNOBSTRUSIVE
          );
        }
        this.navigator.auth.goToResetPage();
      });
  }
}

