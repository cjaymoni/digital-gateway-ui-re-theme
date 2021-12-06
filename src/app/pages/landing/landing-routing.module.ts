import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LandingPageGuard } from './guard/landing.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [LandingPageGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
