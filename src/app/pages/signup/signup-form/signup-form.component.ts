import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { GoogleAnalyticsService } from 'src/app/services/google-analytics.service';
import { NavigatorService } from 'src/app/services/navigator.service';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  subscription: Subscription | undefined;
  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private appAlertService: AppAlertService,
    private navigator: NavigatorService,
    private gtag: GoogleAnalyticsService
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      fname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      lname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      email: [
        '',
        [Validators.email, Validators.required, Validators.minLength(5)],
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ],
      ],
      cpassword: [''],
    });

    this.subscription = this.signupForm
      .get('cpassword')
      ?.valueChanges.subscribe(value => {
        const passwordCtrl = this.signupForm.get('password');
        if (!value || value.length < 6 || value !== passwordCtrl?.value) {
          passwordCtrl?.setErrors({ notmatch: true });
        } else {
          passwordCtrl?.setErrors(null);
        }
      });

    // this.navigator.setPanelTitle('SIGN UP');
  }
  onSignupSubmit() {
    if (this.signupForm.valid) {
      const formValues = this.signupForm.getRawValue();
      const newUser = {
        first_name: formValues.fname,
        last_name: formValues.lname,
        email: formValues.email,
        password: formValues.password,
      };
      this.signupService.signup(newUser).subscribe((data: any) => {
        this.gtag.Events.signUp();
        this.appAlertService.showToast(
          `${data.user.email} account created successfully`,
          PrimeNgAlerts.UNOBSTRUSIVE
        );
        this.navigator.auth.goToLogin();
      });
    }
  }

  goToLogin() {
    this.navigator.auth.goToLogin();
  }

  get password() {
    return this.signupForm.get('password');
  }
}

