import { NgModule } from '@angular/core';
import { RouterOutlets, SLUG_PREFIX } from 'src/app/config/app-config';
import { Router, RouterModule, Routes, UrlSegment } from '@angular/router';
import { LoginComponent } from './login.component';

const rightPanelRoutes: Routes = [
  {
    path: 'view',
    component: LoginComponent,
    outlet: RouterOutlets.Right,
  },
];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class LoginRoutesModule {

  constructor(private router: Router) {
    this.router.config.push(...rightPanelRoutes);
  }
}
