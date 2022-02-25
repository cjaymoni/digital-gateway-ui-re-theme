import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages, RouterOutlets } from 'src/app/config/app-config';

import { AboutUsViewComponent } from './about-us-view/about-us-view.component';

const routes: Routes = [
  {
    path: '',
    component: AboutUsViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutUsRoutesModule {}
