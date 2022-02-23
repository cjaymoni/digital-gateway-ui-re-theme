import {
  Component,
  Inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LOGIN_SERVICE } from 'src/app/config/injectables';
import { NavigatorService } from 'src/app/services/navigator.service';
import { IAuthService } from 'src/app/models/auth-service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { Pages, PrimeNgAlerts } from 'src/app/config/app-config';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navigator: NavigatorService,
    private alert: AppAlertService,
    @Inject(LOGIN_SERVICE) public loginService: IAuthService
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
    this.navigator.setPanelTitle('WELCOME BACK. PLEASE LOGIN');
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.loginService
        .login(this.loginForm.value)
        .pipe(catchError(err => of(false)))
        .subscribe(success => {
          if (success) {
            this.alert.showToast('Log in successful', PrimeNgAlerts.SUCCESS);
            return this.navigator.goBack();
          } else {
            this.loginForm.setErrors({ invalid: true });
            this.alert.showToast('Invalid login', PrimeNgAlerts.ERROR);
          }
        });
    }
  }

  goToSignup() {
    this.navigator.auth.goToSignUp();
  }
}
