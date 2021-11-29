import { NgModule } from '@angular/core';
import { RouterOutlets, SLUG_PREFIX } from 'src/app/config/app-config';
import { Router, RouterModule, Routes, UrlSegment } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';

const rightPanelRoutes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
    outlet: RouterOutlets.Right,
  },
];

@NgModule({
  imports: [RouterModule.forChild([])],
  exports: [RouterModule]
})
export class LoginRoutesModule {

  constructor(private router: Router) {
    this.router.config.push(...rightPanelRoutes);
  }
}
