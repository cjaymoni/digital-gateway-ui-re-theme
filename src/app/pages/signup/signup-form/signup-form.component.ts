import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PrimeNgAlerts } from 'src/app/config/app-config';
import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private appAlertService: AppAlertService
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],

      password: ['', [Validators.required]],
    });
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
        this.appAlertService.showToast(
          `${
            data.user.first_name + ' ' + data.user.last_name
          } account created successfully`,
          PrimeNgAlerts.UNOBSTRUSIVE
        );
      });
    }
  }
}
