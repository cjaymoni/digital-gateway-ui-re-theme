import { NgModule } from '@angular/core';
import { Pages, RouterOutlets } from 'src/app/config/app-config';
import { RouterModule, Routes } from '@angular/router';
import { NavigatorService } from 'src/app/services/navigator.service';
import { SignupFormComponent } from './signup-form/signup-form.component';

const routes: Routes = [
  {
    path: '',
    component: SignupFormComponent,
    outlet: RouterOutlets.Right,
  },
];

@NgModule({
  imports: [RouterModule.forChild([])],
  exports: [RouterModule],
})
export class SignupRoutesModule {
  constructor(private navigator: NavigatorService) {
    this.navigator.addRightPanelRoutes(routes);
  }
}
