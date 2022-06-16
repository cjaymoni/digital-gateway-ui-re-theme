import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordChangeComponent implements OnInit {
  changePasswordForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly alert: AppAlertService,
    private readonly loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required]],
      otp: ['', [Validators.required]],
    });

    this.cpassword?.valueChanges.subscribe(() => {
      if (
        this.cpassword?.value !==
        this.changePasswordForm?.get('password')?.value
      ) {
        this.cpassword?.setErrors({
          mismatch: true,
        });
      } else {
        this.cpassword?.setErrors(null);
      }
    });
  }

  get cpassword() {
    return this.changePasswordForm.get('cpassword');
  }

  onChangePasswordSubmit() {
    if (this.changePasswordForm.valid) {
      const data = this.changePasswordForm.value;
      this.loginService
        .resetPassword({
          code: data.otp,
          password: data.password,
        })
        .pipe(take(1))
        .subscribe(res => {
          if (res) {
            this.alert.showToast('Password changed successfully');
          }
        });
    }
  }
}

