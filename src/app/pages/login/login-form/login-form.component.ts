import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigatorService } from 'src/app/services/navigator.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private navigator: NavigatorService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.navigator.setPanelTitle('WELCOME BACK. PLEASE LOGIN');
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
    }
  }

  goToSignup() {
    this.navigator.auth.goToSignUp();
  }
}
