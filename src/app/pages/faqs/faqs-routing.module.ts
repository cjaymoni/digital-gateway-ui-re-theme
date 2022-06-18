import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages, RouterOutlets } from 'src/app/config/app-config';
import { FaqsViewComponent } from './faqs-view/faqs-view.component';

const routes: Routes = [
  {
    path: '',
    component: FaqsViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqsRoutesModule {}

