import { NgModule } from '@angular/core';
import { RouterOutlets, SLUG_PREFIX } from 'src/app/config/app-config';
import { Router, RouterModule, Routes, UrlSegment } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { NavigatorService } from 'src/app/services/navigator.service';

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
