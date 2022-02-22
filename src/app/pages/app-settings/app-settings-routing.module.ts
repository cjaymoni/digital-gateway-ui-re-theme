import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages, RouterOutlets } from 'src/app/config/app-config';
import { RoleGuard } from 'src/app/services/role.guard';
import { SettingsViewComponent } from './pages/settings-view/settings-view.component';
import { SocialMediaFormComponent } from './pages/social-media-settings/social-media-form/social-media-form.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsViewComponent,
    canActivate: [RoleGuard],
  },
  {
    path: Pages.SiteSettings.add,
    component: SocialMediaFormComponent,
    outlet: RouterOutlets.Modal,
    canActivate: [RoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppSettingsRoutesModule {}
