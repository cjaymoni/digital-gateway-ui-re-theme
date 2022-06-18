import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages, RouterOutlets } from 'src/app/config/app-config';
import { ContactUsFormComponent } from './contact-us-form/contact-us-form.component';

const routes: Routes = [
  {
    path: '',
    component: ContactUsFormComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactUsRoutesModule {}
