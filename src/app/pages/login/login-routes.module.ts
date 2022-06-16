import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages, RouterOutlets } from 'src/app/config/app-config';
import { NavigatorService } from 'src/app/services/navigator.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { PasswordChangeComponent } from './password-change/password-change.component';

const rightPanelRoutes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
    outlet: RouterOutlets.Right,
  },
  {
    path: 'login',
    component: LoginFormComponent,
    outlet: RouterOutlets.Modal,
  },
  {
    path: 'change-password',
    component: PasswordChangeComponent,
    outlet: RouterOutlets.Right,
  },
];

@NgModule({
  imports: [RouterModule.forChild([])],
  exports: [RouterModule],
})
export class LoginRoutesModule {
  constructor(private navigator: NavigatorService) {
    this.navigator.addRightPanelRoutes(rightPanelRoutes);
  }
}

